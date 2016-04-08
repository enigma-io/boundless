'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = verifyConformance;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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
    var node = void 0;

    var renderWithPropsAndGetNode = function renderWithPropsAndGetNode(props) {
        var element = render(_react2.default.createElement(Constructor, _extends({}, baseProps, props)));

        if (ref) {
            return element.refs[ref] instanceof HTMLElement ? element.refs[ref] : (0, _reactDom.findDOMNode)(element.refs[ref]);
        }

        return (0, _reactDom.findDOMNode)(element);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsU0FBUyxpQkFBVCxDQUEyQixNQUEzQixFQUFtQyxXQUFuQyxFQUFnRCxTQUFoRCxFQUEyRCxHQUEzRCxFQUFnRTtBQUMzRSxRQUFJLGFBQUosQ0FEMkU7O0FBRzNFLFFBQU0sNEJBQTRCLFNBQTVCLHlCQUE0QixRQUFTO0FBQ3ZDLFlBQU0sVUFBVSxPQUNaLGdCQUFNLGFBQU4sQ0FDSSxXQURKLGVBRVcsV0FDQSxNQUhYLENBRFksQ0FBVixDQURpQzs7QUFVdkMsWUFBSSxHQUFKLEVBQVM7QUFDTCxtQkFBUyxRQUFRLElBQVIsQ0FBYSxHQUFiLGFBQTZCLFdBQTdCLEdBQ0EsUUFBUSxJQUFSLENBQWEsR0FBYixDQURBLEdBRUEsMkJBQVksUUFBUSxJQUFSLENBQWEsR0FBYixDQUFaLENBRkEsQ0FESjtTQUFUOztBQU1BLGVBQU8sMkJBQVksT0FBWixDQUFQLENBaEJ1QztLQUFUOzs7QUFIeUMsUUF1QjNFLEdBQU8sMEJBQTBCLEVBQUMsV0FBVyxLQUFYLEVBQTNCLENBQVAsQ0F2QjJFOztBQXlCM0UsV0FBTyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQXhCLENBQVAsRUFBdUMsSUFBdkMsQ0FBNEMsSUFBNUMsRUFDTyxZQUFZLElBQVosNERBRFA7OztBQXpCMkUsUUE4QjNFLEdBQU8sMEJBQTBCLEVBQUMsSUFBSSxLQUFKLEVBQTNCLENBQVAsQ0E5QjJFOztBQWdDM0UsV0FBTyxLQUFLLEVBQUwsS0FBWSxLQUFaLENBQVAsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFDTyxZQUFZLElBQVosd0RBRFA7OztBQWhDMkUsUUFxQzNFLEdBQU8sMEJBQTBCLEVBQUMsT0FBTyxFQUFDLE9BQU8sS0FBUCxFQUFSLEVBQTNCLENBQVAsQ0FyQzJFOztBQXVDM0UsV0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLEtBQXJCLENBQVAsQ0FBbUMsSUFBbkMsQ0FBd0MsSUFBeEMsRUFDTyxZQUFZLElBQVosMkRBRFA7OztBQXZDMkUsUUE0QzNFLEdBQU8sMEJBQTBCLEVBQUMsWUFBWSxLQUFaLEVBQTNCLENBQVAsQ0E1QzJFOztBQThDM0UsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsTUFBa0MsS0FBbEMsQ0FBUCxDQUFnRCxJQUFoRCxDQUFxRCxJQUFyRCxFQUNPLFlBQVksSUFBWix1REFEUDs7O0FBOUMyRSxRQW1EM0UsR0FBTywwQkFBMEIsRUFBQyxjQUFjLEtBQWQsRUFBM0IsQ0FBUCxDQW5EMkU7O0FBcUQzRSxXQUFPLEtBQUssWUFBTCxDQUFrQixZQUFsQixNQUFvQyxLQUFwQyxDQUFQLENBQWtELElBQWxELENBQXVELElBQXZELEVBQ08sWUFBWSxJQUFaLHVEQURQLEVBckQyRTtDQUFoRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuXG4vKipcbiAqIEEgdGVzdGluZyBtb2R1bGUgdG8gdmVyaWZ5IHRoYXQgYXJiaXRyYXJ5IFJlYWN0LXN1cHBvcnRlZCBhdHRyaWJ1dGVzIGFyZSBwYXNzZWRcbiAqIHRocm91Z2ggdGhlIGRlc3RpbmF0aW9uIGVsZW1lbnQgbm9kZS4gVGhlIGNvbmZvcm1hbmNlIGNoZWNrZXIgdXNlcyB0aGUgZm9sbG93aW5nXG4gKiB2YWxpZCBKU1ggYXR0cmlidXRlcyBhcyBleGFtcGxlczpcbiAqXG4gKiAtIGNsYXNzTmFtZVxuICogLSBpZFxuICogLSBzdHlsZVxuICogLSBkYXRhLWZvb1xuICogLSBhcmlhLWxhYmVsXG4gKlxuICogRWFjaCBtdXN0IGJlIGFibGUgdG8gYmUgbWl4ZWQgYW5kIG1hdGNoZWQgd2l0aG91dCBvdmVyd3JpdGluZyBlYWNoIG90aGVyLFxuICogd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGBpZGAsIHdoZXJlIGBwcm9wcy5pZGBcbiAqXG4gICogQHBhcmFtICB7ZnVuY3Rpb259ICByZW5kZXIgICAgICAgYSBwcmUtYnVpbGQgcmVuZGVyIGZ1bmN0aW9uIHRvIHRha2UgaW4gdmRvbSBhbmQgcmVuZGVyIHRvIGEgZGVzaWduYXRlZCBwbGFjZVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICBDb25zdHJ1Y3RvciAgYSB2YWxpZCBSZWFjdENsYXNzXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgIGJhc2VQcm9wcyAgICBhbnkgZnVuZGFtZW50YWwgcHJvcHMgdGhhdCBhcmUgbmVlZGVkIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkIHN1Y2Nlc3NmdWxseVxuICogQHBhcmFtICB7c3RyaW5nfSAgIFtyZWZdICAgICAgICAgYSBzcGVjaWZpYyByZWYgaWRlbnRpZmllciB0byBjaGVjayBmb3IgY29tcGxpYW5jZSBpbnN0ZWFkIG9mIHRoZSBiYXNlIGVsZW1lbnQ7IHRoaXMgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgZm9yIFJlYWN0IGNvbXBvbmVudHMgdGhhdCByZW5kZXIgdG8gPGJvZHk+IG9yIGEgbm9kZSBvdGhlciB0aGFuIGl0cyBsb2dpY2FsIHBhcmVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlDb25mb3JtYW5jZShyZW5kZXIsIENvbnN0cnVjdG9yLCBiYXNlUHJvcHMsIHJlZikge1xuICAgIGxldCBub2RlO1xuXG4gICAgY29uc3QgcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSA9IHByb3BzID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlbmRlcihcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgQ29uc3RydWN0b3IsIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzZVByb3BzLFxuICAgICAgICAgICAgICAgICAgICAuLi5wcm9wc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgICByZXR1cm4gICBlbGVtZW50LnJlZnNbcmVmXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgPyBlbGVtZW50LnJlZnNbcmVmXVxuICAgICAgICAgICAgICAgICAgIDogZmluZERPTU5vZGUoZWxlbWVudC5yZWZzW3JlZl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbmRET01Ob2RlKGVsZW1lbnQpO1xuICAgIH07XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHMuY2xhc3NOYW1lICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe2NsYXNzTmFtZTogJ2Zvbyd9KTtcblxuICAgIGV4cGVjdChub2RlLmNsYXNzTGlzdC5jb250YWlucygnZm9vJykpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgb2YgY2xhc3NlcyB2aWEgcHJvcHMuY2xhc3NOYW1lYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHMuaWQgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7aWQ6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5pZCA9PT0gJ2ZvbycpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgb2YgYW4gSFRNTCBpZCB2aWEgcHJvcHMuaWRgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5zdHlsZSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtzdHlsZToge2NvbG9yOiAncmVkJ319KTtcblxuICAgIGV4cGVjdChub2RlLnN0eWxlLmNvbG9yID09PSAncmVkJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBpbmxpbmUgc3R5bGVzIHZpYSBwcm9wcy5zdHlsZWBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzWydkYXRhLWZvbyddICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoeydkYXRhLWZvbyc6ICdiYXInfSk7XG5cbiAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vJykgPT09ICdiYXInKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGRhdGEgYXR0cmlidXRlcyB2aWEgcHJvcHNgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wc1snYXJpYS1sYWJlbCddICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoeydhcmlhLWxhYmVsJzogJ2Zvbyd9KTtcblxuICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID09PSAnZm9vJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBhcmlhIGF0dHJpYnV0ZXMgdmlhIHByb3BzYFxuICAgICk7XG59O1xuIl19