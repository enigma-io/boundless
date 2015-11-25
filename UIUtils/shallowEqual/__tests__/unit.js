import shallowEqual from '../../shallowEqual';

describe('UIUtils/shallowEqual', () => {
    it('should return false for non-equal types', () => {
        expect(shallowEqual([], {})).toBe(false);
    });

    it('should return false if an item is missing from the first passed object', () => {
        expect(shallowEqual([1], [1, 2])).toBe(false);
    });

    it('should return false if an item is missing from the second passed object', () => {
        expect(shallowEqual([1, 2], [2])).toBe(false);
    });

    it('should return false if a property is missing from the first passed object', () => {
        expect(shallowEqual({foo: 'bar'}, {foo: 'bar', bar: 'baz'})).toBe(false);
    });

    it('should return false if a property is missing from the second passed object', () => {
        expect(shallowEqual({foo: 'bar', bar: 'baz'}, {foo: 'bar'})).toBe(false);
    });

    it('should return false if a value of a key fails a strict equality check against its pair', () => {
        expect(shallowEqual({foo: 'bar'}, {foo: 'baz'})).toBe(false);
    });

    it('should return false for two functions that are not the same reference', () => {
        expect(shallowEqual(function(){}, function(){})).toBe(false);
    });

    it('should return true for the exact same value passed twice', () => {
        expect(shallowEqual('hello', 'hello')).toBe(true);
    });

    it('should return true for the exact same reference passed twice', () => {
        const test = [];

        expect(shallowEqual(test, test)).toBe(true);
    });

    it('should return true for two arrays with no items', () => {
        expect(shallowEqual([], [])).toBe(true);
    });

    it('should return true for two objects with no (own) properties', () => {
        expect(shallowEqual({}, {})).toBe(true);
    });
});
