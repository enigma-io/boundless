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
            input: '',
            is_focused: false
        }, _this.handle_blur = function (event) {
            _this.setState({ is_focused: false });

            if (typeof _this.props.inputProps.onBlur === 'function') {
                event.persist();
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handle_focus = function (event) {
            _this.setState({ is_focused: true });

            if (typeof _this.props.inputProps.onFocus === 'function') {
                event.persist();
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handle_input = function (event) {
            if (typeof _this.props.value !== 'string') {
                _this.setState({ input: event.target.value });
            }

            if (typeof _this.props.inputProps.onInput === 'function') {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.render_placeholder = function render_placeholder() {
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
            this.render_placeholder(),
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
                onBlur: this.handle_blur,
                onFocus: this.handle_focus,
                onInput: this.handle_input }))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7MElBbUJqQixRQUFRO0FBQ0osbUJBQU8sRUFBUDtBQUNBLHdCQUFZLEtBQVo7aUJBR0osY0FBYyxpQkFBUztBQUNuQixrQkFBSyxRQUFMLENBQWMsRUFBQyxZQUFZLEtBQVosRUFBZixFQURtQjs7QUFHbkIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLEtBQWlDLFVBQXhDLEVBQW9EO0FBQ3BELHNCQUFNLE9BQU4sR0FEb0Q7QUFFcEQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBNkIsS0FBN0IsRUFGb0Q7YUFBeEQ7U0FIVSxRQVNkLGVBQWUsaUJBQVM7QUFDcEIsa0JBQUssUUFBTCxDQUFjLEVBQUMsWUFBWSxJQUFaLEVBQWYsRUFEb0I7O0FBR3BCLGdCQUFJLE9BQU8sTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUF0QixLQUFrQyxVQUF6QyxFQUFxRDtBQUNyRCxzQkFBTSxPQUFOLEdBRHFEO0FBRXJELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLENBQThCLEtBQTlCLEVBRnFEO2FBQXpEO1NBSFcsUUFTZixlQUFlLGlCQUFTO0FBQ3BCLGdCQUFJLE9BQU8sTUFBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixRQUE1QixFQUFzQztBQUN0QyxzQkFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLE1BQU0sTUFBTixDQUFhLEtBQWIsRUFBdEIsRUFEc0M7YUFBMUM7O0FBSUEsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEtBQWtDLFVBQXpDLEVBQXFEO0FBQ3JELHNCQUFNLE9BQU4sR0FEcUQ7QUFFckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUIsRUFGcUQ7YUFBekQ7U0FMVzs7O0FBMUNFLDZCQXFEakIsbURBQXFCOztBQUVqQixZQUFNLGVBQWUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFFBQTVCLEdBQXVDLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUEvQyxHQUFtRSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBM0UsQ0FGSjtBQUdqQixZQUFNLDBCQUE0QixLQUFLLEtBQUwsQ0FBVyxzQkFBWCxHQUNBLEtBQUssS0FBTCxDQUFXLFVBQVgsS0FBMEIsS0FBMUIsSUFBbUMsaUJBQWlCLEtBQWpCLEdBQ25DLGlCQUFpQixLQUFqQixDQUxqQjs7QUFPakIsZUFDSTs7Y0FBSyxLQUFJLGFBQUosRUFBa0IsV0FBVSwrQ0FBVixFQUF2QjtZQUNLLDBCQUEwQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLElBQXFDLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsRUFBeEY7U0FGVCxDQVBpQjs7O0FBckRKLDZCQW1FakIsMkJBQVM7OztBQUNMLGVBQ0k7O3lCQUFTLEtBQUssS0FBTDtBQUNKLHFCQUFJLFNBQUo7QUFDQSwyQkFBVztBQUNQLGdEQUE0QixJQUE1Qjt1QkFDQyxLQUFLLEtBQUwsQ0FBVyxTQUFYLElBQXVCLFFBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxPQUZ6QixDQUFYO0FBSUEsc0JBQU0sSUFBTjtBQUNBLDZCQUFhLElBQWI7QUFDQSxzQkFBTSxJQUFOLEdBUkw7WUFTSyxLQUFLLGtCQUFMLEVBVEw7WUFVSSxvREFBVyxLQUFLLEtBQUwsQ0FBVyxVQUFYO0FBQ0oscUJBQUksT0FBSjtBQUNBLDJCQUFXO0FBQ1Asd0NBQW9CLElBQXBCO3dCQUNDLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsSUFBa0MsUUFBUSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFNBQXRCLFFBRnBDLENBQVg7QUFJQSw4QkFBYyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFlBQXRCLElBQXNDLEtBQUssS0FBTCxDQUFXLFlBQVg7QUFDcEQsc0JBQU0sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QixJQUE4QixLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ3BDLDZCQUFhLElBQWI7QUFDQSxzQkFBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLElBQThCLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDcEMsdUJBQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF0QixJQUErQixLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ3RDLHdCQUFRLEtBQUssV0FBTDtBQUNSLHlCQUFTLEtBQUssWUFBTDtBQUNULHlCQUFTLEtBQUssWUFBTCxHQWJoQixDQVZKO1NBREosQ0FESzs7O1dBbkVROzs7ZUFDVixZQUFZO0FBQ2Ysa0JBQWMsaUJBQVUsTUFBVjtBQUNkLDRCQUF3QixpQkFBVSxJQUFWO0FBQ3hCLGdCQUFZLGlCQUFVLE1BQVY7QUFDWixVQUFNLGlCQUFVLE1BQVY7QUFDTixpQkFBYSxpQkFBVSxNQUFWO0FBQ2IsVUFBTSxpQkFBVSxNQUFWO0FBQ04sV0FBTyxpQkFBVSxNQUFWOztBQVJNLGVBV1YsZUFBZTtBQUNsQiw0QkFBd0IsS0FBeEI7QUFDQSxnQkFBWSxFQUFaO0FBQ0EsVUFBTSxJQUFOO0FBQ0EsaUJBQWEsRUFBYjtBQUNBLFVBQU0sTUFBTjs7a0JBaEJhIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBmYWxzZSxcbiAgICAgICAgaW5wdXRQcm9wczoge30sXG4gICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBpbnB1dDogJycsXG4gICAgICAgIGlzX2ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGhhbmRsZV9ibHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVfZm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVfaW5wdXQgPSBldmVudCA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy52YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcl9wbGFjZWhvbGRlcigpIHtcbiAgICAgICAgLyogSWYgYSBjb250cm9sbGVkIGlucHV0IChgcHJvcHMudmFsdWVgIGJlaW5nIHNldCksIHNob3cgdGhlIHBsYWNlaG9sZGVyIGJhc2VkIG9uIHRoYXQgc3RhdGUgKi9cbiAgICAgICAgY29uc3QgaXNfbm9uX2VtcHR5ID0gdHlwZW9mIHRoaXMucHJvcHMudmFsdWUgPT09ICdzdHJpbmcnID8gQm9vbGVhbih0aGlzLnByb3BzLnZhbHVlKSA6IEJvb2xlYW4odGhpcy5zdGF0ZS5pbnB1dCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNfZm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNfbm9uX2VtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNfbm9uX2VtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQgdWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic+XG4gICAgICAgICAgICAgICAge3Nob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgbmFtZT17bnVsbH1cbiAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgIHR5cGU9e251bGx9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcl9wbGFjZWhvbGRlcigpfVxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4udGhpcy5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbih0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLm5hbWUgfHwgdGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLnR5cGUgfHwgdGhpcy5wcm9wcy50eXBlfVxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVfYmx1cn1cbiAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVfZm9jdXN9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9e3RoaXMuaGFuZGxlX2lucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19