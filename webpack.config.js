const path = require('path');
const glob = require('glob');

const config = {
	context: path.resolve(__dirname, './'),
	entry: {
		app: './app/app.module.js',
	},
	devServer: {
		port: 9000,
		stats: 'errors-only'
	}
};

module.exports = config;

