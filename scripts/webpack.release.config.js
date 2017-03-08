const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const git = require('git-rev-sync');
const HTMLInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const base = path.resolve(__dirname, '..');
const conf = require('./webpack.config.js');
const releaseConf = _.cloneDeep(conf);

releaseConf.devtool = 'none';

releaseConf.externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
};

releaseConf.module.rules.push({
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?url=false!stylus-loader?compress',
    }),
});

releaseConf.output.filename = 'assets/[name].[chunkhash].js';

releaseConf.plugins.push(
    new webpack.DefinePlugin({
        'module.hot': false,
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
    }),

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    }),

    new ExtractTextPlugin('assets/style.[contenthash].css'),

    new HTMLPlugin({
        cache: true,
        customization: {
            description: 'Boundless is a toolkit of React components and helper utilities focused on accessibility, performance, and composition.',
            githubSHA: git.long(),
            PRODUCTION: true,
        },
        favicon: path.join(base, 'docs/sparkles.png'),
        filename: 'index.html',
        inject: 'body',
        inlineSource: 'style.*?.css$',
        minify: {
            collapseWhitespace: true,
        },
        template: path.join(base, 'site/index.template.ejs'),
        title: 'boundless / Welcome!',
    }),
    new HTMLInlineSourcePlugin(),

    new OfflinePlugin({
        ServiceWorker: {
            events: true,
        },
    })
);

module.exports = releaseConf;
