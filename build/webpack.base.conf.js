const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Main const
const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// const PAGES_DIR = PATHS.src // with HTML files
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

module.exports = {

	externals: {
		paths: PATHS,
	},

	entry: {
		app: PATHS.src,
		// module-name: `${PATHS.src}/your-module.js`,
	},
	output: {
		filename: './js/[name].[hash].js',
		path: PATHS.dist,
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/[name].[hash].css',
		}),
		// uncomment without Pug
		// new HtmlWebpackPlugin({
		// hash: false,
		// template: `${PATHS.src}/index.html`,
		// filename: './index.html',
		// inject: false //if U wanna insert scripts and css manually // visit html-webpack-template
		// }),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/img`, to: './img' },
			{ from: `${PATHS.src}/fonts`, to: './fonts' },
			// { from: `${PATHS.src}/static`, to: '' },
		]),

		// Automatic creation any html pages (Don't forget to RERUN dev server)
		...PAGES.map((page) => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/, '.html')}`,
		})),
	],
};
