const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
    entry: './exports.js',
    exports: 'named',
    external: [
        'react',
        'react-dom',
    ],
    format: 'iife',
    plugins: [
        resolve({
            main: true,
            module: true,
        }),
        commonjs({
            exclude: [
                'packages/*/demo/*.js',
                'packages/*/*.js',
                'exports.js',
            ],
        }),
        babel({exclude: 'node_modules'}),
    ],
    sourceMap: 'inline',
};
