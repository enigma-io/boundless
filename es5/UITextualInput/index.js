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

var is_function = function is_function(test) {
    return typeof test === 'function';
};
var is_string = function is_string(test) {
    return typeof test === 'string';
};

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
            is_controlled: is_string(_this.props.inputProps.value) || is_string(_this.props.value),
            is_focused: false
        }, _this.handleBlur = function (event) {
            _this.setState({ is_focused: false });

            if (is_function(_this.props.inputProps.onBlur) === true) {
                event.persist();
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ is_focused: true });

            if (is_function(_this.props.inputProps.onFocus) === true) {
                event.persist();
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleInput = function (event) {
            _this.setState({ input: event.target.value });

            if (is_function(_this.props.inputProps.onInput) === true) {
                event.persist();
                _this.props.inputProps.onInput(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.is_controlled === true) {
            return this.setState({ input: this.props.inputProps.value || this.props.value || '' });
        }

        this.setState({ input: this.props.inputProps.defaultValue || this.props.defaultValue || '' });
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        if (props.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: props.inputProps.value });
        } else if (props.value !== this.props.value) {
            this.setState({ input: props.value });
        }
    };

    UITextualInput.prototype.value = function value(next_value) {
        if (this.state.is_controlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = next_value;
        this.setState({ input: next_value });
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        var is_non_empty = Boolean(this.state.input);
        var should_show_placeholder = this.props.hidePlaceholderOnFocus === true ? this.state.is_focused === false && is_non_empty === false : is_non_empty === false;

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
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        placeholder: _react.PropTypes.string,
        value: _react.PropTypes.string
    }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxjQUFjLFNBQWQsV0FBYztXQUFRLE9BQU8sSUFBUCxLQUFnQixVQUFoQjtDQUFSO0FBQ3BCLElBQU0sWUFBWSxTQUFaLFNBQVk7V0FBUSxPQUFPLElBQVAsS0FBZ0IsUUFBaEI7Q0FBUjs7SUFFRzs7Ozs7Ozs7Ozs7OzBJQXVCakIsUUFBUTtBQUNKLG1CQUFPLEVBQVA7QUFDQSwyQkFBZSxVQUFVLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEIsQ0FBVixJQUEwQyxVQUFVLE1BQUssS0FBTCxDQUFXLEtBQVgsQ0FBcEQ7QUFDZix3QkFBWSxLQUFaO2lCQTRCSixhQUFhLGlCQUFTO0FBQ2xCLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksS0FBWixFQUFmLEVBRGtCOztBQUdsQixnQkFBSSxZQUFZLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBWixLQUE4QyxJQUE5QyxFQUFvRDtBQUNwRCxzQkFBTSxPQUFOLEdBRG9EO0FBRXBELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLEtBQTdCLEVBRm9EO2FBQXhEO1NBSFMsUUFTYixjQUFjLGlCQUFTO0FBQ25CLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksSUFBWixFQUFmLEVBRG1COztBQUduQixnQkFBSSxZQUFZLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBWixLQUErQyxJQUEvQyxFQUFxRDtBQUNyRCxzQkFBTSxPQUFOLEdBRHFEO0FBRXJELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLENBQThCLEtBQTlCLEVBRnFEO2FBQXpEO1NBSFUsUUFTZCxjQUFjLGlCQUFTO0FBQ25CLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxNQUFO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QUFYLENBQXNCLFlBQXRCLElBQXNDLEtBQUssS0FBTCxDQUFXLFlBQVg7QUFDcEQsc0JBQU0sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QixJQUE4QixLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ3BDLDZCQUFhLElBQWI7QUFDQSxzQkFBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLElBQThCLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDcEMsdUJBQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF0QixJQUErQixLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ3RDLHdCQUFRLEtBQUssVUFBTDtBQUNSLHlCQUFTLEtBQUssV0FBTDtBQUNULHlCQUFTLEtBQUssV0FBTCxHQWJoQixDQVZKO1NBREosQ0FESzs7O1dBOUZROzs7ZUFDVixZQUFZO0FBQ2Ysa0JBQWMsaUJBQVUsTUFBVjtBQUNkLDRCQUF3QixpQkFBVSxJQUFWO0FBQ3hCLGdCQUFZLGlCQUFVLEtBQVYsQ0FBZ0I7QUFDeEIsc0JBQWMsaUJBQVUsTUFBVjtBQUNkLHFCQUFhLGlCQUFVLE1BQVY7QUFDYixlQUFPLGlCQUFVLE1BQVY7S0FIQyxDQUFaO0FBS0EsVUFBTSxpQkFBVSxNQUFWO0FBQ04saUJBQWEsaUJBQVUsTUFBVjtBQUNiLFVBQU0saUJBQVUsTUFBVjtBQUNOLFdBQU8saUJBQVUsTUFBVjs7QUFaTSxlQWVWLGVBQWU7QUFDbEIsNEJBQXdCLEtBQXhCO0FBQ0EsZ0JBQVksRUFBWjtBQUNBLFVBQU0sSUFBTjtBQUNBLGlCQUFhLEVBQWI7QUFDQSxVQUFNLE1BQU47O2tCQXBCYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IGlzX2Z1bmN0aW9uID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzX3N0cmluZyA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdzdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogZmFsc2UsXG4gICAgICAgIGlucHV0UHJvcHM6IHt9LFxuICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc19jb250cm9sbGVkOiBpc19zdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB8fCBpc19zdHJpbmcodGhpcy5wcm9wcy52YWx1ZSksXG4gICAgICAgIGlzX2ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe2lucHV0OiB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy52YWx1ZSB8fCAnJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgJyd9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5pbnB1dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBwcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBwcm9wcy52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUobmV4dF92YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdVSVRleHR1YWxJbnB1dDogYSBjb250cm9sbGVkIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBieSBjaGFuZ2luZyBpdHMgYHByb3BzLnZhbHVlYCBvciBgcHJvcHMuaW5wdXRQcm9wcy52YWx1ZWAsIG5vdCB2aWEgcHJvZ3JhbW1hdGljIG1ldGhvZHMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnMuZmllbGQudmFsdWUgPSBuZXh0X3ZhbHVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogbmV4dF92YWx1ZX0pO1xuICAgIH1cblxuICAgIGhhbmRsZUJsdXIgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IGZhbHNlfSk7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiB0cnVlfSk7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBldmVudC50YXJnZXQudmFsdWV9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgY29uc3QgaXNfbm9uX2VtcHR5ID0gQm9vbGVhbih0aGlzLnN0YXRlLmlucHV0KTtcbiAgICAgICAgY29uc3Qgc2hvdWxkX3Nob3dfcGxhY2Vob2xkZXIgPSAgIHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5pc19mb2N1c2VkID09PSBmYWxzZSAmJiBpc19ub25fZW1wdHkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc19ub25fZW1wdHkgPT09IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dCB1aS10ZXh0dWFsLWlucHV0LXBsYWNlaG9sZGVyJz5cbiAgICAgICAgICAgICAgICB7c2hvdWxkX3Nob3dfcGxhY2Vob2xkZXIgPyB0aGlzLnByb3BzLmlucHV0UHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5wbGFjZWhvbGRlciA6ICcnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbih0aGlzLnByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICBuYW1lPXtudWxsfVxuICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICAgdHlwZT17bnVsbH0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8IHRoaXMucHJvcHMudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==