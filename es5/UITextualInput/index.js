'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require('../UIUtils/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITextualInput = function (_React$PureComponent) {
    _inherits(UITextualInput, _React$PureComponent);

    function UITextualInput() {
        var _temp, _this, _ret;

        _classCallCheck(this, UITextualInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            input: '',
            isControlled: (0, _isString2.default)(_this.props.inputProps.value),
            isFocused: false
        }, _this.handleBlur = function (event) {
            _this.setState({ isFocused: false });

            if ((0, _isFunction2.default)(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ isFocused: true });

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come exclusively via props (cWRP)
            // so it exactly mirrors the current application state, otherwise a re-render will occur before
            // the new text has completed its feedback loop and the cursor position is lost
            if (_this.state.isControlled === false) {
                _this.setState({ input: event.target.value });
            }

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.isControlled === true) {
            return this.setState({ input: this.props.inputProps.value || '' });
        }

        this.setState({ input: this.props.inputProps.defaultValue || '' });
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: nextProps.inputProps.value });
        }
    };

    UITextualInput.prototype.getValue = function getValue() {
        return this.refs.field.value;
    };

    UITextualInput.prototype.setValue = function setValue(nextValue) {
        if (this.state.isControlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = nextValue;
        this.setState({ input: nextValue });
    };

    UITextualInput.prototype.getPlaceholderText = function getPlaceholderText() {
        var isNonEmpty = this.state.input !== '';
        var shouldShowPlaceholder = this.props.hidePlaceholderOnFocus === true ? this.state.isFocused === false && isNonEmpty === false : isNonEmpty === false;

        return shouldShowPlaceholder ? this.props.inputProps.placeholder : '';
    };

    UITextualInput.prototype.renderPlaceholder = function renderPlaceholder() {
        return _react2.default.createElement(
            'div',
            { ref: 'placeholder', className: 'ui-textual-input-placeholder ui-textual-input' },
            this.getPlaceholderText()
        );
    };

    UITextualInput.prototype.render = function render() {
        var _cx, _cx2;

        var props = this.props;


        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(props, UITextualInput.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-textual-input-wrapper': true
                }, _cx[props.className] = Boolean(props.className), _cx)),
                title: this.getPlaceholderText() }),
            this.renderPlaceholder(),
            _react2.default.createElement('input', _extends({}, props.inputProps, {
                ref: 'field',
                className: (0, _classnames2.default)((_cx2 = {
                    'ui-textual-input': true
                }, _cx2[props.inputProps.className] = Boolean(props.inputProps.className), _cx2)),
                placeholder: null,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onChange: this.handleChange }))
        );
    };

    return UITextualInput;
}(_react2.default.PureComponent);

