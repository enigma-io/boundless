'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Returns the appropriate vendor-prefixed property for use in programmatic transform style manipulation.
 * @module UIKit/utils/transform
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvdHJhbnNmb3JtL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQkFPZSxBQUFDLFNBQVMsdUJBQXVCLEdBQUc7QUFDL0MsUUFBTSxLQUFLLEdBQUcsQ0FDVixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxZQUFZLEVBQ1osYUFBYSxFQUNiLGtCQUFrQixDQUNyQixDQUFDOzs7QUFFRixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzlDLFlBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFO0FBQzVDLG1CQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKOztBQUVELFdBQU8sS0FBSyxDQUFDO0NBQ2hCLEVBQUciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHZlbmRvci1wcmVmaXhlZCBwcm9wZXJ0eSBmb3IgdXNlIGluIHByb2dyYW1tYXRpYyB0cmFuc2Zvcm0gc3R5bGUgbWFuaXB1bGF0aW9uLlxuICogQG1vZHVsZSBVSUtpdC91dGlscy90cmFuc2Zvcm1cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwcm9wZXJ0eSBrZXkgKGUuZy4gYFdlYmtpdFRyYW5zZm9ybWAsIGBtc1RyYW5zZm9ybWApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGRldGVjdFRyYW5zZm9ybVByb3BlcnR5KCkge1xuICAgIGNvbnN0IHByb3BzID0gW1xuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgJ1dlYmtpdFRyYW5zZm9ybScsXG4gICAgICAgICdNb3pUcmFuc2Zvcm0nLFxuICAgICAgICAnT1RyYW5zZm9ybScsXG4gICAgICAgICdtc1RyYW5zZm9ybScsXG4gICAgICAgICd3ZWJraXQtdHJhbnNmb3JtJywgLy8gdXNlZCBpbiBKU0RPTVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb3BzW2ldIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcbiJdfQ==