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

        var state = this.state;
        var props = this.props;


        return _react2.default.createElement(
            'div',
            _extends({}, props, {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[props.className] = Boolean(props.className), _cx)),
                name: null,
                placeholder: null,
                type: null }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[props.inputProps.className] = Boolean(props.inputProps.className), _cx2)),
                defaultValue: state.is_controlled === true ? undefined : props.inputProps.defaultValue || props.defaultValue,
                name: props.inputProps.name || props.name,
                placeholder: null,
                type: props.inputProps.type || props.type,
                value: state.is_controlled === true ? props.inputProps.value || props.value || '' : undefined,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxjQUFjLFNBQWQsV0FBYztBQUFBLFdBQVEsT0FBTyxJQUFQLEtBQWdCLFVBQXhCO0FBQUEsQ0FBcEI7QUFDQSxJQUFNLFlBQVksU0FBWixTQUFZO0FBQUEsV0FBUSxPQUFPLElBQVAsS0FBZ0IsUUFBeEI7QUFBQSxDQUFsQjs7SUFFcUIsYzs7Ozs7Ozs7Ozs7OzBJQXVCakIsSyxHQUFRO0FBQ0osbUJBQU8sRUFESDtBQUVKLDJCQUFlLFVBQVUsTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUFoQyxLQUEwQyxVQUFVLE1BQUssS0FBTCxDQUFXLEtBQXJCLENBRnJEO0FBR0osd0JBQVk7QUFIUixTLFFBK0JSLFUsR0FBYSxpQkFBUztBQUNsQixrQkFBSyxRQUFMLENBQWMsRUFBQyxZQUFZLEtBQWIsRUFBZDs7QUFFQSxnQkFBSSxZQUFZLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBbEMsTUFBOEMsSUFBbEQsRUFBd0Q7QUFDcEQsc0JBQU0sT0FBTjtBQUNBLHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLEtBQTdCO0FBQ0g7QUFDSixTLFFBRUQsVyxHQUFjLGlCQUFTO0FBQ25CLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksSUFBYixFQUFkOztBQUVBLGdCQUFJLFlBQVksTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUFsQyxNQUErQyxJQUFuRCxFQUF5RDtBQUNyRCxzQkFBTSxPQUFOO0FBQ0Esc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUI7QUFDSDtBQUNKLFMsUUFFRCxXLEdBQWMsaUJBQVM7QUFDbkIsa0JBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxNQUFNLE1BQU4sQ0FBYSxLQUFyQixFQUFkOztBQUVBLGdCQUFJLFlBQVksTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUFsQyxNQUErQyxJQUFuRCxFQUF5RDtBQUNyRCxzQkFBTSxPQUFOO0FBQ0Esc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUI7QUFDSDtBQUNKLFM7Ozs2QkFsREQsa0IsaUNBQXFCO0FBQ2pCLFlBQUksS0FBSyxLQUFMLENBQVcsYUFBWCxLQUE2QixJQUFqQyxFQUF1QztBQUNuQyxtQkFBTyxLQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF0QixJQUErQixLQUFLLEtBQUwsQ0FBVyxLQUExQyxJQUFtRCxFQUEzRCxFQUFkLENBQVA7QUFDSDs7QUFFRCxhQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixZQUF0QixJQUFzQyxLQUFLLEtBQUwsQ0FBVyxZQUFqRCxJQUFpRSxFQUF6RSxFQUFkO0FBQ0gsSzs7NkJBRUQseUIsc0NBQTBCLEssRUFBTztBQUM3QixZQUFJLE1BQU0sVUFBTixDQUFpQixLQUFqQixLQUEyQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXJELEVBQTREO0FBQ3hELGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxVQUFOLENBQWlCLEtBQXpCLEVBQWQ7QUFDSCxTQUZELE1BRU8sSUFBSSxNQUFNLEtBQU4sS0FBZ0IsS0FBSyxLQUFMLENBQVcsS0FBL0IsRUFBc0M7QUFDekMsaUJBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxNQUFNLEtBQWQsRUFBZDtBQUNIO0FBQ0osSzs7NkJBRUQsSyxrQkFBTSxVLEVBQVk7QUFDZCxZQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsS0FBNkIsSUFBakMsRUFBdUM7QUFDbkMsbUJBQU8sUUFBUSxJQUFSLENBQWEsbUpBQWIsQ0FBUDtBQUNIOztBQUVELGFBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsS0FBaEIsR0FBd0IsVUFBeEI7QUFDQSxhQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sVUFBUixFQUFkO0FBQ0gsSzs7NkJBNkJELGlCLGdDQUFvQjtBQUNoQixZQUFNLGVBQWUsUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFuQixDQUFyQjtBQUNBLFlBQU0sMEJBQTRCLEtBQUssS0FBTCxDQUFXLHNCQUFYLEtBQXNDLElBQXRDLEdBQ0EsS0FBSyxLQUFMLENBQVcsVUFBWCxLQUEwQixLQUExQixJQUFtQyxpQkFBaUIsS0FEcEQsR0FFQSxpQkFBaUIsS0FGbkQ7O0FBSUEsZUFDSTtBQUFBO1lBQUEsRUFBSyxLQUFJLGFBQVQsRUFBdUIsV0FBVSwrQ0FBakM7WUFDSywwQkFBMEIsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixXQUF0QixJQUFxQyxLQUFLLEtBQUwsQ0FBVyxXQUExRSxHQUF3RjtBQUQ3RixTQURKO0FBS0gsSzs7NkJBRUQsTSxxQkFBUztBQUFBOztBQUFBLFlBQ0csS0FESCxHQUNvQixJQURwQixDQUNHLEtBREg7QUFBQSxZQUNVLEtBRFYsR0FDb0IsSUFEcEIsQ0FDVSxLQURWOzs7QUFHTCxlQUNJO0FBQUE7WUFBQSxhQUNRLEtBRFI7QUFFSSxxQkFBSSxTQUZSO0FBR0ksMkJBQVc7QUFDUCxnREFBNEI7QUFEckIsdUJBRU4sTUFBTSxTQUZBLElBRVksUUFBUSxNQUFNLFNBQWQsQ0FGWixPQUhmO0FBT0ksc0JBQU0sSUFQVjtBQVFJLDZCQUFhLElBUmpCO0FBU0ksc0JBQU0sSUFUVjtZQVVLLEtBQUssaUJBQUwsRUFWTDtZQVdJLG9EQUNRLE1BQU0sVUFEZDtBQUVJLHFCQUFJLE9BRlI7QUFHSSwyQkFBVztBQUNQLHdDQUFvQjtBQURiLHdCQUVOLE1BQU0sVUFBTixDQUFpQixTQUZYLElBRXVCLFFBQVEsTUFBTSxVQUFOLENBQWlCLFNBQXpCLENBRnZCLFFBSGY7QUFPSSw4QkFBYyxNQUFNLGFBQU4sS0FBd0IsSUFBeEIsR0FBK0IsU0FBL0IsR0FBMkMsTUFBTSxVQUFOLENBQWlCLFlBQWpCLElBQWlDLE1BQU0sWUFQcEc7QUFRSSxzQkFBTSxNQUFNLFVBQU4sQ0FBaUIsSUFBakIsSUFBeUIsTUFBTSxJQVJ6QztBQVNJLDZCQUFhLElBVGpCO0FBVUksc0JBQU0sTUFBTSxVQUFOLENBQWlCLElBQWpCLElBQXlCLE1BQU0sSUFWekM7QUFXSSx1QkFBTyxNQUFNLGFBQU4sS0FBd0IsSUFBeEIsR0FBK0IsTUFBTSxVQUFOLENBQWlCLEtBQWpCLElBQTBCLE1BQU0sS0FBaEMsSUFBeUMsRUFBeEUsR0FBNkUsU0FYeEY7QUFZSSx3QkFBUSxLQUFLLFVBWmpCO0FBYUkseUJBQVMsS0FBSyxXQWJsQjtBQWNJLHlCQUFTLEtBQUssV0FkbEI7QUFYSixTQURKO0FBNkJILEs7Ozs7O0FBOUhnQixjLENBQ1YsUyxHQUFZO0FBQ2Ysa0JBQWMsaUJBQVUsTUFEVDtBQUVmLDRCQUF3QixpQkFBVSxJQUZuQjtBQUdmLGdCQUFZLGlCQUFVLEtBQVYsQ0FBZ0I7QUFDeEIsc0JBQWMsaUJBQVUsTUFEQTtBQUV4QixxQkFBYSxpQkFBVSxNQUZDO0FBR3hCLGVBQU8saUJBQVU7QUFITyxLQUFoQixDQUhHO0FBUWYsVUFBTSxpQkFBVSxNQVJEO0FBU2YsaUJBQWEsaUJBQVUsTUFUUjtBQVVmLFVBQU0saUJBQVUsTUFWRDtBQVdmLFdBQU8saUJBQVU7QUFYRixDO0FBREYsYyxDQWVWLFksR0FBZTtBQUNsQiw0QkFBd0IsS0FETjtBQUVsQixnQkFBWSxFQUZNO0FBR2xCLFVBQU0sSUFIWTtBQUlsQixpQkFBYSxFQUpLO0FBS2xCLFVBQU07QUFMWSxDO2tCQWZMLGMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBpc19mdW5jdGlvbiA9IHRlc3QgPT4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc19zdHJpbmcgPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnc3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUZXh0dWFsSW5wdXQgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IGZhbHNlLFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNfY29udHJvbGxlZDogaXNfc3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkgfHwgaXNfc3RyaW5nKHRoaXMucHJvcHMudmFsdWUpLFxuICAgICAgICBpc19mb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtpbnB1dDogdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWUgfHwgJyd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlIHx8IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlIHx8ICcnfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogcHJvcHMuaW5wdXRQcm9wcy52YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogcHJvcHMudmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbHVlKG5leHRfdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignVUlUZXh0dWFsSW5wdXQ6IGEgY29udHJvbGxlZCBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYnkgY2hhbmdpbmcgaXRzIGBwcm9wcy52YWx1ZWAgb3IgYHByb3BzLmlucHV0UHJvcHMudmFsdWVgLCBub3QgdmlhIHByb2dyYW1tYXRpYyBtZXRob2RzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dF92YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRfdmFsdWV9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiBmYWxzZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc19mdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0ID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IEJvb2xlYW4odGhpcy5zdGF0ZS5pbnB1dCk7XG4gICAgICAgIGNvbnN0IHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID0gICB0aGlzLnByb3BzLmhpZGVQbGFjZWhvbGRlck9uRm9jdXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUuaXNfZm9jdXNlZCA9PT0gZmFsc2UgJiYgaXNfbm9uX2VtcHR5ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNfbm9uX2VtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiByZWY9J3BsYWNlaG9sZGVyJyBjbGFzc05hbWU9J3VpLXRleHR1YWwtaW5wdXQgdWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlcic+XG4gICAgICAgICAgICAgICAge3Nob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgOiAnJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZSwgcHJvcHMgfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBuYW1lPXtudWxsfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgIHR5cGU9e251bGx9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBsYWNlaG9sZGVyKCl9XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtzdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlID8gdW5kZWZpbmVkIDogcHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgcHJvcHMuZGVmYXVsdFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtwcm9wcy5pbnB1dFByb3BzLm5hbWUgfHwgcHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e3Byb3BzLmlucHV0UHJvcHMudHlwZSB8fCBwcm9wcy50eXBlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhdGUuaXNfY29udHJvbGxlZCA9PT0gdHJ1ZSA/IHByb3BzLmlucHV0UHJvcHMudmFsdWUgfHwgcHJvcHMudmFsdWUgfHwgJycgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19