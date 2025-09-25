// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Plugin lain bisa ditaruh di sini jika ada
      'react-native-worklets/plugin', // <-- GANTI DENGAN INI DAN PASTIKAN INI YANG PALING AKHIR
    ],
  };
};