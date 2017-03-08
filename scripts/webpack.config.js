const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const version = require('../package.json').version;

module.exports = {
    entry: ['babel-regenerator-runtime', path.resolve(__dirname, '../site/index.js')],
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
            use: path.resolve(__dirname, './md-strip-top-loader.js'),
        }],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /[.]{2}\/packages/,
            /^\.\/([^/]*?\/index\.js|boundless-utils[^/]*?\/README\.md|[^/]*?\/demo\/index\.js)$/
        ),

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
