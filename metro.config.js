const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// LẤY DEFAULT CONFIG ĐỂ GIỮ NGUYÊN CÁC THIẾT LẬP KHÁC
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // === PHẦN QUAN TRỌNG NHẤT ĐỂ SỬA LỖI GEMINI ===
    // Kích hoạt tính năng để Metro đọc trường "exports" trong package.json.
    // Điều này giúp nó tự động chọn đúng file cho môi trường 'browser'/'react-native'.
    unstable_enablePackageExports: true,
    conditionNames: ['react-native', 'browser', 'import', 'default'],
    // Thêm đuôi .mjs (và .cjs) để Metro resolve được entry của @google/genai/web (index.mjs)
    sourceExts: Array.from(new Set([
      ...(defaultConfig.resolver?.sourceExts || []),
      'mjs',
      'cjs',
    ])),
  },
};

module.exports = mergeConfig(defaultConfig, config);
