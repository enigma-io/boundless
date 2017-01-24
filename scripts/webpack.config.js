const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const version = require('../package.json').version;

module.exports = {
    entry: path.resolve(__dirname, '../site/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../site/public/assets/'),
        publicPath: 'assets/',
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
            loader: 'style-loader!css-loader!stylus-loader?sourceMap',
        }],
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        publicPath: '/assets/',
    },
    devtool: 'inline-source-map',
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
        new webpack.DefinePlugin({
          VERSION: JSON.stringify(version),
        }),
    ],
};
