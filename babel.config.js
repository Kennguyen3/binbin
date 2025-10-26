module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    /* ENV */
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
      },
    ],

    /* --- alias "@": "./src" --- */
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],

    /* Reanimated phải luôn đứng cuối */
    'react-native-reanimated/plugin',
  ],
};
