import * as UIKit from './exports.js';
import fs from 'fs';

describe('exports', () => {
    it('does not have any undefined keys (if failed, the require is probably wrong)', () => {
        Object.keys(UIKit).forEach(key => expect(UIKit).not.toBeUndefined());
    });

    it('has as many keys as there are component folders', () => {
        // only get folders starting with "UI"
        const folders = fs.readdirSync('.').filter(name => /^UI/.test(name));

        folders.forEach(name => expect(UIKit[name]).not.toBeUndefined());
    });

    describe('UIUtils', () => {
        it('exists', () => {
            expect(UIKit.UIUtils).not.toBeUndefined();
        });

        it('does not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(UIKit.UIUtils).forEach(key => expect(UIKit.UIUtils[key]).not.toBeUndefined());
        });
    });

    describe('globalized exports', () => {
        it('exists', () => {
            expect(UIKit).not.toBeUndefined();
        });

        it('does not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(UIKit).forEach(key => expect(UIKit).not.toBeUndefined());
        });

        it('has as many keys as there are component folders', () => {
            // only get folders starting with "UI"
            const folders = fs.readdirSync('.').filter(name => /^UI/.test(name));

            folders.forEach(name => expect(UIKit[name]).not.toBeUndefined());
        });
    })
});
