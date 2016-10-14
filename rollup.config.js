import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: './exports.js',
    external: [
        'react',
        'react-dom',
    ],
    format: 'iife',
    moduleName: 'UIKit',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
        }),

        commonjs({exclude: ['UI*/**', 'exports.js']}),
        babel({exclude: 'node_modules/**'}),
    ],
    sourceMap: 'inline',
};
