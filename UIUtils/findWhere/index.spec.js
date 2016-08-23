import findWhere from './index';

describe('UIUtils/findWhere utility', () => {
    it('finds the first match', () => {
        const testArray = [
            {name: 'Aaron Sanders'},
            {name: 'Jessica Smith'},
        ];

        expect(findWhere(testArray, 'name', 'Aaron Sanders')).toBe(testArray[0]);
    });

    it('returns nothing if there is no match', () => {
        const testArray = [
            {name: 'Aaron Sanders'},
            {name: 'Jessica Smith'},
        ];

        expect(findWhere(testArray, 'name', 'Mark Zuckerberg')).toBeUndefined();
    });
});
