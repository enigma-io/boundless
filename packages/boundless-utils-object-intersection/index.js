/**
 * Returns a new object that is an intersection of the keys between the first and second object arguments.
 *
 * ## Example Usage
 *
 * ```js
 * import intersect from 'boundless-utils-object-intersection';
 *
 * const obj1 = {foo: 'bar', bar: 'baz', baz: 'fizz'};
 * const obj2 = {bar: 'x'};
 *
 * intersect(obj1, obj2); // returns `{bar: 'baz'}`
 * ```
 */
export default function getIntersection(obj1, obj2) {
    return Object.keys(obj2).reduce((childProps, key) => {
        if (key in obj1) {
            childProps[key] = obj1[key];
        }

        return childProps;

    }, {});
}
