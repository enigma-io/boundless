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

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hide content until it's needed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgressiveDisclosure
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgressiveDisclosure = function (_React$PureComponent) {
    _inherits(UIProgressiveDisclosure, _React$PureComponent);

    function UIProgressiveDisclosure() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onClick)) {
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if ((0, _isFunction2.default)(_this.props.toggleProps.onKeyDown)) {
                _this.props.toggleProps.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIProgressiveDisclosure.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({ expanded: newProps.expanded }, this.dispatchCallback);
        }
    };

    UIProgressiveDisclosure.prototype.renderContent = function renderContent() {
        if (this.state.expanded) {
            return _react2.default.createElement(
                'div',
                { ref: 'content',
                    className: 'ui-disclosure-content' },
                this.props.children
            );
        }
    };

    UIProgressiveDisclosure.prototype.render = function render() {
        var _cx, _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, (0, _lodash2.default)(this.props, UIProgressiveDisclosure.internalKeys), {
                ref: 'wrapper',
                className: (0, _classnames2.default)((_cx = {
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded
                }, _cx[this.props.className] = !!this.props.className, _cx)) }),
            _react2.default.createElement(
                'div',
                _extends({}, this.props.toggleProps, {
                    ref: 'toggle',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-disclosure-toggle': true
                    }, _cx2[this.props.toggleProps.className] = !!this.props.toggleProps.className, _cx2)),
                    onClick: this.handleClick,
                    onKeyDown: this.handleKeyDown,
                    tabIndex: '0' }),
                this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser
            ),
            this.renderContent()
        );
    };

    return UIProgressiveDisclosure;
}(_react2.default.PureComponent);

