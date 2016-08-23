import extractChildProps from './index';

const parentProps = {
    prop1: 'foo',
    prop2: 'bar',
    prop3: 'baz',
};

describe('UIUtils/extractChildProps utility', () => {
    it('returns the intersection of the first and second object properties by key', () => {
        const childPropTypes = {
            prop2: 'propType2',
        };

        expect(extractChildProps(parentProps, childPropTypes)).toEqual({prop2: 'bar'});
    });

    it('returns a blank object if there are no intersecting properties', () => {
        const childPropTypes = {
            prop4: 'propType4',
        };

        expect(extractChildProps(parentProps, childPropTypes)).toEqual({});
    });
});
