import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const LOCALE_DIR = path.resolve(__dirname, "../src/constants/locales");

const COPY_ENGLISH_FOR_MISSING = true; // thiếu key -> copy EN cho chạy ngay
const APPEND_EXTRAS_AT_END = true;     // key thừa ở target mà EN không có -> cho xuống cuối (ổn định)

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJson = (p, obj) =>
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");

const mergeTemplate = (en, target) => {
  if (Array.isArray(en)) {
    const t = Array.isArray(target) ? target : [];
    return en.map((v, i) => (typeof v === "string"
      ? (typeof t[i] === "string" ? t[i] : (COPY_ENGLISH_FOR_MISSING ? v : ""))
      : mergeTemplate(v, t[i]))
    );
  }
  if (en && typeof en === "object") {
    const out = { ...(target && typeof target === "object" ? target : {}) };
    for (const k of Object.keys(en)) out[k] = mergeTemplate(en[k], out[k]);
    return out;
  }
  return typeof target === "undefined" ? (COPY_ENGLISH_FOR_MISSING ? en : "") : target;
};

// Sắp xếp theo thứ tự key của EN (đệ quy)
const orderLikeTemplate = (tmpl, obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v, i) => orderLikeTemplate(tmpl?.[i], v));
  }
  if (tmpl && typeof tmpl === "object" && !Array.isArray(tmpl) && obj && typeof obj === "object") {
    const out = {};
    // 1) theo thứ tự của template
    for (const k of Object.keys(tmpl)) {
      out[k] = orderLikeTemplate(tmpl[k], obj[k]);
    }
    // 2) thêm “extra keys” không có trong EN xuống cuối
    if (APPEND_EXTRAS_AT_END) {
      for (const k of Object.keys(obj)) {
        if (!Object.prototype.hasOwnProperty.call(tmpl, k)) out[k] = obj[k];
      }
    }
    return out;
  }
  return obj;
};

const main = () => {
  const enPath = path.join(LOCALE_DIR, "en.json");
  const en = readJson(enPath);

  const files = fs
    .readdirSync(LOCALE_DIR)
    .filter((f) => f.endsWith(".json") && f !== "en.json");

  for (const file of files) {
    const p = path.join(LOCALE_DIR, file);
    let data = {};
    try { data = readJson(p); } catch {}
    const merged = mergeTemplate(en, data);
    const ordered = orderLikeTemplate(en, merged);
    writeJson(p, ordered);
    console.log(`Synced ${file}`);
  }
  console.log("✅ Locales synced & ordered like en.json");
};

main();
