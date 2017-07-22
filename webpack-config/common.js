'use strict';

const PATHS = require('./paths');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (conf) => {

  const APP_CONFIG = require('./app-config')(conf);

  return {
    entry: [ PATHS.src ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          include: [ PATHS.src ],
          enforce: 'pre'
        },
        {
          test: /.(js|jsx)$/,
          include: [ PATHS.src, /force-vrolayer/ ],
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$/,
          loader: 'file-loader?name=/images/[name].[hash].[ext]'
        },
        {
          test: /\.(otf|eot|png|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader?name=fonts/[hash].[ext]"
         },
        {
          test: /\.svg$/,
          loader: 'file-loader?name=[path][name].[ext]&context=node_modules/@salesforce-ux/design-system',
          include: path.join(PATHS.node_modules, '@salesforce-ux')
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      modules: [ PATHS.src, PATHS.node_modules ],
      alias: {
        '@salesforce-ux': path.join(PATHS.node_modules, '@salesforce-ux')
      }
    },
    externals: {
      'APP_CONFIG': JSON.stringify(APP_CONFIG)
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: 'node_modules/html-webpack-template/index.ejs',
        inject: false,
        env: process.env,
        appMountId: 'app',
        favicon: './favicon.ico'
      }),
    ]
  }
}
