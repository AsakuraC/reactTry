const path = require('path');

const config = {
	entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
	output: {
		path: path.resolve(__dirname, 'output'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/
			},{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					}
				],
				exclude: /node_modules/
			}, {
		   		test: /\.(png|svg|jpg|gif)$/,
         		use: [
	           		'file-loader'
         		]
	       	}
		],
	}
};

module.exports = config;