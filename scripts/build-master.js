/* eslint-disable no-console */

const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const baseConfig = require('./rollup.config.js');

const base = __dirname + '/../';

mkdirp.sync(path.resolve(base + '/public'));

process.env.BABEL_ENV = 'rollup-development';

Promise.all([
    rollup.rollup(_.assign({}, baseConfig, {
        plugins: baseConfig.plugins.concat(
            uglify({
                compress: false,
                screwIE8: true,
            })
        ),
    })).then((bundle) => bundle.write({
        dest: path.resolve(base + '/public/boundless.js'),
        format: 'cjs',
        sourceMap: 'inline',
    })),

    rollup.rollup(_.assign({}, baseConfig, {
        plugins: baseConfig.plugins.concat(
            uglify({
                compress: false,
                screwIE8: true,
            })
        ),
    })).then((bundle) => bundle.write({
        dest: path.resolve(base + '/public/boundless.standalone.js'),
        format: 'iife',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
        moduleName: 'Boundless',
        sourceMap: 'inline',
    })),
]).then(() => {
    process.env.BABEL_ENV = 'production';

    rollup.rollup(_.assign({}, baseConfig, {
        plugins: baseConfig.plugins.concat(
            uglify({
                compress: {
                    'drop_console': true,
                },
                screwIE8: true,
                warnings: true,
            })
        ),
    })).then((bundle) => bundle.write({
        dest: path.resolve(base + '/public/boundless.standalone.min.js'),
        format: 'iife',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
        moduleName: 'Boundless',
    })).then(() => console.log('Built the master JS files.'));
});
