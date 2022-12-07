const path = require('path');
const {extensionConfig} = require('../../scripts/webpack-utils');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */
module.exports = (_env, argv) => {
  // const plugins =
  //   argv.mode === 'production'
  //     ? [
  //         new CopyPlugin({
  //           patterns: [
  //             {
  //               from: path.resolve(__dirname, '..', 'tiniapp-docs'),
  //               to: path.resolve(__dirname, 'dist', 'tiniapp-docs'),
  //             },
  //             {
  //               from: path.resolve(__dirname, '..', 'tiniapp-jsapi-plugin'),
  //               to: path.resolve(__dirname, 'dist', 'tiniapp-jsapi-plugin'),
  //             },
  //           ],
  //         }),
  //       ]
  //     : undefined;

  const plugins = undefined;

  return [
    extensionConfig(
      /**@type WebpackConfig*/ {
        entry: './src/client/index.ts',
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'client/index.js',
        },
        plugins,
      },
    ),
    extensionConfig(
      /**@type WebpackConfig*/ {
        entry: './src/server/index.ts',
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'server/index.js',
        },
      },
    ),
  ];
};
