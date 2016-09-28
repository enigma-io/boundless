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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIButton = function (_React$PureComponent) {
    _inherits(UIButton, _React$PureComponent);

    function UIButton() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (_this.props.disabled) {
                return;
            }

            _this.toggleState(event);

            if ((0, _isFunction2.default)(_this.props.onClick)) {
                _this.props.onClick(event);
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.disabled) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case 'Space':
                    event.preventDefault();
                    _this.toggleState(event);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIButton.prototype.toggleState = function toggleState(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    };

    UIButton.prototype.render = function render() {
        var _cx;

        return _react2.default.createElement(
            'button',
            _extends({}, (0, _lodash2.default)(this.props, UIButton.internalKeys), {
                ref: 'button',
                className: (0, _classnames2.default)((_cx = {
                    'ui-button': true,
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed
                }, _cx[this.props.className] = !!this.props.className, _cx)),
                'aria-pressed': this.props.pressed,
                onKeyDown: this.handleKeyDown,
                onClick: this.handleClick }),
            this.props.children
        );
    };

    return UIButton;
}(_react2.default.PureComponent);

UIButton.propTypes = {
    children: _react2.default.PropTypes.node,
    onClick: _react2.default.PropTypes.func,
    onPressed: _react2.default.PropTypes.func,
    onUnpressed: _react2.default.PropTypes.func,
    pressed: _react2.default.PropTypes.bool
};
UIButton.internalKeys = Object.keys(UIButton.propTypes);
UIButton.defaultProps = {
    onPressed: _noop2.default,
    onUnpressed: _noop2.default
};
exports.default = UIButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQnV0dG9uL2luZGV4LmpzIl0sIm5hbWVzIjpbIlVJQnV0dG9uIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInByb3BzIiwiZGlzYWJsZWQiLCJ0b2dnbGVTdGF0ZSIsIm9uQ2xpY2siLCJoYW5kbGVLZXlEb3duIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJvbktleURvd24iLCJwcmVzc2VkIiwicmVuZGVyIiwiaW50ZXJuYWxLZXlzIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwibm9kZSIsImZ1bmMiLCJvblByZXNzZWQiLCJvblVucHJlc3NlZCIsImJvb2wiLCJPYmplY3QiLCJrZXlzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7OztvS0FvQmpCQyxXLEdBQWMsVUFBQ0MsS0FBRCxFQUFXO0FBQ3JCLGdCQUFJLE1BQUtDLEtBQUwsQ0FBV0MsUUFBZixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLGtCQUFLQyxXQUFMLENBQWlCSCxLQUFqQjs7QUFFQSxnQkFBSSwwQkFBVyxNQUFLQyxLQUFMLENBQVdHLE9BQXRCLENBQUosRUFBb0M7QUFDaEMsc0JBQUtILEtBQUwsQ0FBV0csT0FBWCxDQUFtQkosS0FBbkI7QUFDSDtBQUNKLFMsUUFFREssYSxHQUFnQixVQUFDTCxLQUFELEVBQVc7QUFDdkIsZ0JBQUksTUFBS0MsS0FBTCxDQUFXQyxRQUFmLEVBQXlCO0FBQUU7QUFBUzs7QUFFcEMsb0JBQVFGLE1BQU1NLEdBQWQ7QUFDQSxxQkFBSyxPQUFMO0FBQ0EscUJBQUssT0FBTDtBQUNJTiwwQkFBTU8sY0FBTjtBQUNBLDBCQUFLSixXQUFMLENBQWlCSCxLQUFqQjtBQUpKOztBQU9BLGdCQUFJLDBCQUFXLE1BQUtDLEtBQUwsQ0FBV08sU0FBdEIsQ0FBSixFQUFzQztBQUNsQyxzQkFBS1AsS0FBTCxDQUFXTyxTQUFYLENBQXFCUixLQUFyQjtBQUNIO0FBQ0osUzs7O3VCQTNCREcsVyx3QkFBWUgsSyxFQUFPO0FBQ2YsYUFBS0MsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV1EsT0FBWCxHQUFxQixhQUFyQixHQUFxQyxXQUFoRCxFQUE2RFQsS0FBN0Q7QUFDSCxLOzt1QkEyQkRVLE0scUJBQVM7QUFBQTs7QUFDTCxlQUNJO0FBQUE7QUFBQSx5QkFDUSxzQkFBSyxLQUFLVCxLQUFWLEVBQWlCSCxTQUFTYSxZQUExQixDQURSO0FBRUkscUJBQUksUUFGUjtBQUdJLDJCQUFXO0FBQ1AsaUNBQWEsSUFETjtBQUVQLDJDQUF1QixPQUFPLEtBQUtWLEtBQUwsQ0FBV1EsT0FBbEIsS0FBOEIsV0FGOUM7QUFHUCx5Q0FBcUIsS0FBS1IsS0FBTCxDQUFXUTtBQUh6Qix1QkFJTixLQUFLUixLQUFMLENBQVdXLFNBSkwsSUFJaUIsQ0FBQyxDQUFDLEtBQUtYLEtBQUwsQ0FBV1csU0FKOUIsT0FIZjtBQVNJLGdDQUFjLEtBQUtYLEtBQUwsQ0FBV1EsT0FUN0I7QUFVSSwyQkFBVyxLQUFLSixhQVZwQjtBQVdJLHlCQUFTLEtBQUtOLFdBWGxCO0FBWUssaUJBQUtFLEtBQUwsQ0FBV1k7QUFaaEIsU0FESjtBQWdCSCxLOzs7RUE5RGlDLGdCQUFNQyxhOztBQUF2QmhCLFEsQ0FDVmlCLFMsR0FBWTtBQUNmRixjQUFVLGdCQUFNRyxTQUFOLENBQWdCQyxJQURYO0FBRWZiLGFBQVMsZ0JBQU1ZLFNBQU4sQ0FBZ0JFLElBRlY7QUFHZkMsZUFBVyxnQkFBTUgsU0FBTixDQUFnQkUsSUFIWjtBQUlmRSxpQkFBYSxnQkFBTUosU0FBTixDQUFnQkUsSUFKZDtBQUtmVCxhQUFTLGdCQUFNTyxTQUFOLENBQWdCSztBQUxWLEM7QUFERnZCLFEsQ0FTVmEsWSxHQUFlVyxPQUFPQyxJQUFQLENBQVl6QixTQUFTaUIsU0FBckIsQztBQVRMakIsUSxDQVdWMEIsWSxHQUFlO0FBQ2xCTCw2QkFEa0I7QUFFbEJDO0FBRmtCLEM7a0JBWEx0QixRIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25QcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25VbnByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBwcmVzc2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGludGVybmFsS2V5cyA9IE9iamVjdC5rZXlzKFVJQnV0dG9uLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIG9uUHJlc3NlZDogbm9vcCxcbiAgICAgICAgb25VbnByZXNzZWQ6IG5vb3AsXG4gICAgfTtcblxuICAgIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5wcmVzc2VkID8gJ29uVW5wcmVzc2VkJyA6ICdvblByZXNzZWQnXShldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkNsaWNrKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdGF0ZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSUJ1dHRvbi5pbnRlcm5hbEtleXMpfVxuICAgICAgICAgICAgICAgIHJlZj0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2FibGUnOiB0eXBlb2YgdGhpcy5wcm9wcy5wcmVzc2VkICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1wcmVzc2VkJzogdGhpcy5wcm9wcy5wcmVzc2VkLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dGhpcy5wcm9wcy5wcmVzc2VkfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19