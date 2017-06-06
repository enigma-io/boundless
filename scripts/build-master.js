/* eslint-disable no-console */

const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const chalk = require('chalk');

const base = path.resolve(__dirname, '..', 'public');
const error = (err) => console.error(chalk.bold.red(err));
const log = (msg) => console.log(chalk.bold.green(msg));

mkdirp.sync(base);

const webpack = require('webpack');
const config = {
    entry: path.resolve(__dirname, '..', 'exports.js'),
    externals: {
        'react': {
            'amd': 'react',
            'commonjs2': 'react',
            'root': 'React',
        },

        'react-dom': {
            'amd': 'react-dom',
            'commonjs2': 'react-dom',
            'root': 'ReactDOM',
        },
    },
    module: {
        rules: [ {
            test: /\.jsx?$/,
            loader: 'babel-loader',
        } ],
    },
    resolve: {
        alias: {
            classnames: require.resolve('classnames'),
        },
    },
};

new Promise((resolve) => {
    process.env.BABEL_ENV = 'development';

    // minified development build
    webpack(_.merge({}, config, {
        devtool: 'inline-source-map',
        output: {
            filename: 'boundless.js',
            library: 'Boundless',
            libraryTarget: 'umd',
            path: base,
        },
        plugins: [
            new webpack.NamedModulesPlugin(),

            new webpack.optimize.UglifyJsPlugin({
                comments: /(license|sourceMappingURL)/,
                compress: true,
                mangle: false,
                sourceMap: true,
            }),
        ],
    }), (err) => {
        if (err) {
            return error(err);
        }

        log(chalk.bold.green('Built master development bundle.'));

        resolve();
    });
}).then(() => {
    process.env.BABEL_ENV = 'production';

    // minified production build
    webpack(_.merge({}, config, {
        devtool: 'inline-source-map',
        output: {
            filename: 'boundless.min.js',
            library: 'Boundless',
            libraryTarget: 'umd',
            path: base,
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: /(license)/,
                compress: true,
            }),
        ],
    }), (err) => {
        if (err) {
            return error(err);
        }

        log(chalk.bold.green('Built master production bundle.'));
    });
});
