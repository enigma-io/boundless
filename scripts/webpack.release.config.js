const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLEntryPlugin = require('html-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin');

const conf = require('./webpack.config.js');
const releaseConf = _.cloneDeep(conf);

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const base = __dirname + '/../packages/';
const paths = fs.readdirSync(path.resolve(base)).filter((name) => {
    return !require(path.resolve(base, name, 'package.json')).private;
}).map((rawName) => {
    if (rawName.indexOf('utils-') === -1) {
        return `/${_.pascalCase(rawName.replace('boundless-', ''))}`;
    }

    return `/${_.camelCase(rawName.replace('boundless-utils-', ''))}`;
});

paths.push('/quickstart');

releaseConf.devtool = 'none';

releaseConf.module.rules[2] = _.assign({}, releaseConf.module.rules[2], {
    loader: ExtractTextPlugin.extract({
        loader: 'css-loader?url=false!stylus-loader?compress',
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

    new ExtractTextPlugin('assets/[name].[contenthash].css'),

    new HTMLEntryPlugin({
        cache: true,
        customization: {
            githubSHA: git.long(),
            PRODUCTION: true,
        },
        favicon: path.resolve(__dirname, '../docs/sparkles.png'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
        },
        template: path.resolve(__dirname, '../site/index.template.ejs'),
        title: 'boundless',
    }),

    new SitemapPlugin('http://boundless.js.org', paths, {
        lastMod: true,
        skipGzip: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
