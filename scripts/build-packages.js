/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const baseConfig = require('./rollup.config.js');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const base = __dirname + '/../packages/';
const packages = fs.readdirSync(path.resolve(base)).filter((name) => /^boundless/.test(name));

packages.forEach((name) => {
    const pascalName = _.pascalCase(name);

    mkdirp.sync(path.resolve(base + name + '/dist'));

    process.env.BABEL_ENV = 'rollup-development';

    Promise.all([
        rollup.rollup(_.assign({}, baseConfig, {
            entry: path.resolve(base + name + '/index.js'),
        })).then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/dist/index.js'),
            format: 'cjs',
            sourceMap: 'inline',
        })),

        rollup.rollup(_.assign({}, baseConfig, {
            entry: path.resolve(base + name + '/index.js'),
            plugins: baseConfig.plugins.concat(
                uglify()
            ),
        })).then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/dist/index.standalone.js'),
            format: 'iife',
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            moduleName: pascalName,
        })),
    ]).then(() => {
        process.env.BABEL_ENV = 'production';

        rollup.rollup(_.assign({}, baseConfig, {
            entry: path.resolve(base + name + '/index.js'),
            plugins: baseConfig.plugins.concat(
                uglify()
            ),
        })).then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/dist/index.standalone.min.js'),
            format: 'iife',
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            moduleName: pascalName,
        })).then(() => console.log(`Built ${name}.`));
    });
});
