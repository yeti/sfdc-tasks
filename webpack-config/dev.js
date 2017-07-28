'use strict';

const webpack = require('webpack');

module.exports = (conf) => ({
  entry: [ 'react-hot-loader/patch' ],
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['SF_USERNAME', 'SF_PASSWORD', 'SF_URL']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    https: true,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
})
