const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

config = merge(common, {
	entry: [
		'webpack-hot-middleware/client?reload=true'
	],
	devtool: 'inline-source-map',
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
});

module.exports = config;