UITextualInput.propTypes = {
    hidePlaceholderOnFocus: _react.PropTypes.bool,
    inputProps: _react.PropTypes.shape({
        defaultValue: _react.PropTypes.string,
        onBlur: _react.PropTypes.func,
        onFocus: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        placeholder: _react.PropTypes.string,
        type: _react.PropTypes.string,
        value: _react.PropTypes.string
    })
};
UITextualInput.internalKeys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixjOzs7Ozs7Ozs7Ozs7b0tBdUJqQixLLEdBQVE7QUFDSixtQkFBTyxFQURIO0FBRUosMEJBQWMsd0JBQVMsTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUEvQixDQUZWO0FBR0osdUJBQVc7QUFIUCxTLFFBaUNSLFUsR0FBYSxpQkFBUztBQUNsQixrQkFBSyxRQUFMLENBQWMsRUFBQyxXQUFXLEtBQVosRUFBZDs7QUFFQSxnQkFBSSwwQkFBVyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQWpDLE1BQTZDLElBQWpELEVBQXVEO0FBQ25ELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLEtBQTdCO0FBQ0g7QUFDSixTLFFBRUQsVyxHQUFjLGlCQUFTO0FBQ25CLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVcsSUFBWixFQUFkOztBQUVBLGdCQUFJLDBCQUFXLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBakMsTUFBOEMsSUFBbEQsRUFBd0Q7QUFDcEQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUI7QUFDSDtBQUNKLFMsUUFFRCxZLEdBQWUsaUJBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQUksTUFBSyxLQUFMLENBQVcsWUFBWCxLQUE0QixLQUFoQyxFQUF1QztBQUNuQyxzQkFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLE1BQU0sTUFBTixDQUFhLEtBQXJCLEVBQWQ7QUFDSDs7QUFFRCxnQkFBSSwwQkFBVyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFFBQWpDLE1BQStDLElBQW5ELEVBQXlEO0FBQ3JELHNCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFFBQXRCLENBQStCLEtBQS9CO0FBQ0g7QUFDSixTOzs7NkJBdERELGtCLGlDQUFxQjtBQUNqQixZQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsS0FBNEIsSUFBaEMsRUFBc0M7QUFDbEMsbUJBQU8sS0FBSyxRQUFMLENBQWMsRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBdEIsSUFBK0IsRUFBdkMsRUFBZCxDQUFQO0FBQ0g7O0FBRUQsYUFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsWUFBdEIsSUFBc0MsRUFBOUMsRUFBZDtBQUNILEs7OzZCQUVELHlCLHNDQUEwQixTLEVBQVc7QUFDakMsWUFBSSxVQUFVLFVBQVYsQ0FBcUIsS0FBckIsS0FBK0IsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUF6RCxFQUFnRTtBQUM1RCxpQkFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLFVBQVUsVUFBVixDQUFxQixLQUE3QixFQUFkO0FBQ0g7QUFDSixLOzs2QkFFRCxRLHVCQUFXO0FBQ1AsZUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEtBQXZCO0FBQ0gsSzs7NkJBRUQsUSxxQkFBUyxTLEVBQVc7QUFDaEIsWUFBSSxLQUFLLEtBQUwsQ0FBVyxZQUFYLEtBQTRCLElBQWhDLEVBQXNDO0FBQ2xDLG1CQUFPLFFBQVEsSUFBUixDQUFhLG1KQUFiLENBQVA7QUFDSDs7QUFFRCxhQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEtBQWhCLEdBQXdCLFNBQXhCO0FBQ0EsYUFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLFNBQVIsRUFBZDtBQUNILEs7OzZCQStCRCxrQixpQ0FBcUI7QUFDakIsWUFBTSxhQUFhLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsRUFBeEM7QUFDQSxZQUFNLHdCQUEwQixLQUFLLEtBQUwsQ0FBVyxzQkFBWCxLQUFzQyxJQUF0QyxHQUNFLEtBQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsS0FBekIsSUFBa0MsZUFBZSxLQURuRCxHQUVFLGVBQWUsS0FGakQ7O0FBSUEsZUFBTyx3QkFBd0IsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixXQUE5QyxHQUE0RCxFQUFuRTtBQUNILEs7OzZCQUVELGlCLGdDQUFvQjtBQUNoQixlQUNJO0FBQUE7QUFBQSxjQUFLLEtBQUksYUFBVCxFQUF1QixXQUFVLCtDQUFqQztBQUNLLGlCQUFLLGtCQUFMO0FBREwsU0FESjtBQUtILEs7OzZCQUVELE0scUJBQVM7QUFBQTs7QUFBQSxZQUNFLEtBREYsR0FDVyxJQURYLENBQ0UsS0FERjs7O0FBR0wsZUFDSTtBQUFBO0FBQUEseUJBQ1Esc0JBQUssS0FBTCxFQUFZLGVBQWUsWUFBM0IsQ0FEUjtBQUVJLHFCQUFJLFNBRlI7QUFHSSwyQkFBVztBQUNQLGdEQUE0QjtBQURyQix1QkFFTixNQUFNLFNBRkEsSUFFWSxRQUFRLE1BQU0sU0FBZCxDQUZaLE9BSGY7QUFPSSx1QkFBTyxLQUFLLGtCQUFMLEVBUFg7QUFRSyxpQkFBSyxpQkFBTCxFQVJMO0FBVUksZ0VBQ1EsTUFBTSxVQURkO0FBRUkscUJBQUksT0FGUjtBQUdJLDJCQUFXO0FBQ1Asd0NBQW9CO0FBRGIsd0JBRU4sTUFBTSxVQUFOLENBQWlCLFNBRlgsSUFFdUIsUUFBUSxNQUFNLFVBQU4sQ0FBaUIsU0FBekIsQ0FGdkIsUUFIZjtBQU9JLDZCQUFhLElBUGpCO0FBUUksd0JBQVEsS0FBSyxVQVJqQjtBQVNJLHlCQUFTLEtBQUssV0FUbEI7QUFVSSwwQkFBVSxLQUFLLFlBVm5CO0FBVkosU0FESjtBQXdCSCxLOzs7RUFqSXVDLGdCQUFNLGE7O0FBQTdCLGMsQ0FDVixTLEdBQVk7QUFDZiw0QkFBd0IsaUJBQVUsSUFEbkI7QUFFZixnQkFBWSxpQkFBVSxLQUFWLENBQWdCO0FBQ3hCLHNCQUFjLGlCQUFVLE1BREE7QUFFeEIsZ0JBQVEsaUJBQVUsSUFGTTtBQUd4QixpQkFBUyxpQkFBVSxJQUhLO0FBSXhCLGtCQUFVLGlCQUFVLElBSkk7QUFLeEIscUJBQWEsaUJBQVUsTUFMQztBQU14QixjQUFNLGlCQUFVLE1BTlE7QUFPeEIsZUFBTyxpQkFBVTtBQVBPLEtBQWhCO0FBRkcsQztBQURGLGMsQ0FjVixZLEdBQWUsT0FBTyxJQUFQLENBQVksZUFBZSxTQUEzQixDO0FBZEwsYyxDQWdCVixZLEdBQWU7QUFDbEIsNEJBQXdCLElBRE47QUFFbEIsZ0JBQVk7QUFDUixjQUFNO0FBREU7QUFGTSxDO2tCQWhCTCxjIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9VSVV0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3RyaW5nIGZyb20gJy4uL1VJVXRpbHMvaXNTdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIH0pLFxuICAgIH1cblxuICAgIHN0YXRpYyBpbnRlcm5hbEtleXMgPSBPYmplY3Qua2V5cyhVSVRleHR1YWxJbnB1dC5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiB0cnVlLFxuICAgICAgICBpbnB1dFByb3BzOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiAnJyxcbiAgICAgICAgaXNDb250cm9sbGVkOiBpc1N0cmluZyh0aGlzLnByb3BzLmlucHV0UHJvcHMudmFsdWUpLFxuICAgICAgICBpc0ZvY3VzZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCAnJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgJyd9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5maWVsZC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXh0VmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdVSVRleHR1YWxJbnB1dDogYSBjb250cm9sbGVkIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBieSBjaGFuZ2luZyBpdHMgYHByb3BzLnZhbHVlYCBvciBgcHJvcHMuaW5wdXRQcm9wcy52YWx1ZWAsIG5vdCB2aWEgcHJvZ3JhbW1hdGljIG1ldGhvZHMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnMuZmllbGQudmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0VmFsdWV9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0ZvY3VzZWQ6IGZhbHNlfSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogdHJ1ZX0pO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgICAgICAvLyBmb3IgXCJjb250cm9sbGVkXCIgc2NlbmFyaW9zLCB1cGRhdGVzIHRvIHRoZSBjYWNoZWQgaW5wdXQgdGV4dCBzaG91bGQgY29tZSBleGNsdXNpdmVseSB2aWEgcHJvcHMgKGNXUlApXG4gICAgICAgIC8vIHNvIGl0IGV4YWN0bHkgbWlycm9ycyB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZSwgb3RoZXJ3aXNlIGEgcmUtcmVuZGVyIHdpbGwgb2NjdXIgYmVmb3JlXG4gICAgICAgIC8vIHRoZSBuZXcgdGV4dCBoYXMgY29tcGxldGVkIGl0cyBmZWVkYmFjayBsb29wIGFuZCB0aGUgY3Vyc29yIHBvc2l0aW9uIGlzIGxvc3RcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNDb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBsYWNlaG9sZGVyVGV4dCgpIHtcbiAgICAgICAgY29uc3QgaXNOb25FbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRTaG93UGxhY2Vob2xkZXIgPSAgIHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgPT09IGZhbHNlICYmIGlzTm9uRW1wdHkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc05vbkVtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gc2hvdWxkU2hvd1BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=