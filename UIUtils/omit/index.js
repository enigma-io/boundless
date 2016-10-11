/**
 * Returns a modified version of the supplied object without the given keys.
 */

export default function omitKeysFromSourceObject(source, omittedKeys = []) {
    return Object.keys(source).reduce(function relocateAcceptedKeys(hash, key) {
        if (omittedKeys.indexOf(key) === -1) {
            hash[key] = source[key];
        }

        return hash;

    }, {});
}
