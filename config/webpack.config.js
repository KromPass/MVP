const config = require('./config.js');
const _ = require('lodash');
const path = require('path');
const yargs = require('yargs');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');

const supportedBrowsers = _.map(config.supportedBrowsers, (value, key) => `${key} >= ${value}`);
const logoPath = './apps/img/logo.jpg';
const cssScopedName = '[name]__[local]--[hash:base64:6]';

const extractCssLoaders = [{
	loader: 'css-loader',
	options: {
		modules: true,
		localIdentName: cssScopedName,
		importLoaders: 1,
		minimize: true,
	},
},{
	loader: 'resolve-url-loader',
},{
	loader: 'autoprefixer-loader',
},{
	loader: 'sass-loader',
}];

const cssLoaders = [{
	loader: 'style-loader',
}, ...extractCssLoaders];

const bundles = ['visitor', 'user', 'admin', 'superadmin'];

const htmlBundles = bundles.map(value => new HtmlPlugin({
    chunks: [`${value}/app`, 'manifest', 'vendor'],
    title: `${config.name} | ${value}`,
    filename: `build/${value}/index.html`,
    template: 'apps/index.html',
    inject: true, hash: true, cache: true,
    config,
}));
htmlBundles.push(new HtmlPlugin({
    chunks: [],
    title: config.name,
    filename: 'build/unsupported.html',
    template: 'apps/unsupported.html',
    inject: true, hash: true, cache: true,
    config,
}));

const webpackConfig = {
	entry: {
		'visitor/app': ['./apps/visitor/app.js'],
		'user/app': ['./apps/user/app.js'],
		'admin/app': ['./apps/admin/app.js'],
		'superadmin/app': ['./apps/superadmin/app.js'],
		'vendor': [
            'babel-polyfill',
			'autobind-decorator', 'axios', 'lodash', 'material-ui',
			'moment', 'moment-timezone',
			'react', 'react-dom', 'react-tap-event-plugin', 'react-redux', 'react-router', 'redux', 'reflexbox',
		],
	},
	output: {
		filename: 'build/[name].min.js',
		publicPath: '/',
	},
	plugins: [
        ...htmlBundles,
		new ExtractTextPlugin({ filename: './build/[name].min.css', ignoreOrder: true }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanPlugin(['./build'], { root: `${__dirname}/../`, verbose: true }),
		new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
		new VisualizerPlugin({ filename: './build/webpack-stats.html' }),
		new OpenBrowserPlugin({ url: 'http://localhost:8080/user' }),
		new NotifierPlugin({ title: config.name, contentImage: logoPath, alwaysNotify: true }),
	],
	module: {
		rules: [{
			test: [/\.js$/i],
			exclude: /node_modules/,
			use: [{
				loader: 'string-replace-loader',
				query: {
                    search: '//@hide',
					replace: '//@hide',
					flags: 'gi',
				}
			},{
				loader: 'eslint-loader',
				options: {
					env: { browser: true, node: true },
					parserOptions: {
						ecmaVersion: 7,
						ecmaFeatures: {
							jsx: true,
							experimentalObjectRestSpread: true,
							modules: true,
						},
					},
					rules: {
						'no-useless-constructor': ['off'],
						'react/jsx-no-bind': ['warn'],
					},
					parser: 'babel-eslint',
					plugins: ['import', 'react'],
				},
			},{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					babelrc: false,
					compact: true,
					presets: [
						['env', {
							targets: { browsers: supportedBrowsers },
							modules: false,
							useBuiltIns: true,
							debug: true,
						}],
						'stage-0', 'react',
					],
					plugins: [
                        'transform-decorators-legacy',
                        ['react-css-modules', {
                            'generateScopedName': cssScopedName,
                            'filetypes': { '.scss': 'postcss-scss' },
                        }],
                    ],
				},
			}],
		},{
			test: [/\.css$/i, /\.scss$/i, /\.sass$/i],
			loader: ExtractTextPlugin.extract({ use: extractCssLoaders, fallback: 'style-loader' }),
		},{
			test: [/\.woff$/i, /\.woff2$/i],
			use: [{
				loader: 'file-loader',
				options: {
					limit: 15000,
					mimetype: 'application/font-woff',
				},
			}],
		},{
			test: [/\.ttf$/i, /\.eot$/i],
			use: [{
				loader: 'file-loader',
				options: {
					limit: 15000,
					mimetype: 'application/octet-stream',
				},
			}],
		},{
			test: [/\.(jpg|jpeg|png|gif|svg)$/i],
			use: [{
                loader: 'url-loader',
                options: {
                    limit: 15000,
                    name: './build/assets/images/[hash:base64:12].[ext]',
                }
            }]
        },{
			test: [/\.json$/i],
			use: [{
				loader: 'json-loader',
			}],
		}],
	}
};

if(process.env.NODE_ENV == 'development') {
    webpackConfig.watch = true;
	webpackConfig.devtool = 'eval';

	webpackConfig.plugins = webpackConfig.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('development') },
		}),
	]);
}
else {
	webpackConfig.watch = false;
    webpackConfig.devtool = 'source-map';

	webpackConfig.plugins = webpackConfig.plugins.concat([
		new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') },
		}),
        new BabiliPlugin(),
        new FaviconsPlugin({
            title: config.name,
			logo: logoPath,
            prefix: 'build/icons/',
            statsFilename: 'build/icons/stats.json',
			inject: true,
			emitStats: true,
			persistentCache: true,
			background: '#fff',
			icons: {
				favicons: true, android: true, appleIcon: true, appleStartup: true,
				coast: false, firefox: false, opengraph: false, twitter: false, yandex: false, windows: false,
			},
		}),
	]);
}

module.exports = webpackConfig;