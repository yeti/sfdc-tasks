const customConfig = require('../webpack.config')('development');
const merge = require('webpack-merge');
const PATHS = require('../webpack-config/paths');
const path = require('path');

module.exports = (config, type) => {
	customConfig.entry = {};
	customConfig.plugins = [];
	customConfig.devServer = null;
	customConfig.resolve.modulesDirectories = customConfig.resolve.modules;
	delete customConfig.resolve.modules;

	const result = merge(config, customConfig);
  
	return result;
};
