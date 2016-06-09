import extractChildProps from '../index';

const parentProps = {
    prop1: 'foo',
    prop2: 'bar',
    prop3: 'baz',
};

describe('UIUtils/extractChildProps', () => {
    it('should work', () => {
        const childPropTypes = {
            prop2: 'propType2',
        };

        expect(extractChildProps(parentProps, childPropTypes)).toEqual({prop2: 'bar'});
    });

    it('should return nothing if there is no match', () => {
        const childPropTypes = {
            prop4: 'propType4',
        };

        expect(extractChildProps(parentProps, childPropTypes)).toEqual({});
    });
});
