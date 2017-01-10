import * as Boundless from './exports.js';
import * as _ from 'lodash';
import fs from 'fs';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

describe('exports', () => {
    it('does not have any undefined keys (if failed, the require is probably wrong)', () => {
        Object.keys(Boundless).forEach((key) => expect(Boundless[key]).not.toBeUndefined());
    });

    it('has as many keys as there are component folders (except utils)', () => {
        const folders = fs.readdirSync('packages').filter((name) => /^boundless-(?!utils)/.test(name));

        folders.forEach((name) => {
            const exportName = _.pascalCase(name.replace('boundless-', ''));

            expect(Boundless[exportName]).not.toBeUndefined();
        });
    });
});