UIProgressiveDisclosure.propTypes = {
    children: _react2.default.PropTypes.node,
    expanded: _react2.default.PropTypes.bool,
    onExpand: _react2.default.PropTypes.func,
    onHide: _react2.default.PropTypes.func,
    teaser: _react2.default.PropTypes.node,
    teaserExpanded: _react2.default.PropTypes.node,
    toggleProps: _react2.default.PropTypes.object
};
UIProgressiveDisclosure.internalKeys = Object.keys(UIProgressiveDisclosure.propTypes);
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBVkE7Ozs7O0lBWXFCLHVCOzs7Ozs7Ozs7Ozs7b0tBb0JqQixLLEdBQVE7QUFDSixzQkFBVSxNQUFLLEtBQUwsQ0FBVztBQURqQixTLFFBVVIsZ0IsR0FBbUIsWUFBTTtBQUNyQixrQkFBSyxLQUFMLENBQVcsTUFBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixVQUF0QixHQUFtQyxRQUE5QztBQUNILFMsUUFFRCxXLEdBQWMsVUFBQyxLQUFELEVBQVc7QUFDckIsa0JBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxDQUFDLE1BQUssS0FBTCxDQUFXLFFBQXZCLEVBQWQsRUFBZ0QsTUFBSyxnQkFBckQ7O0FBRUE7QUFDQSxnQkFBSSwwQkFBVyxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLE9BQWxDLENBQUosRUFBZ0Q7QUFDNUMsc0JBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsT0FBdkIsQ0FBK0IsS0FBL0I7QUFDSDtBQUNKLFMsUUFFRCxhLEdBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3ZCLG9CQUFRLE1BQU0sR0FBZDtBQUNBLHFCQUFLLE9BQUw7QUFDSSwwQkFBTSxjQUFOO0FBQ0EsMEJBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxDQUFDLE1BQUssS0FBTCxDQUFXLFFBQXZCLEVBQWQsRUFBZ0QsTUFBSyxnQkFBckQ7QUFISjs7QUFNQTtBQUNBLGdCQUFJLDBCQUFXLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBbEMsQ0FBSixFQUFrRDtBQUM5QyxzQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxLQUFqQztBQUNIO0FBQ0osUzs7O3NDQTlCRCx5QixzQ0FBMEIsUSxFQUFVO0FBQ2hDLFlBQUksU0FBUyxRQUFULEtBQXNCLEtBQUssS0FBTCxDQUFXLFFBQXJDLEVBQStDO0FBQzNDLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQVUsU0FBUyxRQUFwQixFQUFkLEVBQTZDLEtBQUssZ0JBQWxEO0FBQ0g7QUFDSixLOztzQ0E0QkQsYSw0QkFBZ0I7QUFDWixZQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDckIsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLEtBQUksU0FBVDtBQUNLLCtCQUFVLHVCQURmO0FBRUsscUJBQUssS0FBTCxDQUFXO0FBRmhCLGFBREo7QUFNSDtBQUNKLEs7O3NDQUVELE0scUJBQVM7QUFBQTs7QUFDTCxlQUNJO0FBQUE7QUFBQSx5QkFDUSxzQkFBSyxLQUFLLEtBQVYsRUFBaUIsd0JBQXdCLFlBQXpDLENBRFI7QUFFSSxxQkFBSSxTQUZSO0FBR0ksMkJBQVc7QUFDUixxQ0FBaUIsSUFEVDtBQUVSLDhDQUEwQixLQUFLLEtBQUwsQ0FBVztBQUY3Qix1QkFHUCxLQUFLLEtBQUwsQ0FBVyxTQUhKLElBR2dCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxTQUg3QixPQUhmO0FBU0k7QUFBQTtBQUFBLDZCQUNRLEtBQUssS0FBTCxDQUFXLFdBRG5CO0FBRUkseUJBQUksUUFGUjtBQUdJLCtCQUFXO0FBQ1IsZ0RBQXdCO0FBRGhCLDRCQUVQLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FGaEIsSUFFNEIsQ0FBQyxDQUFDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FGckQsUUFIZjtBQU9JLDZCQUFTLEtBQUssV0FQbEI7QUFRSSwrQkFBVyxLQUFLLGFBUnBCO0FBU0ksOEJBQVMsR0FUYjtBQVVLLHFCQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsS0FBSyxLQUFMLENBQVcsTUFBOUQsR0FBdUUsS0FBSyxLQUFMLENBQVc7QUFWdkYsYUFUSjtBQXNCSyxpQkFBSyxhQUFMO0FBdEJMLFNBREo7QUEwQkgsSzs7O0VBOUZnRCxnQkFBTSxhOztBQUF0Qyx1QixDQUNWLFMsR0FBWTtBQUNmLGNBQVUsZ0JBQU0sU0FBTixDQUFnQixJQURYO0FBRWYsY0FBVSxnQkFBTSxTQUFOLENBQWdCLElBRlg7QUFHZixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFIWDtBQUlmLFlBQVEsZ0JBQU0sU0FBTixDQUFnQixJQUpUO0FBS2YsWUFBUSxnQkFBTSxTQUFOLENBQWdCLElBTFQ7QUFNZixvQkFBZ0IsZ0JBQU0sU0FBTixDQUFnQixJQU5qQjtBQU9mLGlCQUFhLGdCQUFNLFNBQU4sQ0FBZ0I7QUFQZCxDO0FBREYsdUIsQ0FXVixZLEdBQWUsT0FBTyxJQUFQLENBQVksd0JBQXdCLFNBQXBDLEM7QUFYTCx1QixDQWFWLFksR0FBZTtBQUNsQixjQUFVLEtBRFE7QUFFbEIsNEJBRmtCO0FBR2xCLDBCQUhrQjtBQUlsQixpQkFBYTtBQUpLLEM7a0JBYkwsdUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhpZGUgY29udGVudCB1bnRpbCBpdCdzIG5lZWRlZC5cbiAqIEBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZVxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByb2dyZXNzaXZlRGlzY2xvc3VyZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBvbkV4cGFuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uSGlkZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRlYXNlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRlYXNlckV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgICAgIG9uSGlkZTogbm9vcCxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25DbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSd3cmFwcGVyJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS1leHBhbmRlZCc6IHRoaXMuc3RhdGUuZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICB9KX0+XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnRvZ2dsZVByb3BzfVxuICAgICAgICAgICAgICAgICAgICByZWY9J3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLXRvZ2dsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==