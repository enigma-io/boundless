const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const releaseConf = _.cloneDeep(conf);

releaseConf.devtool = 'none';

releaseConf.module.rules[2] = _.assign({}, releaseConf.module.rules[2], {
    loader: ExtractTextPlugin.extract({
        loader: 'css-loader!stylus-loader?compress',
    }),
});

releaseConf.plugins.push(
    new webpack.DefinePlugin({
        'module.hot': false,
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }),

    new ExtractTextPlugin('assets/style.css'),

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
