// const nodeExternals = require('webpack-node-externals');
// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   mode: 'development',
//   target: 'node',
//   externals: [nodeExternals()],
//   // entry: path.resolve(__dirname, './server.js'),
//   entry: './client/index.js',
//   node: {
//     __dirname: false,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader',
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['*', '.js', 'jsx'],
//   },
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//   ],
//   devServer: {
//     contentBase: './dist',
//     hot: true,
//     historyApiFallback: true,
//   },
// };
const path = require("path");

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ]
          }
        ]
    },
    watchOptions: {
      ignored: /node_modules/
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
};
