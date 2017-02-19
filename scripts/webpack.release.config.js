const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const git = require('git-rev-sync');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const boundlessExtractor = new ExtractTextPlugin('assets/boundless-custom.[contenthash].css');
const styleExtractor = new ExtractTextPlugin('assets/style.[contenthash].css');
const loaderPattern = 'css-loader?url=false!stylus-loader?compress';

const base = path.resolve(__dirname, '..');

const htmlConf = {
    cache: true,
    customization: {
        description: 'Boundless is a toolkit of React components and helper utilities focused on accessibility, performance, and composition.',
        githubSHA: git.long(),
        PRODUCTION: true,
    },
    favicon: path.join(base, 'docs/sparkles.png'),
    filename: 'index.html',
    inject: 'body',
    minify: {
        collapseWhitespace: true,
    },
    template: path.join(base, 'site/index.template.ejs'),
    title: 'boundless / Welcome!',
};

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

    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: true,
    }),

    boundlessExtractor,
    styleExtractor,

    new HTMLPlugin(htmlConf)
);

const packages = fs.readdirSync(path.join(base, 'packages')).filter((name) => {
    return !require(path.join(base, 'packages', name, 'package.json')).private;
});

packages.forEach((name) => {
    const prettyName = name.indexOf('utils') !== -1
                       ? _.camelCase(name.replace('boundless-utils-', ''))
                       : _.pascalCase(name.replace('boundless-', ''));

    releaseConf.plugins.push(new HTMLPlugin(_.merge({}, htmlConf, {
        customization: {
            description: _.escape(require(path.join(base, 'packages', name, 'package.json')).description) + ` ${prettyName} is part of Boundless, a toolkit of React components and helper utilities focused on accessibility, performance, and composition.`,
        },

        filename: `${prettyName}/index.html`,
        title: `boundless / ${prettyName}`,
    })));
});

module.exports = releaseConf;
