'use strict';

exports.__esModule = true;

/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIUtils/transformProperty
 *
 * @return {String} the property key (e.g. `WebkitTransform`, `msTransform`)
 */

exports.default = function detectTransformProperty() {
    var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'webkit-transform'];

    // used in JSDOM
    for (var i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.documentElement.style) {
            return props[i];
        }
    }

    return false;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7O2tCQU9nQixTQUFTLHVCQUFULEdBQW1DO0FBQy9DLFFBQU0sUUFBUSxDQUNWLFdBRFUsRUFFVixpQkFGVSxFQUdWLGNBSFUsRUFJVixZQUpVLEVBS1YsYUFMVSxFQU1WLGtCQU5VLENBQWQ7O0FBTXdCO0FBR3hCLFNBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxNQUFNLE1BQU0sTUFBNUIsRUFBb0MsSUFBSSxHQUF4QyxFQUE2QyxHQUE3QyxFQUFrRDtBQUM5QyxZQUFJLE1BQU0sQ0FBTixLQUFZLFNBQVMsZUFBVCxDQUF5QixLQUF6QyxFQUFnRDtBQUM1QyxtQkFBTyxNQUFNLENBQU4sQ0FBUDtBQUNIO0FBQ0o7O0FBRUQsV0FBTyxLQUFQO0FBQ0gsQ0FqQmMsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IGZvciB1c2UgaW4gcHJvZ3JhbW1hdGljIHRyYW5zZm9ybSBzdHlsZSBtYW5pcHVsYXRpb24uXG4gKiBAbW9kdWxlIFVJVXRpbHMvdHJhbnNmb3JtUHJvcGVydHlcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiJdfQ==