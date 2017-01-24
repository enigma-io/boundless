const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const releaseConf = _.cloneDeep(conf);

releaseConf.devtool = 'none';

releaseConf.modules.rules[2] = _.assign({}, releaseConf.modules.rules[2], {
    loader: ExtractTextPlugin.extract({
        loader: 'css-loader!stylus-loader?compress',
    }),
});

releaseConf.plugins.push(
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
