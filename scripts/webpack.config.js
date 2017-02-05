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
            use: 'babel-loader',
        }, {
            test: /\.md$/,
            use: 'raw-loader',
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
