const path = require('path');
const {extensionConfig} = require('../../scripts/webpack-utils');

/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */
module.exports = [
  extensionConfig(
    /**@type WebpackConfig*/ {
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
      },
    },
  ),
];
