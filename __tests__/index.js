import UIKit from '../exports.js';
import fs from 'fs';

describe('exports', () => {
    it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
        Object.keys(global.UIKit).forEach(key => {
            expect(UIKit).not.toBeUndefined(`${key} is resolving as undefined in exports.js`);
        });
    });

    it('should have as many keys as there are component folders', () => {
        // only get folders starting with "UI"
        const folders = fs.readdirSync(__dirname + '/../').filter(name => /^UI/.test(name));

        folders.forEach(name => expect(UIKit[name]).not.toBeUndefined(`${name} is missing in exports.js`));
    });

    describe('UIUtils', () => {
        it('should exist', () => {
            expect(UIKit.UIUtils).not.toBeUndefined('UIKit.UIUtils is missing');
        });

        it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(UIKit.UIUtils).forEach(key => {
                expect(UIKit.UIUtils[key]).not.toBeUndefined(`UIUtils/${key} is resolving as undefined in exports.js`);
            });
        });
    });

    describe('globalized exports', () => {
        it('should exist', () => {
            expect(global.UIKit).not.toBeUndefined();
        });

        it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(global.UIKit).forEach(key => {
                expect(UIKit).not.toBeUndefined(`global.UIKit.${key} is resolving as undefined in exports.js`);
            });
        });

        it('should have as many keys as there are component folders', () => {
            // only get folders starting with "UI"
            const folders = fs.readdirSync(__dirname + '/../').filter(name => /^UI/.test(name));

            folders.forEach(name => {
                expect(global.UIKit[name]).not.toBeUndefined(`${name} is missing from the global export in exports.js`);
            });
        });
    })
});
