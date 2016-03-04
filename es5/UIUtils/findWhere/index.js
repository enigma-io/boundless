"use strict";

exports.__esModule = true;
exports.default = findWhere;
/**
 * Searches and returns the first occurence of an array item with the given property.
 * @module UIKit/utils/findWhere
 */

var _findWhereIndex = null;

/**
 * @param  {Array[Object]} array     an array of objects
 * @param  {String}        property  the name of the property to match against
 * @param  {*}             value     the value to match against (uses strict equality)
 *
 * @return {Object|undefined} The matched array item, or nothing.
 */
function findWhere(array, property, value) {
    _findWhereIndex = array.length - 1;

    while (_findWhereIndex > -1) {
        if (array[_findWhereIndex][property] === value) {
            return array[_findWhereIndex];
        }

        _findWhereIndex -= 1;
    }
} // optimized specifically to only look for a single key:value match

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvZmluZFdoZXJlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFjd0IsU0FBUzs7Ozs7O0FBVGpDLElBQUksZUFBZSxHQUFHLElBQUk7Ozs7Ozs7OztBQUFDLEFBU1osU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDdEQsbUJBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFbkMsV0FBTyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDekIsWUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQzVDLG1CQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNqQzs7QUFFRCx1QkFBZSxJQUFJLENBQUMsQ0FBQztLQUN4QjtDQUNKO0FBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNlYXJjaGVzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYW4gYXJyYXkgaXRlbSB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBtb2R1bGUgVUlLaXQvdXRpbHMvZmluZFdoZXJlXG4gKi9cblxubGV0IF9maW5kV2hlcmVJbmRleCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtICB7QXJyYXlbT2JqZWN0XX0gYXJyYXkgICAgIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIHByb3BlcnR5ICB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgdmFsdWUgICAgIHRoZSB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0ICh1c2VzIHN0cmljdCBlcXVhbGl0eSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfSBUaGUgbWF0Y2hlZCBhcnJheSBpdGVtLCBvciBub3RoaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kV2hlcmUoYXJyYXksIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIF9maW5kV2hlcmVJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoX2ZpbmRXaGVyZUluZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5W19maW5kV2hlcmVJbmRleF1bcHJvcGVydHldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5W19maW5kV2hlcmVJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBfZmluZFdoZXJlSW5kZXggLT0gMTtcbiAgICB9XG59IC8vIG9wdGltaXplZCBzcGVjaWZpY2FsbHkgdG8gb25seSBsb29rIGZvciBhIHNpbmdsZSBrZXk6dmFsdWUgbWF0Y2hcbiJdfQ==