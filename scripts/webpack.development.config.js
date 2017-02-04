const path = require('path');
const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const HTMLEntryPlugin = require('html-webpack-plugin');

const devConf = _.cloneDeep(conf);

devConf.devServer = {
    compress: true,
    contentBase: path.resolve(__dirname, '../docs'),
    historyApiFallback: true,
    host: '0.0.0.0',
};

devConf.devtool = 'inline-source-map';

devConf.plugins.push(
    new HTMLEntryPlugin({
        cache: true,
        customization: {
            githubSHA: git.long(),
            PRODUCTION: false,
        },
        favicon: path.resolve(__dirname, '../docs/sparkles.png'),
        inject: 'body',
        minify: {
            collapseWhitespace: true,
        },
        template: path.resolve(__dirname, '../site/index.template.ejs'),
        title: 'boundless',
    }),

    new webpack.NamedModulesPlugin()
);

module.exports = devConf;
