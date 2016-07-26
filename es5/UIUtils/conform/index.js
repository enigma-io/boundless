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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvY29uZm9ybS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBdUJ3QixpQjs7QUF2QnhCOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQmUsU0FBUyxpQkFBVCxDQUEyQixNQUEzQixFQUFtQyxXQUFuQyxFQUFnRCxTQUFoRCxFQUEyRCxHQUEzRCxFQUFnRTtBQUMzRSxRQUFJLGFBQUo7O0FBRUEsUUFBTSw0QkFBNEIsU0FBNUIseUJBQTRCLFFBQVM7QUFDdkMsWUFBTSxVQUFVLE9BQ1osZ0JBQU0sYUFBTixDQUNJLFdBREosZUFFVyxTQUZYLEVBR1csS0FIWCxFQURZLENBQWhCOztBQVNBLFlBQUksR0FBSixFQUFTO0FBQ0wsbUJBQVMsUUFBUSxHQUFSLGFBQXdCLFdBQXhCLEdBQ0EsUUFBUSxHQUFSLENBREEsR0FFQSwyQkFBWSxRQUFRLEdBQVIsQ0FBWixDQUZUO0FBR0g7O0FBRUQsZUFBTywyQkFBWSxPQUFaLENBQVA7QUFDSCxLQWpCRDs7QUFtQkE7QUFDQSxXQUFPLDBCQUEwQixFQUFDLFdBQVcsS0FBWixFQUExQixDQUFQOztBQUVBLFdBQU8sS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixLQUF4QixDQUFQLEVBQXVDLElBQXZDLENBQTRDLElBQTVDLEVBQ08sWUFBWSxJQURuQjs7QUFJQTtBQUNBLFdBQU8sMEJBQTBCLEVBQUMsSUFBSSxLQUFMLEVBQTFCLENBQVA7O0FBRUEsV0FBTyxLQUFLLEVBQUwsS0FBWSxLQUFuQixFQUEwQixJQUExQixDQUErQixJQUEvQixFQUNPLFlBQVksSUFEbkI7O0FBSUE7QUFDQSxXQUFPLDBCQUEwQixFQUFDLE9BQU8sRUFBQyxPQUFPLEtBQVIsRUFBUixFQUExQixDQUFQOztBQUVBLFdBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixLQUE1QixFQUFtQyxJQUFuQyxDQUF3QyxJQUF4QyxFQUNPLFlBQVksSUFEbkI7O0FBSUE7QUFDQSxXQUFPLDBCQUEwQixFQUFDLFlBQVksS0FBYixFQUExQixDQUFQOztBQUVBLFdBQU8sS0FBSyxZQUFMLENBQWtCLFVBQWxCLE1BQWtDLEtBQXpDLEVBQWdELElBQWhELENBQXFELElBQXJELEVBQ08sWUFBWSxJQURuQjs7QUFJQTtBQUNBLFdBQU8sMEJBQTBCLEVBQUMsY0FBYyxLQUFmLEVBQTFCLENBQVA7O0FBRUEsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsTUFBb0MsS0FBM0MsRUFBa0QsSUFBbEQsQ0FBdUQsSUFBdkQsRUFDTyxZQUFZLElBRG5CO0FBR0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcblxuLyoqXG4gKiBBIHRlc3RpbmcgbW9kdWxlIHRvIHZlcmlmeSB0aGF0IGFyYml0cmFyeSBSZWFjdC1zdXBwb3J0ZWQgYXR0cmlidXRlcyBhcmUgcGFzc2VkXG4gKiB0aHJvdWdoIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50IG5vZGUuIFRoZSBjb25mb3JtYW5jZSBjaGVja2VyIHVzZXMgdGhlIGZvbGxvd2luZ1xuICogdmFsaWQgSlNYIGF0dHJpYnV0ZXMgYXMgZXhhbXBsZXM6XG4gKlxuICogLSBjbGFzc05hbWVcbiAqIC0gaWRcbiAqIC0gc3R5bGVcbiAqIC0gZGF0YS1mb29cbiAqIC0gYXJpYS1sYWJlbFxuICpcbiAqIEVhY2ggbXVzdCBiZSBhYmxlIHRvIGJlIG1peGVkIGFuZCBtYXRjaGVkIHdpdGhvdXQgb3ZlcndyaXRpbmcgZWFjaCBvdGhlcixcbiAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgaWRgLCB3aGVyZSBgcHJvcHMuaWRgXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gIHJlbmRlciAgICAgICAgYSBwcmUtYnVpbGQgcmVuZGVyIGZ1bmN0aW9uIHRvIHRha2UgaW4gdmRvbSBhbmQgcmVuZGVyIHRvIGEgZGVzaWduYXRlZCBwbGFjZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gIENvbnN0cnVjdG9yICAgYSB2YWxpZCBSZWFjdENsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgYmFzZVByb3BzICAgICBhbnkgZnVuZGFtZW50YWwgcHJvcHMgdGhhdCBhcmUgbmVlZGVkIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkIHN1Y2Nlc3NmdWxseVxuICogQHBhcmFtIHtzdHJpbmd9ICAgW2tleV0gYW4gaW5zdGFuY2Uga2V5IHRvIGNoZWNrIGZvciBjb21wbGlhbmNlIGluc3RlYWQgb2YgdGhlIGJhc2UgZWxlbWVudDsgdGhpcyBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCBmb3IgUmVhY3QgY29tcG9uZW50cyB0aGF0IHJlbmRlciB0byA8Ym9keT4gb3IgYSBub2RlIG90aGVyIHRoYW4gaXRzIGxvZ2ljYWwgcGFyZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeUNvbmZvcm1hbmNlKHJlbmRlciwgQ29uc3RydWN0b3IsIGJhc2VQcm9wcywga2V5KSB7XG4gICAgbGV0IG5vZGU7XG5cbiAgICBjb25zdCByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlID0gcHJvcHMgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBDb25zdHJ1Y3Rvciwge1xuICAgICAgICAgICAgICAgICAgICAuLi5iYXNlUHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiAgIGVsZW1lbnRba2V5XSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgPyBlbGVtZW50W2tleV1cbiAgICAgICAgICAgICAgICAgICA6IGZpbmRET01Ob2RlKGVsZW1lbnRba2V5XSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmluZERPTU5vZGUoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5jbGFzc05hbWUgKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7Y2xhc3NOYW1lOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb28nKSkudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBjbGFzc2VzIHZpYSBwcm9wcy5jbGFzc05hbWVgXG4gICAgKTtcblxuICAgIC8qIHZlcmlmeSBwcm9wcy5pZCAqL1xuICAgIG5vZGUgPSByZW5kZXJXaXRoUHJvcHNBbmRHZXROb2RlKHtpZDogJ2Zvbyd9KTtcblxuICAgIGV4cGVjdChub2RlLmlkID09PSAnZm9vJykudG9CZSh0cnVlLFxuICAgICAgICBgJHtDb25zdHJ1Y3Rvci5uYW1lfSBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZyBvZiBhbiBIVE1MIGlkIHZpYSBwcm9wcy5pZGBcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzLnN0eWxlICovXG4gICAgbm9kZSA9IHJlbmRlcldpdGhQcm9wc0FuZEdldE5vZGUoe3N0eWxlOiB7Y29sb3I6ICdyZWQnfX0pO1xuXG4gICAgZXhwZWN0KG5vZGUuc3R5bGUuY29sb3IgPT09ICdyZWQnKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGlubGluZSBzdHlsZXMgdmlhIHByb3BzLnN0eWxlYFxuICAgICk7XG5cbiAgICAvKiB2ZXJpZnkgcHJvcHNbJ2RhdGEtZm9vJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2RhdGEtZm9vJzogJ2Jhcid9KTtcblxuICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1mb28nKSA9PT0gJ2JhcicpLnRvQmUodHJ1ZSxcbiAgICAgICAgYCR7Q29uc3RydWN0b3IubmFtZX0gZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmcgZGF0YSBhdHRyaWJ1dGVzIHZpYSBwcm9wc2BcbiAgICApO1xuXG4gICAgLyogdmVyaWZ5IHByb3BzWydhcmlhLWxhYmVsJ10gKi9cbiAgICBub2RlID0gcmVuZGVyV2l0aFByb3BzQW5kR2V0Tm9kZSh7J2FyaWEtbGFiZWwnOiAnZm9vJ30pO1xuXG4gICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT09ICdmb28nKS50b0JlKHRydWUsXG4gICAgICAgIGAke0NvbnN0cnVjdG9yLm5hbWV9IGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nIGFyaWEgYXR0cmlidXRlcyB2aWEgcHJvcHNgXG4gICAgKTtcbn07XG4iXX0=