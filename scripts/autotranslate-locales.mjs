// Node >=16
import fs from "fs";
import path from "path";
import url from "url";
import axios from "axios";

const ENDPOINT = "https://translation.googleapis.com/language/translate/v2";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const LOCALE_DIR = path.resolve(__dirname, "../src/constants/locales");
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

if (!API_KEY) {
  console.error("❌ Missing GOOGLE_TRANSLATE_API_KEY");
  process.exit(1);
}

// ---- CLI args ----
// Cách dùng:
//   node scripts/autotranslate-locales.js           # mặc định --all
//   node scripts/autotranslate-locales.js --all     # dịch tất cả file trong /locales trừ en.json
//   node scripts/autotranslate-locales.js ru,sv,sw  # chỉ dịch các mã chỉ định
const arg = (process.argv[2] || "--all").trim();

// ---- helpers đọc/ghi ----
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJson = (p, obj) =>
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");

// ---- chuẩn hoá mã locale file -> mã ngôn ngữ Google ----
const normalizeForGoogle = (code) => {
  // nhóm Arabic
  if (/^ar(-|$)/i.test(code)) return "ar";
  // Spanish các vùng
  if (/^es(-|$)/i.test(code)) return "es";
  // Norwegian Bokmål
  if (code.toLowerCase() === "nb") return "no";
  // Navajo: Google chưa hỗ trợ
  if (code.toLowerCase() === "nv") return null;
  // zh, de, fr, it, ko, nl, pt, ru, sv, sw, vi, fa, etc.
  return code.toLowerCase();
};

// Liệt kê tất cả file locales (trừ en.json)
const listAllLocaleFiles = () =>
  fs
    .readdirSync(LOCALE_DIR)
    .filter((f) => f.endsWith(".json") && f !== "en.json")
    .map((f) => path.basename(f, ".json"));

const resolveTargets = () => {
  let files;
  if (arg === "--all" || arg === "") {
    files = listAllLocaleFiles();
  } else {
    files = arg.split(",").map((s) => s.trim()).filter(Boolean);
  }
  const targets = files.map((fileCode) => ({
    fileCode,
    googleCode: normalizeForGoogle(fileCode),
  }));
  const unsupported = targets.filter((t) => !t.googleCode);
  unsupported.forEach((t) =>
    console.warn(`⚠️  Skip ${t.fileCode}: not supported by Google Translate.`)
  );
  return targets.filter((t) => !!t.googleCode);
};

// ---- giữ placeholder an toàn khi dịch ----
const maskPlaceholders = (s) => {
  const map = [];
  const masked = s.replace(
    /(\{\{\s*[^{}]+\s*\}\}|{\d+}|\$\{[^}]+\})/g,
    (m) => {
      const token = `__PH_${map.length}__`;
      map.push(m);
      return token;
    }
  );
  return { masked, map };
};
const unmaskPlaceholders = (s, map) => {
  let out = s;
  map.forEach((orig, i) => {
    const re = new RegExp(`__PH_${i}__`, "g");
    out = out.replace(re, orig);
  });
  return out;
};

// Google trả về có thể chứa HTML entity
const htmlDecode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

// ---- logic giữ bản dịch thủ công ----
const shouldKeepExisting = (enStr, existing) =>
  typeof existing === "string" && existing !== "" && existing !== enStr;

// ---- build theo template EN (đúng thứ tự key của EN) ----
const buildFromTemplate = (tmpl, existing, lookup) => {
  if (typeof tmpl === "string") {
    if (shouldKeepExisting(tmpl, existing)) return existing; // ưu tiên thủ công
    return lookup.get(tmpl) || tmpl; // fallback EN nếu chưa có
  }
  if (Array.isArray(tmpl)) {
    const arr = [];
    for (let i = 0; i < tmpl.length; i++) {
      arr.push(
        buildFromTemplate(
          tmpl[i],
          Array.isArray(existing) ? existing[i] : undefined,
          lookup
        )
      );
    }
    return arr;
  }
  if (tmpl && typeof tmpl === "object") {
    const out = {};
    // theo thứ tự key của EN
    for (const k of Object.keys(tmpl)) {
      out[k] = buildFromTemplate(tmpl[k], existing?.[k], lookup);
    }
    // append “extra keys” từ file đích (nếu có) xuống cuối
    if (existing && typeof existing === "object") {
      for (const k of Object.keys(existing)) {
        if (!Object.prototype.hasOwnProperty.call(tmpl, k)) {
          out[k] = existing[k];
        }
      }
    }
    return out;
  }
  return tmpl;
};

// ---- gom các chuỗi thật sự cần dịch ----
const collectNeededStrings = (tmpl, existing, set) => {
  if (typeof tmpl === "string") {
    if (!shouldKeepExisting(tmpl, existing)) set.add(tmpl);
    return;
  }
  if (Array.isArray(tmpl)) {
    const ext = Array.isArray(existing) ? existing : [];
    tmpl.forEach((v, i) => collectNeededStrings(v, ext[i], set));
    return;
  }
  if (tmpl && typeof tmpl === "object") {
    const ex = existing && typeof existing === "object" ? existing : {};
    for (const k of Object.keys(tmpl)) {
      collectNeededStrings(tmpl[k], ex[k], set);
    }
  }
};

// ---- gọi Google Translate theo batch ----
const translateBatch = async (strings, target) => {
  // trả Map<originalEN, translated>
  const result = new Map();
  if (strings.length === 0) return result;

  const maskedArr = strings.map((s) => {
    const { masked, map } = maskPlaceholders(s);
    return { original: s, masked, map };
  });

  const CHUNK = 100; // batch an toàn
  for (let i = 0; i < maskedArr.length; i += CHUNK) {
    const slice = maskedArr.slice(i, i + CHUNK);
    const q = slice.map((x) => x.masked);

    const { data } = await axios.post(`${ENDPOINT}?key=${API_KEY}`, {
      q,
      target,
      source: "en",
      format: "text",
    });

    const translations = data?.data?.translations || [];
    translations.forEach((t, idx) => {
      const raw = t.translatedText || "";
      const unescaped = htmlDecode(raw);
      const restored = unmaskPlaceholders(unescaped, slice[idx].map);
      result.set(slice[idx].original, restored);
    });
  }
  return result;
};

const main = async () => {
  const enPath = path.join(LOCALE_DIR, "en.json");
  const en = readJson(enPath);

  const targets = resolveTargets();
  if (targets.length === 0) {
    console.log("Nothing to translate.");
    return;
  }

  for (const t of targets) {
    const targetPath = path.join(LOCALE_DIR, `${t.fileCode}.json`);
    let existing = {};
    try {
      existing = readJson(targetPath);
    } catch {}

    // 1) gom chuỗi cần dịch
    const toTranslate = new Set();
    collectNeededStrings(en, existing, toTranslate);

    // 2) gọi Google Translate
    const uniq = Array.from(toTranslate);
    console.log(`🌍 [${t.fileCode}] translating ${uniq.length} strings via ${t.googleCode}...`);
    const lookup = await translateBatch(uniq, t.googleCode);

    // 3) build theo EN (đúng thứ tự, giữ bản dịch thủ công, giữ extra key)
    const built = buildFromTemplate(en, existing, lookup);

    writeJson(targetPath, built);
    console.log(`✅ wrote ${t.fileCode}.json`);
  }

  console.log("🎉 Done auto-translate.");
};

main().catch((e) => {
  console.error(e?.response?.data || e);
  process.exit(1);
});
