'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hide content until it's needed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIProgressiveDisclosure
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIProgressiveDisclosure = function (_UIView) {
    _inherits(UIProgressiveDisclosure, _UIView);

    function UIProgressiveDisclosure() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIProgressiveDisclosure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            expanded: _this.props.expanded
        }, _this.dispatchCallback = function () {
            _this.props[_this.state.expanded ? 'onExpand' : 'onHide']();
        }, _this.handleClick = function (event) {
            _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);

            /* istanbul ignore else */
            if (typeof _this.props.toggleProps.onClick === 'function') {
                event.persist();
                _this.props.toggleProps.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    _this.setState({ expanded: !_this.state.expanded }, _this.dispatchCallback);
            }

            /* istanbul ignore else */
            if (typeof _this.props.toggleProps.onKeyDown === 'function') {
                event.persist();
                _this.props.toggleProps.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIProgressiveDisclosure.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({ expanded: newProps.expanded }, this.dispatchCallback);
        }
    };

    UIProgressiveDisclosure.prototype.render = function render() {
        var _cx, _cx2;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
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
            _react2.default.createElement(
                'div',
                { ref: 'content',
                    className: 'ui-disclosure-content' },
                this.props.children
            )
        );
    };

    return UIProgressiveDisclosure;
}(_UIView3.default);

UIProgressiveDisclosure.propTypes = {
    children: _react2.default.PropTypes.node,
    expanded: _react2.default.PropTypes.bool,
    onExpand: _react2.default.PropTypes.func,
    onHide: _react2.default.PropTypes.func,
    teaser: _react2.default.PropTypes.node,
    teaserExpanded: _react2.default.PropTypes.node,
    toggleProps: _react2.default.PropTypes.object
};
UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: _noop2.default,
    onHide: _noop2.default,
    toggleProps: {}
};
exports.default = UIProgressiveDisclosure;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVxQjs7Ozs7Ozs7Ozs7OzBJQWtCakIsUUFBUTtBQUNKLHNCQUFVLE1BQUssS0FBTCxDQUFXLFFBQVg7aUJBU2QsbUJBQW1CLFlBQU07QUFDckIsa0JBQUssS0FBTCxDQUFXLE1BQUssS0FBTCxDQUFXLFFBQVgsR0FBc0IsVUFBdEIsR0FBbUMsUUFBbkMsQ0FBWCxHQURxQjtTQUFOLFFBSW5CLGNBQWMsVUFBQyxLQUFELEVBQVc7QUFDckIsa0JBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxDQUFDLE1BQUssS0FBTCxDQUFXLFFBQVgsRUFBMUIsRUFBZ0QsTUFBSyxnQkFBTCxDQUFoRDs7O0FBRHFCLGdCQUlqQixPQUFPLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsT0FBdkIsS0FBbUMsVUFBMUMsRUFBc0Q7QUFDdEQsc0JBQU0sT0FBTixHQURzRDtBQUV0RCxzQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixPQUF2QixDQUErQixLQUEvQixFQUZzRDthQUExRDtTQUpVLFFBVWQsZ0JBQWdCLFVBQUMsS0FBRCxFQUFXO0FBQ3ZCLG9CQUFRLE1BQU0sR0FBTjtBQUNSLHFCQUFLLE9BQUw7QUFDSSwwQkFBTSxjQUFOLEdBREo7QUFFSSwwQkFBSyxRQUFMLENBQWMsRUFBQyxVQUFVLENBQUMsTUFBSyxLQUFMLENBQVcsUUFBWCxFQUExQixFQUFnRCxNQUFLLGdCQUFMLENBQWhELENBRko7QUFEQTs7O0FBRHVCLGdCQVFuQixPQUFPLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsS0FBcUMsVUFBNUMsRUFBd0Q7QUFDeEQsc0JBQU0sT0FBTixHQUR3RDtBQUV4RCxzQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxLQUFqQyxFQUZ3RDthQUE1RDtTQVJZOzs7QUExQ0Msc0NBc0JqQiwrREFBMEIsVUFBVTtBQUNoQyxZQUFJLFNBQVMsUUFBVCxLQUFzQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQzNDLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQVUsU0FBUyxRQUFULEVBQXpCLEVBQTZDLEtBQUssZ0JBQUwsQ0FBN0MsQ0FEMkM7U0FBL0M7OztBQXZCYSxzQ0F3RGpCLDJCQUFTOzs7QUFDTCxlQUNJOzt5QkFBUyxLQUFLLEtBQUw7QUFDSixxQkFBSSxTQUFKO0FBQ0EsMkJBQVc7QUFDUixxQ0FBaUIsSUFBakI7QUFDQSw4Q0FBMEIsS0FBSyxLQUFMLENBQVcsUUFBWDt1QkFDekIsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF1QixDQUFDLENBQUMsS0FBSyxLQUFMLENBQVcsU0FBWCxNQUhsQixDQUFYLEdBRkw7WUFPSTs7NkJBQVMsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNKLHlCQUFJLFFBQUo7QUFDQSwrQkFBVztBQUNSLGdEQUF3QixJQUF4Qjs0QkFDQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLElBQW1DLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLE9BRjlCLENBQVg7QUFJQSw2QkFBUyxLQUFLLFdBQUw7QUFDVCwrQkFBVyxLQUFLLGFBQUw7QUFDWCw4QkFBUyxHQUFULEdBUkw7Z0JBU0ssS0FBSyxLQUFMLENBQVcsUUFBWCxHQUFzQixLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsS0FBSyxLQUFMLENBQVcsTUFBWDthQWhCaEY7WUFrQkk7O2tCQUFLLEtBQUksU0FBSjtBQUNBLCtCQUFVLHVCQUFWLEVBREw7Z0JBRUssS0FBSyxLQUFMLENBQVcsUUFBWDthQXBCVDtTQURKLENBREs7OztXQXhEUTs7O3dCQUNWLFlBQVk7QUFDZixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDVixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDVixjQUFVLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDVixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDUixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDUixvQkFBZ0IsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNoQixpQkFBYSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztBQVJBLHdCQVdWLGVBQWU7QUFDbEIsY0FBVSxLQUFWO0FBQ0EsNEJBRmtCO0FBR2xCLDBCQUhrQjtBQUlsQixpQkFBYSxFQUFiOztrQkFmYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGV4cGFuZGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25FeHBhbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0ZWFzZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0ZWFzZXJFeHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIHRvZ2dsZVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgb25FeHBhbmQ6IG5vb3AsXG4gICAgICAgIG9uSGlkZTogbm9vcCxcbiAgICAgICAgdG9nZ2xlUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBleHBhbmRlZDogdGhpcy5wcm9wcy5leHBhbmRlZCxcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5leHBhbmRlZCAhPT0gdGhpcy5wcm9wcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6IG5ld1Byb3BzLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5zdGF0ZS5leHBhbmRlZCA/ICdvbkV4cGFuZCcgOiAnb25IaWRlJ10oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogIXRoaXMuc3RhdGUuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXhwYW5kZWQ6ICF0aGlzLnN0YXRlLmV4cGFuZGVkfSwgdGhpcy5kaXNwYXRjaENhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nd3JhcHBlcidcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtZXhwYW5kZWQnOiB0aGlzLnN0YXRlLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy50b2dnbGVQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlzY2xvc3VyZS10b2dnbGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucHJvcHMudGVhc2VyRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy50ZWFzZXIgOiB0aGlzLnByb3BzLnRlYXNlcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj0nY29udGVudCdcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndWktZGlzY2xvc3VyZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=