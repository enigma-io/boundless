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
 * @param {function}  render        a pre-build render function to take in vdom and render to a designated place
 * @param {function}  Constructor   a valid ReactClass
 * @param {object}    baseProps     any fundamental props that are needed for the component to be rendered successfully
 * @param {string}   [key] an instance key to check for compliance instead of the base element; this is
 *                                  used for React components that render to <body> or a node other than its logical parent
 */
function verifyConformance(render, Constructor, baseProps, key) {
    var node = void 0;

    var renderWithPropsAndGetNode = function renderWithPropsAndGetNode(props) {
        var element = render(_react2.default.createElement(Constructor, _extends({}, baseProps, props)));

        if (key) {
            return element[key] instanceof HTMLElement ? element[key] : (0, _reactDom.findDOMNode)(element[key]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBdUJ3QixpQjs7QUF2QnhCOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQmUsU0FBUyxpQkFBVCxDQUEyQixNQUEzQixFQUFtQyxXQUFuQyxFQUFnRCxTQUFoRCxFQUEyRCxHQUEzRCxFQUFnRTtBQUMzRSxRQUFJLGFBQUo7O0FBRUEsUUFBTSw0QkFBNEIsU0FBNUIseUJBQTRCLENBQUMsS0FBRCxFQUFXO0FBQ3pDLFlBQU0sVUFBVSxPQUNaLGdCQUFNLGFBQU4sQ0FDSSxXQURKLGVBRVcsU0FGWCxFQUdXLEtBSFgsRUFEWSxDQUFoQjs7QUFTQSxZQUFJLEdBQUosRUFBUztBQUNMLG1CQUFTLFFBQVEsR0FBUixhQUF3QixXQUF4QixHQUNBLFFBQVEsR0FBUixDQURBLEdBRUEsMkJBQVksUUFBUSxHQUFSLENBQVosQ0FGVDtBQUdIOztBQUVELGVBQU8sMkJBQVksT0FBWixDQUFQO0FBQ0gsS0FqQkQ7O0FBbUJBO0FBQ0EsV0FBTywwQkFBMEIsRUFBQyxXQUFXLEtBQVosRUFBMUIsQ0FBUDs7QUFFQSxXQUFPLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBeEIsQ0FBUCxFQUF1QyxJQUF2QyxDQUE0QyxJQUE1QyxFQUNPLFlBQVksSUFEbkI7O0FBSUE7QUFDQSxXQUFPLDBCQUEwQixFQUFDLElBQUksS0FBTCxFQUExQixDQUFQOztBQUVBLFdBQU8sS0FBSyxFQUFMLEtBQVksS0FBbkIsRUFBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFDTyxZQUFZLElBRG5COztBQUlBO0FBQ0EsV0FBTywwQkFBMEIsRUFBQyxPQUFPLEVBQUMsT0FBTyxLQUFSLEVBQVIsRUFBMUIsQ0FBUDs7QUFFQSxXQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsS0FBNUIsRUFBbUMsSUFBbkMsQ0FBd0MsSUFBeEMsRUFDTyxZQUFZLElBRG5COztBQUlBO0FBQ0EsV0FBTywwQkFBMEIsRUFBQyxZQUFZLEtBQWIsRUFBMUIsQ0FBUDs7QUFFQSxXQUFPLEtBQUssWUFBTCxDQUFrQixVQUFsQixNQUFrQyxLQUF6QyxFQUFnRCxJQUFoRCxDQUFxRCxJQUFyRCxFQUNPLFlBQVksSUFEbkI7O0FBSUE7QUFDQSxXQUFPLDBCQUEwQixFQUFDLGNBQWMsS0FBZixFQUExQixDQUFQOztBQUVBLFdBQU8sS0FBSyxZQUFMLENBQWtCLFlBQWxCLE1BQW9DLEtBQTNDLEVBQWtELElBQWxELENBQXVELElBQXZELEVBQ08sWUFBWSxJQURuQjtBQUdIIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbi8qKlxuICogQSB0ZXN0aW5nIG1vZHVsZSB0byB2ZXJpZnkgdGhhdCBhcmJpdHJhcnkgUmVhY3Qtc3VwcG9ydGVkIGF0dHJpYnV0ZXMgYXJlIHBhc3NlZFxuICogdGhyb3VnaCB0aGUgZGVzdGluYXRpb24gZWxlbWVudCBub2RlLiBUaGUgY29uZm9ybWFuY2UgY2hlY2tlciB1c2VzIHRoZSBmb2xsb3dpbmdcbiAqIHZhbGlkIEpTWCBhdHRyaWJ1dGVzIGFzIGV4YW1wbGVzOlxuICpcbiAqIC0gY2xhc3NOYW1lXG4gKiAtIGlkXG4gKiAtIHN0eWxlXG4gKiAtIGRhdGEtZm9vXG4gKiAtIGFyaWEtbGFiZWxcbiAqXG4gKiBFYWNoIG11c3QgYmUgYWJsZSB0byBiZSBtaXhlZCBhbmQgbWF0Y2hlZCB3aXRob3V0IG92ZXJ3cml0aW5nIGVhY2ggb3RoZXIsXG4gKiB3aXRoIHRoZSBleGNlcHRpb24gb2YgYGlkYCwgd2hlcmUgYHByb3BzLmlkYFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICByZW5kZXIgICAgICAgIGEgcHJlLWJ1aWxkIHJlbmRlciBmdW5jdGlvbiB0byB0YWtlIGluIHZkb20gYW5kIHJlbmRlciB0byBhIGRlc2lnbmF0ZWQgcGxhY2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICBDb25zdHJ1Y3RvciAgIGEgdmFsaWQgUmVhY3RDbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgIGJhc2VQcm9wcyAgICAgYW55IGZ1bmRhbWVudGFsIHByb3BzIHRoYXQgYXJlIG5lZWRlZCBmb3IgdGhlIGNvbXBvbmVudCB0byBiZSByZW5kZXJlZCBzdWNjZXNzZnVsbHlcbiAqIEBwYXJhbSB7c3RyaW5nfSAgIFtrZXldIGFuIGluc3RhbmNlIGtleSB0byBjaGVjayBmb3IgY29tcGxpYW5jZSBpbnN0ZWFkIG9mIHRoZSBiYXNlIGVsZW1lbnQ7IHRoaXMgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgZm9yIFJlYWN0IGNvbXBvbmVudHMgdGhhdCByZW5kZXIgdG8gPGJvZHk+IG9yIGEgbm9kZSBvdGhlciB0aGFuIGl0cyBsb2dpY2FsIHBhcmVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlDb25mb3JtYW5jZShyZW5kZXIsIENvbnN0cnVjdG9yLCBiYXNlUHJvcHMsIGtleSkge1xuICAgIGxldCBub2RlO1xuXG4gICAgY29uc3QgcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSA9IChwcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBDb25zdHJ1Y3Rvciwge1xuICAgICAgICAgICAgICAgICAgICAuLi5iYXNlUHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVsZW1lbnRba2V5XSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgPyBlbGVtZW50W2tleV1cbiAgICAgICAgICAgICAgICAgICA6IGZpbmRET01Ob2RlKGVsZW1lbnRba2V5XSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmluZERPTU5vZGUoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5jbGFzc05hbWUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7Y2xhc3NOYW1lOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb28nKSkudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBjbGFzc2VzIHZpYSBwcm9wcy5jbGFzc05hbWVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5pZCAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtpZDogJ2Zvbyd9KTtcblxuICAgIGV4cGVjdChub2RlLmlkID09PSAnZm9vJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBhbiBIVE1MIGlkIHZpYSBwcm9wcy5pZGBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLnN0eWxlICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe3N0eWxlOiB7Y29sb3I6ICdyZWQnfX0pO1xuXG4gICAgZXhwZWN0KG5vZGUuc3R5bGUuY29sb3IgPT09ICdyZWQnKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGlubGluZSBzdHlsZXMgdmlhIHByb3BzLnN0eWxlYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2RhdGEtZm9vJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2RhdGEtZm9vJzogJ2Jhcid9KTtcblxuICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1mb28nKSA9PT0gJ2JhcicpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgZGF0YSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzWydhcmlhLWxhYmVsJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2FyaWEtbGFiZWwnOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGFyaWEgYXR0cmlidXRlcyB2aWEgcHJvcHNgXG4gICAgKTtcbn07XG4iXX0=