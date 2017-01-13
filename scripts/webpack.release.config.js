const conf = require('./webpack.config.js');
const _ = require('lodash');
const webpack = require('webpack');

const releaseConf = _.cloneDeep(conf);

releaseConf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    })
);

module.exports = releaseConf;
