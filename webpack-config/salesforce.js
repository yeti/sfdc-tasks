'use strict';
const SalesforcePackager = require('salesforce-resources-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const PATHS = require('./paths');
const remoteObject = require('../src/remoteObjects');
const webpack = require('webpack');

module.exports = (conf) => ({
  output: {
    path: PATHS.package,
    publicPath: '',
    filename: '[name].js'
  },
  plugins: [
    new CleanPlugin([PATHS.package], { root: process.cwd() }),
    new SalesforcePackager({
      staticresource: {
        name: 'appBundle'
      },
      page: {
        name: 'App_Page',
        metaTemplateOptions:{
          label: 'Redux Salesforce Starter'
        },
        templateOptions : {
          remoteObject: remoteObject,
          accessTokenVar: '__ACCESS_TOKEN',
          zipNameVar: '__STATIC_RESOURCE_ZIP'
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
});
