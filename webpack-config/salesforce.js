'use strict';
const SalesforcePackager = require('salesforce-resources-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const PATHS = require('./paths');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = () => ({
  output: {
    path: PATHS.package,
    publicPath: '',
    filename: '[name].js'
  },
  plugins: [
    new CleanPlugin([PATHS.package], { root: process.cwd() }),
    new SalesforcePackager({
      staticresource: {
        name: 'tasksTrackerBundle'
      },
      page: {
        name: 'TaskTracker',
        metaTemplateOptions:{
          label: 'Tasks Tracker'
        },
        templateOptions : {
          accessTokenVar: '__ACCESS_TOKEN',
          zipNameVar: '__STATIC_RESOURCE_ZIP'
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new WebpackNotifierPlugin()
  ]
});
