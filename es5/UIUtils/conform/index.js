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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O2tCQXVCd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsU0FBUyxpQkFBVCxDQUEyQixNQUEzQixFQUFtQyxXQUFuQyxFQUFnRCxTQUFoRCxFQUEyRCxHQUEzRCxFQUFnRTtBQUMzRSxRQUFJLGdCQUFKLENBRDJFOztBQUczRSxRQUFNLDRCQUE0QixTQUE1Qix5QkFBNEIsUUFBUztBQUN2QyxZQUFNLFVBQVUsT0FDWixnQkFBTSxhQUFOLENBQ0ksV0FESixlQUVXLFdBQ0EsTUFIWCxDQURZLENBQVYsQ0FEaUM7O0FBVXZDLFlBQUksR0FBSixFQUFTO0FBQ0wsbUJBQVMsUUFBUSxJQUFSLENBQWEsR0FBYixhQUE2QixXQUE3QixHQUNBLFFBQVEsSUFBUixDQUFhLEdBQWIsQ0FEQSxHQUVBLG1CQUFTLFdBQVQsQ0FBcUIsUUFBUSxJQUFSLENBQWEsR0FBYixDQUFyQixDQUZBLENBREo7U0FBVDs7QUFNQSxlQUFPLG1CQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBUCxDQWhCdUM7S0FBVDs7O0FBSHlDLFFBdUIzRSxHQUFPLDBCQUEwQixFQUFDLFdBQVcsS0FBWCxFQUEzQixDQUFQLENBdkIyRTs7QUF5QjNFLFdBQU8sS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixLQUF4QixDQUFQLEVBQXVDLElBQXZDLENBQTRDLElBQTVDLEVBQ08sWUFBWSxJQUFaLDREQURQOzs7QUF6QjJFLFFBOEIzRSxHQUFPLDBCQUEwQixFQUFDLElBQUksS0FBSixFQUEzQixDQUFQLENBOUIyRTs7QUFnQzNFLFdBQU8sS0FBSyxFQUFMLEtBQVksS0FBWixDQUFQLENBQTBCLElBQTFCLENBQStCLElBQS9CLEVBQ08sWUFBWSxJQUFaLHdEQURQOzs7QUFoQzJFLFFBcUMzRSxHQUFPLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxPQUFPLEtBQVAsRUFBUixFQUEzQixDQUFQLENBckMyRTs7QUF1QzNFLFdBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixLQUFyQixDQUFQLENBQW1DLElBQW5DLENBQXdDLElBQXhDLEVBQ08sWUFBWSxJQUFaLDJEQURQOzs7QUF2QzJFLFFBNEMzRSxHQUFPLDBCQUEwQixFQUFDLFlBQVksS0FBWixFQUEzQixDQUFQLENBNUMyRTs7QUE4QzNFLFdBQU8sS0FBSyxZQUFMLENBQWtCLFVBQWxCLE1BQWtDLEtBQWxDLENBQVAsQ0FBZ0QsSUFBaEQsQ0FBcUQsSUFBckQsRUFDTyxZQUFZLElBQVosdURBRFA7OztBQTlDMkUsUUFtRDNFLEdBQU8sMEJBQTBCLEVBQUMsY0FBYyxLQUFkLEVBQTNCLENBQVAsQ0FuRDJFOztBQXFEM0UsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsTUFBb0MsS0FBcEMsQ0FBUCxDQUFrRCxJQUFsRCxDQUF1RCxJQUF2RCxFQUNPLFlBQVksSUFBWix1REFEUCxFQXJEMkU7Q0FBaEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbi8qKlxuICogQSB0ZXN0aW5nIG1vZHVsZSB0byB2ZXJpZnkgdGhhdCBhcmJpdHJhcnkgUmVhY3Qtc3VwcG9ydGVkIGF0dHJpYnV0ZXMgYXJlIHBhc3NlZFxuICogdGhyb3VnaCB0aGUgZGVzdGluYXRpb24gZWxlbWVudCBub2RlLiBUaGUgY29uZm9ybWFuY2UgY2hlY2tlciB1c2VzIHRoZSBmb2xsb3dpbmdcbiAqIHZhbGlkIEpTWCBhdHRyaWJ1dGVzIGFzIGV4YW1wbGVzOlxuICpcbiAqIC0gY2xhc3NOYW1lXG4gKiAtIGlkXG4gKiAtIHN0eWxlXG4gKiAtIGRhdGEtZm9vXG4gKiAtIGFyaWEtbGFiZWxcbiAqXG4gKiBFYWNoIG11c3QgYmUgYWJsZSB0byBiZSBtaXhlZCBhbmQgbWF0Y2hlZCB3aXRob3V0IG92ZXJ3cml0aW5nIGVhY2ggb3RoZXIsXG4gKiB3aXRoIHRoZSBleGNlcHRpb24gb2YgYGlkYCwgd2hlcmUgYHByb3BzLmlkYFxuICpcbiAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIHJlbmRlciAgICAgICBhIHByZS1idWlsZCByZW5kZXIgZnVuY3Rpb24gdG8gdGFrZSBpbiB2ZG9tIGFuZCByZW5kZXIgdG8gYSBkZXNpZ25hdGVkIHBsYWNlXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gIENvbnN0cnVjdG9yICBhIHZhbGlkIFJlYWN0Q2xhc3NcbiAqIEBwYXJhbSAge29iamVjdH0gICAgYmFzZVByb3BzICAgIGFueSBmdW5kYW1lbnRhbCBwcm9wcyB0aGF0IGFyZSBuZWVkZWQgZm9yIHRoZSBjb21wb25lbnQgdG8gYmUgcmVuZGVyZWQgc3VjY2Vzc2Z1bGx5XG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgW3JlZl0gICAgICAgICBhIHNwZWNpZmljIHJlZiBpZGVudGlmaWVyIHRvIGNoZWNrIGZvciBjb21wbGlhbmNlIGluc3RlYWQgb2YgdGhlIGJhc2UgZWxlbWVudDsgdGhpcyBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCBmb3IgUmVhY3QgY29tcG9uZW50cyB0aGF0IHJlbmRlciB0byA8Ym9keT4gb3IgYSBub2RlIG90aGVyIHRoYW4gaXRzIGxvZ2ljYWwgcGFyZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeUNvbmZvcm1hbmNlKHJlbmRlciwgQ29uc3RydWN0b3IsIGJhc2VQcm9wcywgcmVmKSB7XG4gICAgbGV0IG5vZGU7XG5cbiAgICBjb25zdCByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlID0gcHJvcHMgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBDb25zdHJ1Y3Rvciwge1xuICAgICAgICAgICAgICAgICAgICAuLi5iYXNlUHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVsZW1lbnQucmVmc1tyZWZdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICA/IGVsZW1lbnQucmVmc1tyZWZdXG4gICAgICAgICAgICAgICAgICAgOiBSZWFjdERPTS5maW5kRE9NTm9kZShlbGVtZW50LnJlZnNbcmVmXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5jbGFzc05hbWUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7Y2xhc3NOYW1lOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb28nKSkudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBjbGFzc2VzIHZpYSBwcm9wcy5jbGFzc05hbWVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5pZCAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtpZDogJ2Zvbyd9KTtcblxuICAgIGV4cGVjdChub2RlLmlkID09PSAnZm9vJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBhbiBIVE1MIGlkIHZpYSBwcm9wcy5pZGBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLnN0eWxlICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe3N0eWxlOiB7Y29sb3I6ICdyZWQnfX0pO1xuXG4gICAgZXhwZWN0KG5vZGUuc3R5bGUuY29sb3IgPT09ICdyZWQnKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGlubGluZSBzdHlsZXMgdmlhIHByb3BzLnN0eWxlYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2RhdGEtZm9vJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2RhdGEtZm9vJzogJ2Jhcid9KTtcblxuICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1mb28nKSA9PT0gJ2JhcicpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgZGF0YSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzWydhcmlhLWxhYmVsJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2FyaWEtbGFiZWwnOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGFyaWEgYXR0cmlidXRlcyB2aWEgcHJvcHNgXG4gICAgKTtcbn07XG4iXX0=