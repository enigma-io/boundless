const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const version = require('../package.json').version;

module.exports = {
    entry: path.resolve(__dirname, '../site/index.js'),
    output: {
        filename: 'assets/[name].js',
        path: path.resolve(__dirname, '../docs'),
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
            loader: 'style-loader!css-loader?url=fase!stylus-loader?sourceMap',
        }],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => /node_modules/.test(module.resource),
        }),

        new webpack.LoaderOptionsPlugin({
            test: /\.styl$/,
            stylus: {
                default: {
                    use: [autoprefixer()],
                },
                preferPathResolver: 'webpack',
            },
        }),

        new webpack.DefinePlugin({
          VERSION: JSON.stringify(version),
        }),
    ],
};
