const getExactType = function retrieveDeepType(object) {
    return Object.prototype.toString.call(object);
};

const compareObjectKeys = function compareObjectKeys(key, baseArray) {
    return typeof this[key] !== 'undefined' && baseArray[key] === this[key];
}; // `this` is set to the comparison array

export default function checkShallowEquality(a, b) {
    if (a === b) {
        return true;
    }

    const type = getExactType(a);

    if (    type !== getExactType(b)                                    // type mismatches can't be compared
        || (type !== '[object Object]' && type !== '[object Array]')) { // functions, Promises, etc cannot be directly compared
        return false;
    }

    if (type === '[object Object]') {
        return Object.keys(a).every(compareObjectKeys, b) && Object.keys(b).every(compareObjectKeys, a);
    }

    return    a.every(function validateArrayItemExists(item) { return b.indexOf(item) !== -1; })
           && b.every(function validateArrayItemExists(item) { return a.indexOf(item) !== -1; });
}
