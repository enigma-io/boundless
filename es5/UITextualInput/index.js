'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

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
            is_controlled: is_string(_this.props.inputProps.value),
            is_focused: false
        }, _this.handleBlur = function (event) {
            _this.setState({ is_focused: false });

            if (is_function(_this.props.inputProps.onBlur) === true) {
                _this.props.inputProps.onBlur(event);
            }
        }, _this.handleFocus = function (event) {
            _this.setState({ is_focused: true });

            if (is_function(_this.props.inputProps.onFocus) === true) {
                _this.props.inputProps.onFocus(event);
            }
        }, _this.handleChange = function (event) {
            // for "controlled" scenarios, updates to the cached input text should come exclusively via props (cWRP)
            // so it exactly mirrors the current application state, otherwise a re-render will occur before
            // the new text has completed its feedback loop and the cursor position is lost
            if (_this.state.is_controlled === false) {
                _this.setState({ input: event.target.value });
            }

            if (is_function(_this.props.inputProps.onChange) === true) {
                _this.props.inputProps.onChange(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UITextualInput.prototype.componentWillMount = function componentWillMount() {
        if (this.state.is_controlled === true) {
            return this.setState({ input: this.props.inputProps.value || '' });
        }

        this.setState({ input: this.props.inputProps.defaultValue || '' });
    };

    UITextualInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(next_props) {
        if (next_props.inputProps.value !== this.props.inputProps.value) {
            this.setState({ input: next_props.inputProps.value });
        }
    };

    UITextualInput.prototype.getValue = function getValue() {
        return this.refs.field.value;
    };

    UITextualInput.prototype.setValue = function setValue(next_value) {
        if (this.state.is_controlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = next_value;
        this.setState({ input: next_value });
    };

    UITextualInput.prototype.getPlaceholderText = function getPlaceholderText() {
        var is_non_empty = this.state.input !== '';
        var should_show_placeholder = this.props.hidePlaceholderOnFocus === true ? this.state.is_focused === false && is_non_empty === false : is_non_empty === false;

        return should_show_placeholder ? this.props.inputProps.placeholder : '';
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
            _extends({}, (0, _lodash2.default)(props, UITextualInput.internal_keys), {
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
}(_UIView3.default);

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
UITextualInput.internal_keys = Object.keys(UITextualInput.propTypes);
UITextualInput.defaultProps = {
    hidePlaceholderOnFocus: true,
    inputProps: {
        type: 'text'
    }
};
exports.default = UITextualInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsU0FBZCxXQUFjO0FBQUEsV0FBUSxPQUFPLElBQVAsS0FBZ0IsVUFBeEI7QUFBQSxDQUFwQjtBQUNBLElBQU0sWUFBWSxTQUFaLFNBQVk7QUFBQSxXQUFRLE9BQU8sSUFBUCxLQUFnQixRQUF4QjtBQUFBLENBQWxCOztJQUVxQixjOzs7Ozs7Ozs7Ozs7MElBdUJqQixLLEdBQVE7QUFDSixtQkFBTyxFQURIO0FBRUosMkJBQWUsVUFBVSxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQWhDLENBRlg7QUFHSix3QkFBWTtBQUhSLFMsUUFpQ1IsVSxHQUFhLGlCQUFTO0FBQ2xCLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksS0FBYixFQUFkOztBQUVBLGdCQUFJLFlBQVksTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUFsQyxNQUE4QyxJQUFsRCxFQUF3RDtBQUNwRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixDQUE2QixLQUE3QjtBQUNIO0FBQ0osUyxRQUVELFcsR0FBYyxpQkFBUztBQUNuQixrQkFBSyxRQUFMLENBQWMsRUFBQyxZQUFZLElBQWIsRUFBZDs7QUFFQSxnQkFBSSxZQUFZLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBbEMsTUFBK0MsSUFBbkQsRUFBeUQ7QUFDckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUI7QUFDSDtBQUNKLFMsUUFFRCxZLEdBQWUsaUJBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQUksTUFBSyxLQUFMLENBQVcsYUFBWCxLQUE2QixLQUFqQyxFQUF3QztBQUNwQyxzQkFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLE1BQU0sTUFBTixDQUFhLEtBQXJC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QixnQkFBUSxpQkFBVSxJQUZNO0FBR3hCLGlCQUFTLGlCQUFVLElBSEs7QUFJeEIsa0JBQVUsaUJBQVUsSUFKSTtBQUt4QixxQkFBYSxpQkFBVSxNQUxDO0FBTXhCLGNBQU0saUJBQVUsTUFOUTtBQU94QixlQUFPLGlCQUFVO0FBUE8sS0FBaEI7QUFGRyxDO0FBREYsYyxDQWNWLGEsR0FBZ0IsT0FBTyxJQUFQLENBQVksZUFBZSxTQUEzQixDO0FBZE4sYyxDQWdCVixZLEdBQWU7QUFDbEIsNEJBQXdCLElBRE47QUFFbEIsZ0JBQVk7QUFDUixjQUFNO0FBREU7QUFGTSxDO2tCQWhCTCxjIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcblxuY29uc3QgaXNfZnVuY3Rpb24gPSB0ZXN0ID0+IHR5cGVvZiB0ZXN0ID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNfc3RyaW5nID0gdGVzdCA9PiB0eXBlb2YgdGVzdCA9PT0gJ3N0cmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGV4dHVhbElucHV0IGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgICAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB9KSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJVGV4dHVhbElucHV0LnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IHRydWUsXG4gICAgICAgIGlucHV0UHJvcHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaW5wdXQ6ICcnLFxuICAgICAgICBpc19jb250cm9sbGVkOiBpc19zdHJpbmcodGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSxcbiAgICAgICAgaXNfZm9jdXNlZDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCAnJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgJyd9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMuaW5wdXRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogbmV4dF9wcm9wcy5pbnB1dFByb3BzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5maWVsZC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShuZXh0X3ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzX2NvbnRyb2xsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ1VJVGV4dHVhbElucHV0OiBhIGNvbnRyb2xsZWQgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGJ5IGNoYW5naW5nIGl0cyBgcHJvcHMudmFsdWVgIG9yIGBwcm9wcy5pbnB1dFByb3BzLnZhbHVlYCwgbm90IHZpYSBwcm9ncmFtbWF0aWMgbWV0aG9kcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcy5maWVsZC52YWx1ZSA9IG5leHRfdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0OiBuZXh0X3ZhbHVlfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uQmx1cikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzX2ZvY3VzZWQ6IHRydWV9KTtcblxuICAgICAgICBpZiAoaXNfZnVuY3Rpb24odGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSBldmVudCA9PiB7XG4gICAgICAgIC8vIGZvciBcImNvbnRyb2xsZWRcIiBzY2VuYXJpb3MsIHVwZGF0ZXMgdG8gdGhlIGNhY2hlZCBpbnB1dCB0ZXh0IHNob3VsZCBjb21lIGV4Y2x1c2l2ZWx5IHZpYSBwcm9wcyAoY1dSUClcbiAgICAgICAgLy8gc28gaXQgZXhhY3RseSBtaXJyb3JzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIHN0YXRlLCBvdGhlcndpc2UgYSByZS1yZW5kZXIgd2lsbCBvY2N1ciBiZWZvcmVcbiAgICAgICAgLy8gdGhlIG5ldyB0ZXh0IGhhcyBjb21wbGV0ZWQgaXRzIGZlZWRiYWNrIGxvb3AgYW5kIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbG9zdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc19jb250cm9sbGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlclRleHQoKSB7XG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IHRoaXMuc3RhdGUuaW5wdXQgIT09ICcnO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHNob3VsZF9zaG93X3BsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5pbnB1dFByb3BzLnBsYWNlaG9sZGVyIDogJyc7XG4gICAgfVxuXG4gICAgcmVuZGVyUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHJlZj0ncGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndWktdGV4dHVhbC1pbnB1dC1wbGFjZWhvbGRlciB1aS10ZXh0dWFsLWlucHV0Jz5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4ub21pdChwcm9wcywgVUlUZXh0dWFsSW5wdXQuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dC13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3Byb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4ocHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB0aXRsZT17dGhpcy5nZXRQbGFjZWhvbGRlclRleHQoKX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGxhY2Vob2xkZXIoKX1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbcHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19