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
            input: _this.props.defaultValue || _this.props.inputProps.defaultValue || '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJVGV4dHVhbElucHV0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7MElBbUJqQixRQUFRO0FBQ0osbUJBQU8sTUFBSyxLQUFMLENBQVcsWUFBWCxJQUEyQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFlBQXRCLElBQXNDLEVBQWpFO0FBQ1Asd0JBQVksS0FBWjtpQkFHSixjQUFjLGlCQUFTO0FBQ25CLGtCQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksS0FBWixFQUFmLEVBRG1COztBQUduQixnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsS0FBaUMsVUFBeEMsRUFBb0Q7QUFDcEQsc0JBQU0sT0FBTixHQURvRDtBQUVwRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixDQUE2QixLQUE3QixFQUZvRDthQUF4RDtTQUhVLFFBU2QsZUFBZSxpQkFBUztBQUNwQixrQkFBSyxRQUFMLENBQWMsRUFBQyxZQUFZLElBQVosRUFBZixFQURvQjs7QUFHcEIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLEtBQWtDLFVBQXpDLEVBQXFEO0FBQ3JELHNCQUFNLE9BQU4sR0FEcUQ7QUFFckQsc0JBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBOEIsS0FBOUIsRUFGcUQ7YUFBekQ7U0FIVyxRQVNmLGVBQWUsaUJBQVM7QUFDcEIsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFFBQTVCLEVBQXNDO0FBQ3RDLHNCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxNQUFOLENBQWEsS0FBYixFQUF0QixFQURzQzthQUExQzs7QUFJQSxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsT0FBdEIsS0FBa0MsVUFBekMsRUFBcUQ7QUFDckQsc0JBQU0sT0FBTixHQURxRDtBQUVyRCxzQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixPQUF0QixDQUE4QixLQUE5QixFQUZxRDthQUF6RDtTQUxXOzs7QUExQ0UsNkJBcURqQixtREFBcUI7O0FBRWpCLFlBQU0sZUFBZSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsUUFBNUIsR0FBdUMsUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQS9DLEdBQW1FLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUEzRSxDQUZKO0FBR2pCLFlBQU0sMEJBQTRCLEtBQUssS0FBTCxDQUFXLHNCQUFYLEdBQ0EsS0FBSyxLQUFMLENBQVcsVUFBWCxLQUEwQixLQUExQixJQUFtQyxpQkFBaUIsS0FBakIsR0FDbkMsaUJBQWlCLEtBQWpCLENBTGpCOztBQU9qQixlQUNJOztjQUFLLEtBQUksYUFBSixFQUFrQixXQUFVLCtDQUFWLEVBQXZCO1lBQ0ssMEJBQTBCLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsSUFBcUMsS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixFQUF4RjtTQUZULENBUGlCOzs7QUFyREosNkJBbUVqQiwyQkFBUzs7O0FBQ0wsZUFDSTs7eUJBQVMsS0FBSyxLQUFMO0FBQ0oscUJBQUksU0FBSjtBQUNBLDJCQUFXO0FBQ1AsZ0RBQTRCLElBQTVCO3VCQUNDLEtBQUssS0FBTCxDQUFXLFNBQVgsSUFBdUIsUUFBUSxLQUFLLEtBQUwsQ0FBVyxTQUFYLE9BRnpCLENBQVg7QUFJQSxzQkFBTSxJQUFOO0FBQ0EsNkJBQWEsSUFBYjtBQUNBLHNCQUFNLElBQU4sR0FSTDtZQVNLLEtBQUssa0JBQUwsRUFUTDtZQVVJLG9EQUFXLEtBQUssS0FBTCxDQUFXLFVBQVg7QUFDSixxQkFBSSxPQUFKO0FBQ0EsMkJBQVc7QUFDUCx3Q0FBb0IsSUFBcEI7d0JBQ0MsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixTQUF0QixJQUFrQyxRQUFRLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsUUFGcEMsQ0FBWDtBQUlBLDhCQUFjLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsWUFBdEIsSUFBc0MsS0FBSyxLQUFMLENBQVcsWUFBWDtBQUNwRCxzQkFBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLElBQThCLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDcEMsNkJBQWEsSUFBYjtBQUNBLHNCQUFNLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEIsSUFBOEIsS0FBSyxLQUFMLENBQVcsSUFBWDtBQUNwQyx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLElBQStCLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDdEMsd0JBQVEsS0FBSyxXQUFMO0FBQ1IseUJBQVMsS0FBSyxZQUFMO0FBQ1QseUJBQVMsS0FBSyxZQUFMLEdBYmhCLENBVko7U0FESixDQURLOzs7V0FuRVE7OztlQUNWLFlBQVk7QUFDZixrQkFBYyxpQkFBVSxNQUFWO0FBQ2QsNEJBQXdCLGlCQUFVLElBQVY7QUFDeEIsZ0JBQVksaUJBQVUsTUFBVjtBQUNaLFVBQU0saUJBQVUsTUFBVjtBQUNOLGlCQUFhLGlCQUFVLE1BQVY7QUFDYixVQUFNLGlCQUFVLE1BQVY7QUFDTixXQUFPLGlCQUFVLE1BQVY7O0FBUk0sZUFXVixlQUFlO0FBQ2xCLDRCQUF3QixLQUF4QjtBQUNBLGdCQUFZLEVBQVo7QUFDQSxVQUFNLElBQU47QUFDQSxpQkFBYSxFQUFiO0FBQ0EsVUFBTSxNQUFOOztrQkFoQmEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFVJVmlldyBmcm9tICcuLi9VSVZpZXcnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRleHR1YWxJbnB1dCBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBoaWRlUGxhY2Vob2xkZXJPbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGhpZGVQbGFjZWhvbGRlck9uRm9jdXM6IGZhbHNlLFxuICAgICAgICBpbnB1dFByb3BzOiB7fSxcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGlucHV0OiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSB8fCB0aGlzLnByb3BzLmlucHV0UHJvcHMuZGVmYXVsdFZhbHVlIHx8ICcnLFxuICAgICAgICBpc19mb2N1c2VkOiBmYWxzZSxcbiAgICB9XG5cbiAgICBoYW5kbGVfYmx1ciA9IGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNfZm9jdXNlZDogZmFsc2V9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlX2ZvY3VzID0gZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc19mb2N1c2VkOiB0cnVlfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLmlucHV0UHJvcHMub25Gb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pbnB1dFByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlX2lucHV0ID0gZXZlbnQgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMudmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dDogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5vbklucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlucHV0UHJvcHMub25JbnB1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJfcGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIC8qIElmIGEgY29udHJvbGxlZCBpbnB1dCAoYHByb3BzLnZhbHVlYCBiZWluZyBzZXQpLCBzaG93IHRoZSBwbGFjZWhvbGRlciBiYXNlZCBvbiB0aGF0IHN0YXRlICovXG4gICAgICAgIGNvbnN0IGlzX25vbl9lbXB0eSA9IHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlID09PSAnc3RyaW5nJyA/IEJvb2xlYW4odGhpcy5wcm9wcy52YWx1ZSkgOiBCb29sZWFuKHRoaXMuc3RhdGUuaW5wdXQpO1xuICAgICAgICBjb25zdCBzaG91bGRfc2hvd19wbGFjZWhvbGRlciA9ICAgdGhpcy5wcm9wcy5oaWRlUGxhY2Vob2xkZXJPbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmlzX2ZvY3VzZWQgPT09IGZhbHNlICYmIGlzX25vbl9lbXB0eSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzX25vbl9lbXB0eSA9PT0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPSdwbGFjZWhvbGRlcicgY2xhc3NOYW1lPSd1aS10ZXh0dWFsLWlucHV0IHVpLXRleHR1YWwtaW5wdXQtcGxhY2Vob2xkZXInPlxuICAgICAgICAgICAgICAgIHtzaG91bGRfc2hvd19wbGFjZWhvbGRlciA/IHRoaXMucHJvcHMuaW5wdXRQcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIDogJyd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgJ3VpLXRleHR1YWwtaW5wdXQtd3JhcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiBCb29sZWFuKHRoaXMucHJvcHMuY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG5hbWU9e251bGx9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtudWxsfVxuICAgICAgICAgICAgICAgICB0eXBlPXtudWxsfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJfcGxhY2Vob2xkZXIoKX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPSdmaWVsZCdcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndWktdGV4dHVhbC1pbnB1dCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZV06IEJvb2xlYW4odGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy5uYW1lIHx8IHRoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e251bGx9XG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy50eXBlIHx8IHRoaXMucHJvcHMudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuaW5wdXRQcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlX2JsdXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlX2ZvY3VzfVxuICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXt0aGlzLmhhbmRsZV9pbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==