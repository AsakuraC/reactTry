const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev');
const proxy = require('http-proxy-middleware');

const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', proxy({
	target: 'http://localhost',
	changeOrigin: true,
	pathRewrite: {'^/api': ''}
}))

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'output/index.html'));
});

app.listen(3000, function(err){
	if(err){
		console.log(err);
	}
	console.log('listening on port 3000');
});