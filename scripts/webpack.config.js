const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../site/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../site/public/assets'),
        publicPath: path.resolve(__dirname, '../site/public'),
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
        }, {
            test: /\.md$/,
            loader: 'raw-loader',
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                loader: 'css-loader!stylus-loader',
            }),
        }],
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../site/public'),
        compress: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        publicPath: '/assets/',
    },
    devtool: 'source-map',
    externals: {
        'lodash': '_',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.styl$/,
            stylus: {
                default: {
                    use: [autoprefixer()],
                },
            },
        }),
        new ExtractTextPlugin('style.css'),
    ],
};
