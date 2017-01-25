const path = require('path');
const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLEntryPlugin = require('html-webpack-plugin');

const releaseConf = _.cloneDeep(conf);

releaseConf.devtool = 'none';

releaseConf.module.rules[2] = _.assign({}, releaseConf.module.rules[2], {
    loader: ExtractTextPlugin.extract({
        loader: 'css-loader!stylus-loader?compress',
    }),
});

releaseConf.output.filename = 'assets/[name].[chunkhash].js';

releaseConf.plugins.push(
    new webpack.DefinePlugin({
        'module.hot': false,
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }),

    new ExtractTextPlugin('assets/[name].[contenthash].css'),

    new HTMLEntryPlugin({
        cache: true,
        customization: {
            githubSHA: git.long(),
            PRODUCTION: true,
        },
        filename: '404.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
        },
        template: path.resolve(__dirname, '../site/index.template.ejs'),
        title: 'Boundless',
    }),

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
