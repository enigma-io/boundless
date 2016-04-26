'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITextualInput = function (_UIView) {
    _inherits(UITextualInput, _UIView);

    function UITextualInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            input: _this.props.defaultValue || _this.props.inputProps.defaultValue || '', // ignored if in controlled-mode
            is_focused: false
        }, _this.handleBlur = function (event) {
            _this.setState({ is_focused: false });

            if (typeof _this.props.inputProps.onBlur === 'function') {
                event.persist();
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ is_focused: true });

            if (typeof _this.props.inputProps.onFocus === 'function') {
                event.persist();
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleInput = function (event) {
            if (typeof _this.props.value !== 'string') {
                _this.setState({ input: event.target.value });
            }

            if (typeof _this.props.inputProps.onInput === 'function') {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.value = function value(next_value) {
        this.refs.field.value = next_value;

        this.setState({ input: next_value });
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        /* If a controlled input (`props.value` being set), show the placeholder based on that state */
        var is_non_empty = typeof this.props.value === 'string' ? Boolean(this.props.value) : Boolean(this.state.input);
        var should_show_placeholder = this.props.hidePlaceholderOnFocus ? this.state.is_focused === false && is_non_empty === false : is_non_empty === false;

        return _react2.default.createElement(
            'div',
            { ref: 'placeholder', className: 'ui-textual-input ui-textual-input-placeholder' },
            should_show_placeholder ? this.props.inputProps.placeholder || this.props.placeholder : ''
        );
    };

    UITextualInput.prototype.render = function render() {
        var _cx, _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[this.props.className] = Boolean(this.props.className), _cx)),
                name: null,
                placeholder: null,
                type: null }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, this.props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[this.props.inputProps.className] = Boolean(this.props.inputProps.className), _cx2)),
                defaultValue: this.props.inputProps.defaultValue || this.props.defaultValue,
                name: this.props.inputProps.name || this.props.name,
                placeholder: null,
                type: this.props.inputProps.type || this.props.type,
                value: this.props.inputProps.value || this.props.value,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onInput: this.handleInput }))
        );
    };

    return UITextualInput;
}(_UIView3.default);

