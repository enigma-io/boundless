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
        }, _this.setInputValue = function () {
            var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            return _this.setState(function (state) {
                return _extends({}, state, { input: value });
            });
        }, _this.getValue = function () {
            return _this.refs.field.value;
        }, _this.handleBlur = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: false });
            });

            if ((0, _isFunction2.default)(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState(function (state) {
                return _extends({}, state, { isFocused: true });
            });

            if ((0, _isFunction2.default)(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come
            // exclusively via props (cWRP) so it exactly mirrors the current application
            // state, otherwise a re-render will occur before the new text has completed its
            // feedback loop and the cursor position is lost
            if (_this.state.isControlled === false) {
                _this.setInputValue(event.target.value);
            }

            if ((0, _isFunction2.default)(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.isControlled === true) {
            return this.setInputValue(this.props.inputProps.value);
        }

        this.setInputValue(this.props.inputProps.defaultValue);
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setInputValue(nextProps.inputProps.value);
        }
    };

    UITextualInput.prototype.setValue = function setValue(nextValue) {
        this.setInputValue(nextValue);
        this.refs.field.value = nextValue;

        if (this.state.isControlled === true) {
            // simulate input change event flow
            this.refs.field.dispatchEvent(new Event('input', { bubbles: true }));
            this.refs.field.dispatchEvent(new Event('change', { bubbles: true }));
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbIlVJVGV4dHVhbElucHV0Iiwic3RhdGUiLCJpbnB1dCIsImlzQ29udHJvbGxlZCIsInByb3BzIiwiaW5wdXRQcm9wcyIsInZhbHVlIiwiaXNGb2N1c2VkIiwic2V0SW5wdXRWYWx1ZSIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJyZWZzIiwiZmllbGQiLCJoYW5kbGVCbHVyIiwib25CbHVyIiwiZXZlbnQiLCJoYW5kbGVGb2N1cyIsIm9uRm9jdXMiLCJoYW5kbGVDaGFuZ2UiLCJ0YXJnZXQiLCJvbkNoYW5nZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImRlZmF1bHRWYWx1ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRWYWx1ZSIsIm5leHRWYWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImJ1YmJsZXMiLCJnZXRQbGFjZWhvbGRlclRleHQiLCJpc05vbkVtcHR5Iiwic2hvdWxkU2hvd1BsYWNlaG9sZGVyIiwiaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyIsInBsYWNlaG9sZGVyIiwicmVuZGVyUGxhY2Vob2xkZXIiLCJyZW5kZXIiLCJpbnRlcm5hbEtleXMiLCJjbGFzc05hbWUiLCJCb29sZWFuIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsImJvb2wiLCJzaGFwZSIsInN0cmluZyIsImZ1bmMiLCJ0eXBlIiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7b0tBdUJqQkMsSyxHQUFRO0FBQ0pDLG1CQUFPLEVBREg7QUFFSkMsMEJBQWMsd0JBQVMsTUFBS0MsS0FBTCxDQUFXQyxVQUFYLENBQXNCQyxLQUEvQixDQUZWO0FBR0pDLHVCQUFXO0FBSFAsUyxRQW9CUkMsYSxHQUFn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QkFBVVMsSUFEbkI7QUFFZnJDLGdCQUFZLGlCQUFVc0MsS0FBVixDQUFnQjtBQUN4QnJCLHNCQUFjLGlCQUFVc0IsTUFEQTtBQUV4QjlCLGdCQUFRLGlCQUFVK0IsSUFGTTtBQUd4QjVCLGlCQUFTLGlCQUFVNEIsSUFISztBQUl4QnpCLGtCQUFVLGlCQUFVeUIsSUFKSTtBQUt4QlgscUJBQWEsaUJBQVVVLE1BTEM7QUFNeEJFLGNBQU0saUJBQVVGLE1BTlE7QUFPeEJ0QyxlQUFPLGlCQUFVc0M7QUFQTyxLQUFoQjtBQUZHLEM7QUFERjVDLGMsQ0FjVnFDLFksR0FBZVUsT0FBT0MsSUFBUCxDQUFZaEQsZUFBZXlDLFNBQTNCLEM7QUFkTHpDLGMsQ0FnQlZpRCxZLEdBQWU7QUFDbEJoQiw0QkFBd0IsSUFETjtBQUVsQjVCLGdCQUFZO0FBQ1J5QyxjQUFNO0FBREU7QUFGTSxDO2tCQWhCTDlDLGMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnLi4vVUlVdGlscy9pc1N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaGlkZVBsYWNlaG9sZGVyT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGlucHV0UHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICAgICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgfSksXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc0NvbnRyb2xsZWQ6IGlzU3RyaW5nKHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSksXG4gICAgICAgIGlzRm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldElucHV0VmFsdWUodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmlucHV0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG5leHRQcm9wcy5pbnB1dFByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldElucHV0VmFsdWUgPSAodmFsdWUgPSAnJykgPT4gdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlucHV0OiB2YWx1ZX0pKVxuXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB0aGlzLnJlZnMuZmllbGQudmFsdWVcblxuICAgIHNldFZhbHVlKG5leHRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5yZWZzLmZpZWxkLnZhbHVlID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgaW5wdXQgY2hhbmdlIGV2ZW50IGZsb3dcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWV9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKChzdGF0ZSkgPT4gKHsuLi5zdGF0ZSwgaXNGb2N1c2VkOiBmYWxzZX0pKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25CbHVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVGb2N1cyA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGlzRm9jdXNlZDogdHJ1ZX0pKTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgICAgLy8gZm9yIFwiY29udHJvbGxlZFwiIHNjZW5hcmlvcywgdXBkYXRlcyB0byB0aGUgY2FjaGVkIGlucHV0IHRleHQgc2hvdWxkIGNvbWVcbiAgICAgICAgLy8gZXhjbHVzaXZlbHkgdmlhIHByb3BzIChjV1JQKSBzbyBpdCBleGFjdGx5IG1pcnJvcnMgdGhlIGN1cnJlbnQgYXBwbGljYXRpb25cbiAgICAgICAgLy8gc3RhdGUsIG90aGVyd2lzZSBhIHJlLXJlbmRlciB3aWxsIG9jY3VyIGJlZm9yZSB0aGUgbmV3IHRleHQgaGFzIGNvbXBsZXRlZCBpdHNcbiAgICAgICAgLy8gZmVlZGJhY2sgbG9vcCBhbmQgdGhlIGN1cnNvciBwb3NpdGlvbiBpcyBsb3N0XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzQ29udHJvbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBsYWNlaG9sZGVyVGV4dCgpIHtcbiAgICAgICAgY29uc3QgaXNOb25FbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRTaG93UGxhY2Vob2xkZXIgPSAgIHRoaXMucHJvcHMuaGlkZVBsYWNlaG9sZGVyT25Gb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgPT09IGZhbHNlICYmIGlzTm9uRW1wdHkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc05vbkVtcHR5ID09PSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gc2hvdWxkU2hvd1BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0LXdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbcHJvcHMuY2xhc3NOYW1lXTogQm9vbGVhbihwcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aGlzLmdldFBsYWNlaG9sZGVyVGV4dCgpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpfVxuXG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wcy5pbnB1dFByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J2ZpZWxkJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS10ZXh0dWFsLWlucHV0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVCbHVyfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=