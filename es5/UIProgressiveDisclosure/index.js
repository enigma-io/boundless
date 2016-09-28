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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIiwic3RhdGUiLCJleHBhbmRlZCIsInByb3BzIiwiZGlzcGF0Y2hDYWxsYmFjayIsImhhbmRsZUNsaWNrIiwiZXZlbnQiLCJzZXRTdGF0ZSIsInRvZ2dsZVByb3BzIiwib25DbGljayIsImhhbmRsZUtleURvd24iLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5RG93biIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInJlbmRlckNvbnRlbnQiLCJjaGlsZHJlbiIsInJlbmRlciIsImludGVybmFsS2V5cyIsImNsYXNzTmFtZSIsInRlYXNlckV4cGFuZGVkIiwidGVhc2VyIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm5vZGUiLCJib29sIiwib25FeHBhbmQiLCJmdW5jIiwib25IaWRlIiwib2JqZWN0IiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFWQTs7Ozs7SUFZcUJBLHVCOzs7Ozs7Ozs7Ozs7b0tBb0JqQkMsSyxHQUFRO0FBQ0pDLHNCQUFVLE1BQUtDLEtBQUwsQ0FBV0Q7QUFEakIsUyxRQVVSRSxnQixHQUFtQixZQUFNO0FBQ3JCLGtCQUFLRCxLQUFMLENBQVcsTUFBS0YsS0FBTCxDQUFXQyxRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLFFBQTlDO0FBQ0gsUyxRQUVERyxXLEdBQWMsVUFBQ0MsS0FBRCxFQUFXO0FBQ3JCLGtCQUFLQyxRQUFMLENBQWMsRUFBQ0wsVUFBVSxDQUFDLE1BQUtELEtBQUwsQ0FBV0MsUUFBdkIsRUFBZCxFQUFnRCxNQUFLRSxnQkFBckQ7O0FBRUE7QUFDQSxnQkFBSSwwQkFBVyxNQUFLRCxLQUFMLENB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QUVsQjBCLDRCQUZrQjtBQUdsQkUsMEJBSGtCO0FBSWxCdEIsaUJBQWE7QUFKSyxDO2tCQWJMUix1QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSGlkZSBjb250ZW50IHVudGlsIGl0J3MgbmVlZGVkLlxuICogQGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUHJvZ3Jlc3NpdmVEaXNjbG9zdXJlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBleHBhbmRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uRXhwYW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25IaWRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgdGVhc2VyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgdGVhc2VyRXhwYW5kZWQ6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICB0b2dnbGVQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICBvbkV4cGFuZDogbm9vcCxcbiAgICAgICAgb25IaWRlOiBub29wLFxuICAgICAgICB0b2dnbGVQcm9wczoge30sXG4gICAgfVxuXG4gICAgc3RhdGUgPSB7XG4gICAgICAgIGV4cGFuZGVkOiB0aGlzLnByb3BzLmV4cGFuZGVkLFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmV4cGFuZGVkICE9PSB0aGlzLnByb3BzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmRlZDogbmV3UHJvcHMuZXhwYW5kZWR9LCB0aGlzLmRpc3BhdGNoQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGF0Y2hDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnN0YXRlLmV4cGFuZGVkID8gJ29uRXhwYW5kJyA6ICdvbkhpZGUnXSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVQcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2V4cGFuZGVkOiAhdGhpcy5zdGF0ZS5leHBhbmRlZH0sIHRoaXMuZGlzcGF0Y2hDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLnRvZ2dsZVByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG9nZ2xlUHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPSdjb250ZW50J1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSd1aS1kaXNjbG9zdXJlLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlQcm9ncmVzc2l2ZURpc2Nsb3N1cmUuaW50ZXJuYWxLZXlzKX1cbiAgICAgICAgICAgICAgICByZWY9J3dyYXBwZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICd1aS1kaXNjbG9zdXJlLWV4cGFuZGVkJzogdGhpcy5zdGF0ZS5leHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudG9nZ2xlUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj0ndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpc2Nsb3N1cmUtdG9nZ2xlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMudG9nZ2xlUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLnRvZ2dsZVByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmV4cGFuZGVkID8gdGhpcy5wcm9wcy50ZWFzZXJFeHBhbmRlZCB8fCB0aGlzLnByb3BzLnRlYXNlciA6IHRoaXMucHJvcHMudGVhc2VyfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19