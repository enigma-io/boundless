/**
 * Returns a modified version of the supplied object without the given keys.
 *
 * ## Example Usage
 *
 * ```js
 * import omitKeys from 'boundless-utils-omit-keys';
 *
 * const obj = {foo: 'bar', bar: 'baz'};
 *
 * omitKeys(obj, ['bar']); // returns `{foo: 'bar'}`
 * ```
 */
export default function omitKeysFromSourceObject(source, omittedKeys = []) {
    return Object.keys(source).reduce(function relocateAcceptedKeys(hash, key) {
        if (omittedKeys.indexOf(key) === -1) {
            hash[key] = source[key];
        }

        return hash;
    }, {});
}
