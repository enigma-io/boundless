import shallowEqual from './index';

describe('UIUtils/shallowEqual', () => {
    it('should return false for non-equal types', () => {
        expect(shallowEqual([], {})).to.be.false;
    });

    it('should return false if an item is missing from the first passed object', () => {
        expect(shallowEqual([1], [1, 2])).to.be.false;
    });

    it('should return false if an item is missing from the second passed object', () => {
        expect(shallowEqual([1, 2], [2])).to.be.false;
    });

    it('should return false if a property is missing from the first passed object', () => {
        expect(shallowEqual({foo: 'bar'}, {foo: 'bar', bar: 'baz'})).to.be.false;
    });

    it('should return false if a property is missing from the second passed object', () => {
        expect(shallowEqual({foo: 'bar', bar: 'baz'}, {foo: 'bar'})).to.be.false;
    });

    it('should return false if a value of a key fails a strict equality check against its pair', () => {
        expect(shallowEqual({foo: 'bar'}, {foo: 'baz'})).to.be.false;
    });

    it('should return false for two functions that are not the same reference', () => {
        expect(shallowEqual(function(){}, function(){})).to.be.false;
    });

    it('should return true for the exact same value passed twice', () => {
        expect(shallowEqual('hello', 'hello')).to.be.true;
    });

    it('should return true for the exact same reference passed twice', () => {
        const test = [];

        expect(shallowEqual(test, test)).to.be.true;
    });

    it('should return true for two arrays with no items', () => {
        expect(shallowEqual([], [])).to.be.true;
    });

    it('should return true for two objects with no (own) properties', () => {
        expect(shallowEqual({}, {})).to.be.true;
    });
});
