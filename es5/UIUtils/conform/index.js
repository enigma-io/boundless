'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQXVCd0IsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUExQixTQUFTLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtBQUMzRSxRQUFJLElBQUksWUFBQSxDQUFDOztBQUVULFFBQU0seUJBQXlCLEdBQUcsU0FBNUIseUJBQXlCLENBQUcsS0FBSyxFQUFJO0FBQ3ZDLFlBQU0sT0FBTyxHQUFHLE1BQU0sQ0FDbEIsZ0JBQU0sYUFBYSxDQUNmLFdBQVcsZUFDSixTQUFTLEVBQ1QsS0FBSyxFQUVmLENBQ0osQ0FBQzs7QUFFRixZQUFJLEdBQUcsRUFBRTtBQUNMLG1CQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksV0FBVyxHQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUNqQixtQkFBUyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEOztBQUVELGVBQU8sbUJBQVMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDOzs7QUFBQyxBQUdGLFFBQUksR0FBRyx5QkFBeUIsQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDOztBQUVyRCxVQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUN6QyxXQUFXLENBQUMsSUFBSSw2REFDdEI7OztBQUFDLEFBR0YsUUFBSSxHQUFHLHlCQUF5QixDQUFDLEVBQUMsRUFBRSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7O0FBRTlDLFVBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQzVCLFdBQVcsQ0FBQyxJQUFJLHlEQUN0Qjs7O0FBQUMsQUFHRixRQUFJLEdBQUcseUJBQXlCLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEVBQUMsQ0FBQyxDQUFDOztBQUUxRCxVQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFDckMsV0FBVyxDQUFDLElBQUksNERBQ3RCOzs7QUFBQyxBQUdGLFFBQUksR0FBRyx5QkFBeUIsQ0FBQyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDOztBQUV0RCxVQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNsRCxXQUFXLENBQUMsSUFBSSx3REFDdEI7OztBQUFDLEFBR0YsUUFBSSxHQUFHLHlCQUF5QixDQUFDLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7O0FBRXhELFVBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ3BELFdBQVcsQ0FBQyxJQUFJLHdEQUN0QixDQUFDO0NBQ0wsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuLyoqXG4gKiBBIHRlc3RpbmcgbW9kdWxlIHRvIHZlcmlmeSB0aGF0IGFyYml0cmFyeSBSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlcyBhcmUgcGFzc2VkXG4gKiB0aHJvdWdoIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50IG5vZGUuIFRoZSBjb25mb3JtYW5jZSBjaGVja2VyIHVzZXMgdGhlIGZvbGxvd2luZ1xuICogdmFsaWQgSlNYIGF0dHJpYnV0ZXMgYXMgZXhhbXBsZXM6XG4gKlxuICogLSBjbGFzc05hbWVcbiAqIC0gaWRcbiAqIC0gc3R5bGVcbiAqIC0gZGF0YS1mb29cbiAqIC0gYXJpYS1sYWJlbFxuICpcbiAqIEVhY2ggbXVzdCBiZSBhYmxlIHRvIGJlIG1peGVkIGFuZCBtYXRjaGVkIHdpdGhvdXQgb3ZlcndyaXRpbmcgZWFjaCBvdGhlcixcbiAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgaWRgLCB3aGVyZSBgcHJvcHMuaWRgXG4gKlxuICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgcmVuZGVyICAgICAgIGEgcHJlLWJ1aWxkIHJlbmRlciBmdW5jdGlvbiB0byB0YWtlIGluIHZkb20gYW5kIHJlbmRlciB0byBhIGRlc2lnbmF0ZWQgcGxhY2VcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgQ29uc3RydWN0b3IgIGEgdmFsaWQgUmVhY3RDbGFzc1xuICogQHBhcmFtICB7b2JqZWN0fSAgICBiYXNlUHJvcHMgICAgYW55IGZ1bmRhbWVudGFsIHByb3BzIHRoYXQgYXJlIG5lZWRlZCBmb3IgdGhlIGNvbXBvbmVudCB0byBiZSByZW5kZXJlZCBzdWNjZXNzZnVsbHlcbiAqIEBwYXJhbSAge3N0cmluZ30gICBbcmVmXSAgICAgICAgIGEgc3BlY2lmaWMgcmVmIGlkZW50aWZpZXIgdG8gY2hlY2sgZm9yIGNvbXBsaWFuY2UgaW5zdGVhZCBvZiB0aGUgYmFzZSBlbGVtZW50OyB0aGlzIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIGZvciBSZWFjdCBjb21wb25lbnRzIHRoYXQgcmVuZGVyIHRvIDxib2R5PiBvciBhIG5vZGUgb3RoZXIgdGhhbiBpdHMgbG9naWNhbCBwYXJlbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5Q29uZm9ybWFuY2UocmVuZGVyLCBDb25zdHJ1Y3RvciwgYmFzZVByb3BzLCByZWYpIHtcbiAgICBsZXQgbm9kZTtcblxuICAgIGNvbnN0IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUgPSBwcm9wcyA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZW5kZXIoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIENvbnN0cnVjdG9yLCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgICAgcmV0dXJuICAgZWxlbWVudC5yZWZzW3JlZl0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgICAgICAgICAgID8gZWxlbWVudC5yZWZzW3JlZl1cbiAgICAgICAgICAgICAgICAgICA6IFJlYWN0RE9NLmZpbmRET01Ob2RlKGVsZW1lbnQucmVmc1tyZWZdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZShlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmNsYXNzTmFtZSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtjbGFzc05hbWU6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZvbycpKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGNsYXNzZXMgdmlhIHByb3BzLmNsYXNzTmFtZWBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmlkICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe2lkOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuaWQgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGFuIEhUTUwgaWQgdmlhIHByb3BzLmlkYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHMuc3R5bGUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7c3R5bGU6IHtjb2xvcjogJ3JlZCd9fSk7XG5cbiAgICBleHBlY3Qobm9kZS5zdHlsZS5jb2xvciA9PT0gJ3JlZCcpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgaW5saW5lIHN0eWxlcyB2aWEgcHJvcHMuc3R5bGVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wc1snZGF0YS1mb28nXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnZGF0YS1mb28nOiAnYmFyJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpID09PSAnYmFyJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBkYXRhIGF0dHJpYnV0ZXMgdmlhIHByb3BzYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2FyaWEtbGFiZWwnXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnYXJpYS1sYWJlbCc6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gJ2ZvbycpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgYXJpYSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xufTtcbiJdfQ==