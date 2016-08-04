import UIKit from '../exports.js';
import fs from 'fs';

describe('exports', () => {
    it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
        Object.keys(global.UIKit).forEach(key => {
            expect(UIKit).not.toBeUndefined();
        });
    });

    it('should have as many keys as there are component folders', () => {
        // only get folders starting with "UI"
        const folders = fs.readdirSync(__dirname + '/../').filter(name => /^UI/.test(name));

        folders.forEach(name => expect(UIKit[name]).not.toBeUndefined());
    });

    describe('UIUtils', () => {
        it('should exist', () => {
            expect(UIKit.UIUtils).not.toBeUndefined();
        });

        it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(UIKit.UIUtils).forEach(key => {
                expect(UIKit.UIUtils[key]).not.toBeUndefined();
            });
        });
    });

    describe('globalized exports', () => {
        it('should exist', () => {
            expect(global.UIKit).not.toBeUndefined();
        });

        it('should not have any undefined keys (if failed, the require is probably wrong)', () => {
            Object.keys(global.UIKit).forEach(key => {
                expect(UIKit).not.toBeUndefined();
            });
        });

        it('should have as many keys as there are component folders', () => {
            // only get folders starting with "UI"
            const folders = fs.readdirSync(__dirname + '/../').filter(name => /^UI/.test(name));

            folders.forEach(name => {
                expect(global.UIKit[name]).not.toBeUndefined();
            });
        });
    })
});
