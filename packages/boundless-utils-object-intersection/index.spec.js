import intersect from './index';

const obj1 = {
    prop1: 'foo',
    prop2: 'bar',
    prop3: 'baz',
};

describe('object intersection utility', () => {
    it('returns the intersection of the first and second object properties by key', () => {
        const obj2 = {
            prop2: 'fizz',
        };

        expect(intersect(obj1, obj2)).toEqual({prop2: 'bar'});
    });

    it('returns a blank object if there are no intersecting properties', () => {
        const obj2 = {
            prop4: 'fizz',
        };

        expect(intersect(obj1, obj2)).toEqual({});
    });
});
