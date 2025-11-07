const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// 修改 resolver 允许 .sksl 文件
const config = {
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'sksl'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'sksl'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
