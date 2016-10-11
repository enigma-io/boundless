"use strict";

exports.__esModule = true;
exports.default = omitKeysFromSourceObject;
/**
 * Returns a modified version of the supplied object without the given keys.
 */

function omitKeysFromSourceObject(source) {
    var omittedKeys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    return Object.keys(source).reduce(function relocateAcceptedKeys(hash, key) {
        if (omittedKeys.indexOf(key) === -1) {
            hash[key] = source[key];
        }

        return hash;
    }, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvb21pdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBSXdCLHdCO0FBSnhCOzs7O0FBSWUsU0FBUyx3QkFBVCxDQUFrQyxNQUFsQyxFQUE0RDtBQUFBLFFBQWxCLFdBQWtCLHlEQUFKLEVBQUk7O0FBQ3ZFLFdBQU8sT0FBTyxJQUFQLENBQVksTUFBWixFQUFvQixNQUFwQixDQUEyQixTQUFTLG9CQUFULENBQThCLElBQTlCLEVBQW9DLEdBQXBDLEVBQXlDO0FBQ3ZFLFlBQUksWUFBWSxPQUFaLENBQW9CLEdBQXBCLE1BQTZCLENBQUMsQ0FBbEMsRUFBcUM7QUFDakMsaUJBQUssR0FBTCxJQUFZLE9BQU8sR0FBUCxDQUFaO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBRUgsS0FQTSxFQU9KLEVBUEksQ0FBUDtBQVFIIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm5zIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0IHdpdGhvdXQgdGhlIGdpdmVuIGtleXMuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb21pdEtleXNGcm9tU291cmNlT2JqZWN0KHNvdXJjZSwgb21pdHRlZEtleXMgPSBbXSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiByZWxvY2F0ZUFjY2VwdGVkS2V5cyhoYXNoLCBrZXkpIHtcbiAgICAgICAgaWYgKG9taXR0ZWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGhhc2hba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhc2g7XG5cbiAgICB9LCB7fSk7XG59XG4iXX0=