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
    new webpack.HotModuleReplacementPlugin()
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
		}
	}
})
