import findWhere from './index';

describe('findWhere utility', () => {
    it('finds the first array item that has the given key:value', () => {
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
