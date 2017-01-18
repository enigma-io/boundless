/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const _ = require('lodash');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const baseConfig = require('./rollup.config.js');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const base = __dirname + '/../packages/';
const packages = fs.readdirSync(path.resolve(base)).filter((name) => /^boundless-(?!utils)/.test(name));
const error = (err) => console.error(chalk.bold.red(err));

packages.forEach((name) => {
    const pascalName = _.pascalCase(name);
    const entryPath = path.resolve(base + name + '/index.js');

    mkdirp.sync(path.resolve(base + name + '/build'));

    process.env.BABEL_ENV = 'development';

    const devRollupInstance = rollup.rollup(_.assign({}, baseConfig, {
        entry: entryPath,
        plugins: baseConfig.plugins.concat(
            uglify({
                compress: false,
                screwIE8: true,
            })
        ),
    }));

    Promise.all([
        devRollupInstance.then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/build/index.js'),
            format: 'cjs',
            sourceMap: 'inline',
        }), error),

        devRollupInstance.then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/build/index.standalone.js'),
            format: 'iife',
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            moduleName: pascalName,
        }), error),
    ]).then(() => {
        process.env.BABEL_ENV = 'production';

        rollup.rollup(_.assign({}, baseConfig, {
            entry: entryPath,
            plugins: baseConfig.plugins.concat(
                uglify({
                    compress: {
                        'drop_console': true,
                    },
                    screwIE8: true,
                })
            ),
        })).then((bundle) => bundle.write({
            dest: path.resolve(base + name + '/build/index.standalone.min.js'),
            format: 'iife',
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
            },
            moduleName: pascalName,
        })).catch(error);
    }, error).then(() => console.log(chalk.bold.green(`Built ${name}.`)), error);
});
