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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2ZXJpZnlDb25mb3JtYW5jZSIsInJlbmRlciIsIkNvbnN0cnVjdG9yIiwiYmFzZVByb3BzIiwia2V5Iiwibm9kZSIsInJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUiLCJwcm9wcyIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJjbGFzc05hbWUiLCJleHBlY3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInRvQmUiLCJuYW1lIiwiaWQiLCJzdHlsZSIsImNvbG9yIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBdUJ3QkEsaUI7O0FBdkJ4Qjs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JlLFNBQVNBLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ0MsV0FBbkMsRUFBZ0RDLFNBQWhELEVBQTJEQyxHQUEzRCxFQUFnRTtBQUMzRSxRQUFJQyxhQUFKOztBQUVBLFFBQU1DLDRCQUE0QixTQUE1QkEseUJBQTRCLENBQUNDLEtBQUQsRUFBVztBQUN6QyxZQUFNQyxVQUFVUCxPQUNaLGdCQUFNUSxhQUFOLENBQ0lQLFdBREosZUFFV0MsU0FGWCxFQUdXSSxLQUhYLEVBRFksQ0FBaEI7O0FBU0EsWUFBSUgsR0FBSixFQUFTO0FBQ0wsbUJBQVNJLFFBQVFKLEdBQVIsYUFBd0JNLFdBQXhCLEdBQ0FGLFFBQVFKLEdBQVIsQ0FEQSxHQUVBLDJCQUFZSSxRQUFRSixHQUFSLENBQVosQ0FGVDtBQUdIOztBQUVELGVBQU8sMkJBQVlJLE9BQVosQ0FBUDtBQUNILEtBakJEOztBQW1CQTtBQUNBSCxXQUFPQywwQkFBMEIsRUFBQ0ssV0FBVyxLQUFaLEVBQTFCLENBQVA7O0FBRUFDLFdBQU9QLEtBQUtRLFNBQUwsQ0FBZUMsUUFBZixDQUF3QixLQUF4QixDQUFQLEVBQXVDQyxJQUF2QyxDQUE0QyxJQUE1QyxFQUNPYixZQUFZYyxJQURuQjs7QUFJQTtBQUNBWCxXQUFPQywwQkFBMEIsRUFBQ1csSUFBSSxLQUFMLEVBQTFCLENBQVA7O0FBRUFMLFdBQU9QLEtBQUtZLEVBQUwsS0FBWSxLQUFuQixFQUEwQkYsSUFBMUIsQ0FBK0IsSUFBL0IsRUFDT2IsWUFBWWMsSUFEbkI7O0FBSUE7QUFDQVgsV0FBT0MsMEJBQTBCLEVBQUNZLE9BQU8sRUFBQ0MsT0FBTyxLQUFSLEVBQVIsRUFBMUIsQ0FBUDs7QUFFQVAsV0FBT1AsS0FBS2EsS0FBTCxDQUFXQyxLQUFYLEtBQXFCLEtBQTVCLEVBQW1DSixJQUFuQyxDQUF3QyxJQUF4QyxFQUNPYixZQUFZYyxJQURuQjs7QUFJQTtBQUNBWCxXQUFPQywwQkFBMEIsRUFBQyxZQUFZLEtBQWIsRUFBMUIsQ0FBUDs7QUFFQU0sV0FBT1AsS0FBS2UsWUFBTCxDQUFrQixVQUFsQixNQUFrQyxLQUF6QyxFQUFnREwsSUFBaEQsQ0FBcUQsSUFBckQsRUFDT2IsWUFBWWMsSUFEbkI7O0FBSUE7QUFDQVgsV0FBT0MsMEJBQTBCLEVBQUMsY0FBYyxLQUFmLEVBQTFCLENBQVA7O0FBRUFNLFdBQU9QLEtBQUtlLFlBQUwsQ0FBa0IsWUFBbEIsTUFBb0MsS0FBM0MsRUFBa0RMLElBQWxELENBQXVELElBQXZELEVBQ09iLFlBQVljLElBRG5CO0FBR0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuLyoqXG4gKiBBIHRlc3RpbmcgbW9kdWxlIHRvIHZlcmlmeSB0aGF0IGFyYml0cmFyeSBSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlcyBhcmUgcGFzc2VkXG4gKiB0aHJvdWdoIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50IG5vZGUuIFRoZSBjb25mb3JtYW5jZSBjaGVja2VyIHVzZXMgdGhlIGZvbGxvd2luZ1xuICogdmFsaWQgSlNYIGF0dHJpYnV0ZXMgYXMgZXhhbXBsZXM6XG4gKlxuICogLSBjbGFzc05hbWVcbiAqIC0gaWRcbiAqIC0gc3R5bGVcbiAqIC0gZGF0YS1mb29cbiAqIC0gYXJpYS1sYWJlbFxuICpcbiAqIEVhY2ggbXVzdCBiZSBhYmxlIHRvIGJlIG1peGVkIGFuZCBtYXRjaGVkIHdpdGhvdXQgb3ZlcndyaXRpbmcgZWFjaCBvdGhlcixcbiAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgaWRgLCB3aGVyZSBgcHJvcHMuaWRgXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gIHJlbmRlciAgICAgICAgYSBwcmUtYnVpbGQgcmVuZGVyIGZ1bmN0aW9uIHRvIHRha2UgaW4gdmRvbSBhbmQgcmVuZGVyIHRvIGEgZGVzaWduYXRlZCBwbGFjZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gIENvbnN0cnVjdG9yICAgYSB2YWxpZCBSZWFjdENsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgYmFzZVByb3BzICAgICBhbnkgZnVuZGFtZW50YWwgcHJvcHMgdGhhdCBhcmUgbmVlZGVkIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkIHN1Y2Nlc3NmdWxseVxuICogQHBhcmFtIHtzdHJpbmd9ICAgW2tleV0gYW4gaW5zdGFuY2Uga2V5IHRvIGNoZWNrIGZvciBjb21wbGlhbmNlIGluc3RlYWQgb2YgdGhlIGJhc2UgZWxlbWVudDsgdGhpcyBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCBmb3IgUmVhY3QgY29tcG9uZW50cyB0aGF0IHJlbmRlciB0byA8Ym9keT4gb3IgYSBub2RlIG90aGVyIHRoYW4gaXRzIGxvZ2ljYWwgcGFyZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeUNvbmZvcm1hbmNlKHJlbmRlciwgQ29uc3RydWN0b3IsIGJhc2VQcm9wcywga2V5KSB7XG4gICAgbGV0IG5vZGU7XG5cbiAgICBjb25zdCByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlID0gKHByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZW5kZXIoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIENvbnN0cnVjdG9yLCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2VQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJvcHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuICAgZWxlbWVudFtrZXldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICA/IGVsZW1lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgIDogZmluZERPTU5vZGUoZWxlbWVudFtrZXldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaW5kRE9NTm9kZShlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmNsYXNzTmFtZSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtjbGFzc05hbWU6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZvbycpKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGNsYXNzZXMgdmlhIHByb3BzLmNsYXNzTmFtZWBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLmlkICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe2lkOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuaWQgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIG9mIGFuIEhUTUwgaWQgdmlhIHByb3BzLmlkYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHMuc3R5bGUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7c3R5bGU6IHtjb2xvcjogJ3JlZCd9fSk7XG5cbiAgICBleHBlY3Qobm9kZS5zdHlsZS5jb2xvciA9PT0gJ3JlZCcpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgaW5saW5lIHN0eWxlcyB2aWEgcHJvcHMuc3R5bGVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wc1snZGF0YS1mb28nXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnZGF0YS1mb28nOiAnYmFyJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpID09PSAnYmFyJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBkYXRhIGF0dHJpYnV0ZXMgdmlhIHByb3BzYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2FyaWEtbGFiZWwnXSAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHsnYXJpYS1sYWJlbCc6ICdmb28nfSk7XG5cbiAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gJ2ZvbycpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgYXJpYSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xufTtcbiJdfQ==