const paths = require('./paths').paths;
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: 'development',
	output: {
		path: paths.dist,
		filename: '[name].js'
	},
	node: {
		__dirname: false,
		__filename: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	devtool: 'source-map',
	plugins: [],
	externals: [nodeExternals()]
};
