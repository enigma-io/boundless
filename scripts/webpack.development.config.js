const path = require('path');
const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const HTMLPlugin = require('html-webpack-plugin');

const devConf = _.cloneDeep(conf);

devConf.devServer = {
    compress: true,
    contentBase: path.resolve(__dirname, '../docs'),
    historyApiFallback: {
        rewrites: [ { from: /^\/.*?$/, to: '/index.html' } ],
    },
    host: '0.0.0.0',
};

devConf.devtool = 'inline-source-map';

devConf.module.rules.push({
    test: /\.styl$/,
    loader: 'style-loader!css-loader?url=false!stylus-loader?sourceMap',
});

devConf.plugins.push(
    new HTMLPlugin({
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
