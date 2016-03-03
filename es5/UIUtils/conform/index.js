'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = verifyConformance;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A testing module to verify that arbitrary React-supported attributes are passed
 * through the destination element node. The conformance checker uses the following
 * valid JSX attributes as examples:
 *
 * - className
 * - id
 * - style
 * - data-foo
 * - aria-label
 *
 * Each must be able to be mixed and matched without overwriting each other,
 * with the exception of `id`, where `props.id`
 *
  * @param  {function}  render       a pre-build render function to take in vdom and render to a designated place
 * @param  {function}  Constructor  a valid ReactClass
 * @param  {object}    baseProps    any fundamental props that are needed for the component to be rendered successfully
 * @param  {string}   [ref]         a specific ref identifier to check for compliance instead of the base element; this is
 *                                  used for React components that render to <body> or a node other than its logical parent
 */
function verifyConformance(render, Constructor, baseProps, ref) {
    var node = undefined;

    var renderWithPropsAndGetNode = function renderWithPropsAndGetNode(props) {
        var element = render(_react2.default.createElement(Constructor, _extends({}, baseProps, props)));

        if (ref) {
            return element.refs[ref] instanceof HTMLElement ? element.refs[ref] : _reactDom2.default.findDOMNode(element.refs[ref]);
        }

        return _reactDom2.default.findDOMNode(element);
    };

    /* verify props.className */
    node = renderWithPropsAndGetNode({ className: 'foo' });

    expect(node.classList.contains('foo')).toBe(true, Constructor.name + ' does not support adding of classes via props.className');

    /* verify props.id */
    node = renderWithPropsAndGetNode({ id: 'foo' });

    expect(node.id === 'foo').toBe(true, Constructor.name + ' does not support adding of an HTML id via props.id');

    /* verify props.style */
    node = renderWithPropsAndGetNode({ style: { color: 'red' } });

    expect(node.style.color === 'red').toBe(true, Constructor.name + ' does not support adding inline styles via props.style');

    /* verify props['data-foo'] */
    node = renderWithPropsAndGetNode({ 'data-foo': 'bar' });

    expect(node.getAttribute('data-foo') === 'bar').toBe(true, Constructor.name + ' does not support adding data attributes via props');

    /* verify props['aria-label'] */
    node = renderWithPropsAndGetNode({ 'aria-label': 'foo' });

    expect(node.getAttribute('aria-label') === 'foo').toBe(true, Constructor.name + ' does not support adding aria attributes via props');
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBVCxTQUFTLGlCQUFULENBQTJCLE1BQTNCLEVBQW1DLFdBQW5DLEVBQWdELFNBQWhELEVBQTJELEdBQTNELEVBQWdFO0FBQzNFLFFBQUksZ0JBQUosQ0FEMkU7O0FBRzNFLFFBQU0sNEJBQTRCLFNBQTVCLHlCQUE0QixRQUFTO0FBQ3ZDLFlBQU0sVUFBVSxPQUNaLGdCQUFNLGFBQU4sQ0FDSSxXQURKLGVBRVcsV0FDQSxNQUhYLENBRFksQ0FBVixDQURpQzs7QUFVdkMsWUFBSSxHQUFKLEVBQVM7QUFDTCxtQkFBUyxRQUFRLElBQVIsQ0FBYSxHQUFiLGFBQTZCLFdBQTdCLEdBQ0EsUUFBUSxJQUFSLENBQWEsR0FBYixDQURBLEdBRUEsbUJBQVMsV0FBVCxDQUFxQixRQUFRLElBQVIsQ0FBYSxHQUFiLENBQXJCLENBRkEsQ0FESjtTQUFUOztBQU1BLGVBQU8sbUJBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFQLENBaEJ1QztLQUFUOzs7QUFIeUMsUUF1QjNFLEdBQU8sMEJBQTBCLEVBQUMsV0FBVyxLQUFYLEVBQTNCLENBQVAsQ0F2QjJFOztBQXlCM0UsV0FBTyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQXhCLENBQVAsRUFBdUMsSUFBdkMsQ0FBNEMsSUFBNUMsRUFDTyxZQUFZLElBQVosNERBRFA7OztBQXpCMkUsUUE4QjNFLEdBQU8sMEJBQTBCLEVBQUMsSUFBSSxLQUFKLEVBQTNCLENBQVAsQ0E5QjJFOztBQWdDM0UsV0FBTyxLQUFLLEVBQUwsS0FBWSxLQUFaLENBQVAsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFDTyxZQUFZLElBQVosd0RBRFA7OztBQWhDMkUsUUFxQzNFLEdBQU8sMEJBQTBCLEVBQUMsT0FBTyxFQUFDLE9BQU8sS0FBUCxFQUFSLEVBQTNCLENBQVAsQ0FyQzJFOztBQXVDM0UsV0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLEtBQXJCLENBQVAsQ0FBbUMsSUFBbkMsQ0FBd0MsSUFBeEMsRUFDTyxZQUFZLElBQVosMkRBRFA7OztBQXZDMkUsUUE0QzNFLEdBQU8sMEJBQTBCLEVBQUMsWUFBWSxLQUFaLEVBQTNCLENBQVAsQ0E1QzJFOztBQThDM0UsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsTUFBa0MsS0FBbEMsQ0FBUCxDQUFnRCxJQUFoRCxDQUFxRCxJQUFyRCxFQUNPLFlBQVksSUFBWix1REFEUDs7O0FBOUMyRSxRQW1EM0UsR0FBTywwQkFBMEIsRUFBQyxjQUFjLEtBQWQsRUFBM0IsQ0FBUCxDQW5EMkU7O0FBcUQzRSxXQUFPLEtBQUssWUFBTCxDQUFrQixZQUFsQixNQUFvQyxLQUFwQyxDQUFQLENBQWtELElBQWxELENBQXVELElBQXZELEVBQ08sWUFBWSxJQUFaLHVEQURQLEVBckQyRTtDQUFoRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuLyoqXG4gKiBBIHRlc3RpbmcgbW9kdWxlIHRvIHZlcmlmeSB0aGF0IGFyYml0cmFyeSBSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlcyBhcmUgcGFzc2VkXG4gKiB0aHJvdWdoIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50IG5vZGUuIFRoZSBjb25mb3JtYW5jZSBjaGVja2VyIHVzZXMgdGhlIGZvbGxvd2luZ1xuICogdmFsaWQgSlNYIGF0dHJpYnV0ZXMgYXMgZXhhbXBsZXM6XG4gKlxuICogLSBjbGFzc05hbWVcbiAqIC0gaWRcbiAqIC0gc3R5bGVcbiAqIC0gZGF0YS1mb29cbiAqIC0gYXJpYS1sYWJlbFxuICpcbiAqIEVhY2ggbXVzdCBiZSBhYmxlIHRvIGJlIG1peGVkIGFuZCBtYXRjaGVkIHdpdGhvdXQgb3ZlcndyaXRpbmcgZWFjaCBvdGhlcixcbiAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgaWRgLCB3aGVyZSBgcHJvcHMuaWRgXG4gKlxuICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgcmVuZGVyICAgICAgIGEgcHJlLWJ1aWxkIHJlbmRlciBmdW5jdGlvbiB0byB0YWtlIGluIHZkb20gYW5kIHJlbmRlciB0byBhIGRlc2lnbmF0ZWQgcGxhY2VcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgQ29uc3RydWN0b3IgIGEgdmFsaWQgUmVhY3RDbGFzc1xuICogQHBhcmFtICB7b2JqZWN0fSAgICBiYXNlUHJvcHMgICAgYW55IGZ1bmRhbWVudGFsIHByb3BzIHRoYXQgYXJlIG5lZWRlZCBmb3IgdGhlIGNvbXBvbmVudCB0byBiZSByZW5kZXJlZCBzdWNjZXNzZnVsbHlcbiAqIEBwYXJhbSAge3N0cmluZ30gICBbcmVmXSAgICAgICAgIGEgc3BlY2lmaWMgcmVmIGlkZW50aWZpZXIgdG8gY2hlY2sgZm9yIGNvbXBsaWFuY2UgaW5zdGVhZCBvZiB0aGUgYmFzZSBlbGVtZW50OyB0aGlzIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIGZvciBSZWFjdCBjb21wb25lbnRzIHRoYXQgcmVuZGVyIHRvIDxib2R5PiBvciBhIG5vZGUgb3RoZXIgdGhhbiBpdHMgbG9naWNhbCBwYXJlbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5Q29uZm9ybWFuY2UocmVuZGVyLCBDb25zdHJ1Y3RvciwgYmFzZVByb3BzLCByZWYpIHtcbiAgICBsZXQgbm9kZTtcblxuICAgIGNvbnN0IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUgPSBwcm9wcyA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZW5kZXIoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIENvbnN0cnVjdG9yLCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgICAgcmV0dXJuICAgZWxlbWVudC5yZWZzW3JlZl0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgID8gZWxlbWVudC5yZWZzW3JlZl1cbiAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKGVsZW1lbnQucmVmc1tyZWZdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZShlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmNsYXNzTmFtZSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtjbGFzc05hbWU6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZvbycpKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGNsYXNzZXMgdmlhIHByb3BzLmNsYXNzTmFtZWBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmlkICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe2lkOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuaWQgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGFuIEhUTUwgaWQgdmlhIHByb3BzLmlkYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHMuc3R5bGUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7c3R5bGU6IHtjb2xvcjogJ3JlZCd9fSk7XG5cbiAgICBleHBlY3Qobm9kZS5zdHlsZS5jb2xvciA9PT0gJ3JlZCcpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgaW5saW5lIHN0eWxlcyB2aWEgcHJvcHMuc3R5bGVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wc1snZGF0YS1mb28nXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnZGF0YS1mb28nOiAnYmFyJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpID09PSAnYmFyJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBkYXRhIGF0dHJpYnV0ZXMgdmlhIHByb3BzYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2FyaWEtbGFiZWwnXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnYXJpYS1sYWJlbCc6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gJ2ZvbycpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgYXJpYSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xufTtcbiJdfQ==