UITextualInput.propTypes = {
    defaultValue: _react.PropTypes.string,
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.object,
    name: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    type: _react.PropTypes.string,
    value: _react.PropTypes.string
};
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: false,
    inputProps: {},
    name: null,
    placeholder: '',
    type: 'text'
};
exports.default = UITextualInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7MElBbUJqQixRQUFRO0FBQ0osbUJBQU8sTUFBSyxLQUFMLENBQVcsWUFBWCxJQUEyQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFlBQXRCLElBQXNDLEVBQWpFO0FBQ1Asd0JBQVksS0FBWjtpQkFTSixhQUFhLGlCQUFTO0FBQ2xCLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksS0FBWixFQUFmLEVBRGtCOztBQUdsQixnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsS0FBaUMsVUFBeEMsRUFBb0Q7QUFDcEQsc0JBQU0sT0FBTixHQURvRDtBQUVwRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixDQUE2QixLQUE3QixFQUZvRDthQUF4RDtTQUhTLFFBU2IsY0FBYyxpQkFBUztBQUNuQixrQkFBSyxRQUFMLENBQWMsRUFBQyxZQUFZLElBQVosRUFBZixFQURtQjs7QUFHbkIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEtBQWtDLFVBQXpDLEVBQXFEO0FBQ3JELHNCQUFNLE9BQU4sR0FEcUQ7QUFFckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUIsRUFGcUQ7YUFBekQ7U0FIVSxRQVNkLGNBQWMsaUJBQVM7QUFDbkIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFFBQTVCLEVBQXNDO0FBQ3RDLHNCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxNQUFOLENBQWEsS0FBYixFQUF0QixFQURzQzthQUExQzs7QUFJQSxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsS0FBa0MsVUFBekMsRUFBcUQ7QUFDckQsc0JBQU0sT0FBTixHQURxRDtBQUVyRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUF0QixDQUE4QixLQUE5QixFQUZxRDthQUF6RDtTQUxVOzs7QUFoREcsNkJBd0JqQix1QkFBTSxZQUFZO0FBQ2QsYUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixLQUFoQixHQUF3QixVQUF4QixDQURjOztBQUdkLGFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxVQUFQLEVBQWYsRUFIYzs7O0FBeEJELDZCQTJEakIsaURBQW9COztBQUVoQixZQUFNLGVBQWUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFFBQTVCLEdBQXVDLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUEvQyxHQUFtRSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBM0UsQ0FGTDtBQUdoQixZQUFNLDBCQUE0QixLQUFLLEtBQUwsQ0FBVyxzQkFBWCxHQUNBLEtBQUssS0FBTCxDQUFXLFVBQVgsS0FBMEIsS0FBMUIsSUFBbUMsaUJBQWlCLEtBQWpCLEdBQ25DLGlCQUFpQixLQUFqQixDQUxsQjs7QUFPaEIsZUFDSTs7Y0FBSyxLQUFJLGFBQUosRUFBa0IsV0FBVSwrQ0FBVixFQUF2QjtZQUNLLDBCQUEwQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLElBQXFDLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsRUFBeEY7U0FGVCxDQVBnQjs7O0FBM0RILDZCQXlFakIsMkJBQVM7OztBQUNMLGVBQ0k7O3lCQUFTLEtBQUssS0FBTDtBQUNKLHFCQUFJLFNBQUo7QUFDQSwyQkFBVztBQUNQLGdEQUE0QixJQUE1Qjt1QkFDQyxLQUFLLEtBQUwsQ0FBVyxTQUFYLElBQXVCLFFBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxPQUZ6QixDQUFYO0FBSUEsc0JBQU0sSUFBTjtBQUNBLDZCQUFhLElBQWI7QUFDQSxzQkFBTSxJQUFOLEdBUkw7WUFTSyxLQUFLLGlCQUFMLEVBVEw7WUFVSSxvREFBVyxLQUFLLEtBQUwsQ0FBVyxVQUFYO0FBQ0oscUJBQUksT0FBSjtBQUNBLDJCQUFXO0FBQ1Asd0NBQW9CLElBQXBCO3dCQUNDLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsSUFBa0MsUUFBUSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFNBQXRCLFFBRnBDLENBQVg7QUFJQSw4QkFBYyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFlBQXRCLElBQXNDLEtBQUssS0FBTCxDQUFXLFlBQVg7QUFDcEQsc0JBQU0sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QixJQUE4QixLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ3BDLDZCQUFhLElBQWI7QUFDQSxzQkFBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLElBQThCLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDcEMsdUJBQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF0QixJQUErQixLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ3RDLHdCQUFRLEtBQUssVUFBTDtBQUNSLHlCQUFTLEtBQUssV0FBTDtBQUNULHlCQUFTLEtBQUssV0FBTCxHQWJoQixDQVZKO1NBREosQ0FESzs7O1dBekVROzs7ZUFDVixZQUFZO0FBQ2Ysa0JBQWMsaUJBQVUsTUFBVjtBQUNkLDRCQUF3QixpQkFBVSxJQUFWO0FBQ3hCLGdCQUFZLGlCQUFVLE1BQVY7QUFDWixVQUFNLGlCQUFVLE1BQVY7QUFDTixpQkFBYSxpQkFBVSxNQUFWO0FBQ2IsVUFBTSxpQkFBVSxNQUFWO0FBQ04sV0FBTyxpQkFBVSxNQUFWOztBQVJNLGVBV1YsZUFBZTtBQUNsQiw0QkFBd0IsS0FBeEI7QUFDQSxnQkFBWSxFQUFaO0FBQ0EsVUFBTSxJQUFOO0FBQ0EsaUJBQWEsRUFBYjtBQUNBLFVBQU0sTUFBTjs7a0JBaEJhIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBmYWxzZSxcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSB8fCAnJywgLy8gaWdub3JlZCBpZiBpbiBjb250cm9sbGVkLW1vZGVcbiAgICAgICAgaXNfZm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgdmFsdWUobmV4dF92YWx1ZSkge1xuICAgICAgICB0aGlzLnJlZnMuZmllbGQudmFsdWUgPSBuZXh0X3ZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0X3ZhbHVlfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dCA9IGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIC8qIElmIGEgY29udHJvbGxlZCBpbnB1dCAoYHByb3BzLnZhbHVlYCBiZWluZyBzZXQpLCBzaG93IHRoZSBwbGFjZWhvbGRlciBiYXNlZCBvbiB0aGF0IHN0YXRlICovXG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSAnc3RyaW5nJyA/IEJvb2xlYW4odGhpcy5wcm9wcy52YWx1ZSkgOiBCb29sZWFuKHRoaXMuc3RhdGUuaW5wdXQpO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0IHVpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInPlxuICAgICAgICAgICAgICAgIHtzaG91bGRfc2hvd19wbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG5hbWU9e251bGx9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICB0eXBlPXtudWxsfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbih0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUgfHwgdGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy50eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19