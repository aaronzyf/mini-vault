module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        // root: ['./src'],
        alias: {
          '@ethersproject/pbkdf2': './src/patches/pbkdf2.js',
          crypto: 'react-native-quick-crypto',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
      'module-resolver-fix-import',
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.web.ts',
          '.native.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.web.tsx',
          '.native.tsx',
          '.tsx',
          '.json',
          '.d.ts',
        ],
        alias: {
          '@mini-vault-services': ['./src/services'],
          '@mini-vault-assets': ['./src/assets'],
          '@mini-vault-components': ['./src/components'],
          '@mini-vault-ui': ['./src/ui'],
          '@mini-vault-ui/icons': ['./src/ui/icons'],
          '@mini-vault-icons': ['./src/icons'],
          '@mini-vault-helpers': ['./src/helpers'],
          '@mini-vault-types': ['./src/types'],
          '@mini-vault-pages': ['./src/pages'],
          '@mini-vault-hooks': ['./src/hooks'],
          '@mini-vault-storage': ['./src/storage'],
        },
      },
    ],
    ['inline-import', {
      extensions: ['.sksl']
    }],
    'react-native-reanimated/plugin', // 必须放在最后
  ],
};
