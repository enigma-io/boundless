const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const HTMLInlineSourcePlugin = require('html-webpack-inline-source-plugin');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const boundlessExtractor = new ExtractTextPlugin('assets/boundless-custom.[contenthash].css');
const starsExtractor = new ExtractTextPlugin('assets/stars.[contenthash].css');
const styleExtractor = new ExtractTextPlugin('assets/style.[contenthash].css');
const loaderPattern = 'css-loader?url=false!stylus-loader?compress';

const conf = require('./webpack.config.js');
const releaseConf = _.cloneDeep(conf);

releaseConf.devtool = 'none';

releaseConf.externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
};

releaseConf.module.rules.push({
    test: /boundless\.styl$/,
    use: boundlessExtractor.extract(loaderPattern),
}, {
    test: /stars\.styl$/,
    use: starsExtractor.extract(loaderPattern),
}, {
    test: /style\.styl$/,
    use: styleExtractor.extract(loaderPattern),
});

releaseConf.output.filename = 'assets/[name].[chunkhash].js';

releaseConf.plugins.push(
    new webpack.DefinePlugin({
        'module.hot': false,
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
    }),

    boundlessExtractor,
    starsExtractor,
    styleExtractor,

    new HTMLPlugin({
        cache: true,
        customization: {
            githubSHA: git.long(),
            PRODUCTION: true,
        },
        favicon: path.resolve(__dirname, '../docs/sparkles.png'),
        filename: 'index.html',
        inject: 'body',
        inlineSource: 'style\.*?\.css',
        minify: {
            collapseWhitespace: true,
        },
        template: path.resolve(__dirname, '../site/index.template.ejs'),
        title: 'boundless',
    }),

    new HTMLInlineSourcePlugin(),

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
