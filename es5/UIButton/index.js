'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require('../UIUtils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _omit = require('../UIUtils/omit');

var _omit2 = _interopRequireDefault(_omit);

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
            _extends({}, (0, _omit2.default)(this.props, UIButton.internalKeys), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQnV0dG9uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixROzs7Ozs7Ozs7Ozs7b0tBb0JqQixXLEdBQWMsVUFBQyxLQUFELEVBQVc7QUFDckIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBZixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLGtCQUFLLFdBQUwsQ0FBaUIsS0FBakI7O0FBRUEsZ0JBQUksMEJBQVcsTUFBSyxLQUFMLENBQVcsT0FBdEIsQ0FBSixFQUFvQztBQUNoQyxzQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFuQjtBQUNIO0FBQ0osUyxRQUVELGEsR0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDdkIsZ0JBQUksTUFBSyxLQUFMLENBQVcsUUFBZixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLG9CQUFRLE1BQU0sR0FBZDtBQUNBLHFCQUFLLE9BQUw7QUFDQSxxQkFBSyxPQUFMO0FBQ0ksMEJBQU0sY0FBTjtBQUNBLDBCQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFKSjs7QUFPQSxnQkFBSSwwQkFBVyxNQUFLLEtBQUwsQ0FBVyxTQUF0QixDQUFKLEVBQXNDO0FBQ2xDLHNCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEtBQXJCO0FBQ0g7QUFDSixTOzs7dUJBM0JELFcsd0JBQVksSyxFQUFPO0FBQ2YsYUFBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixhQUFyQixHQUFxQyxXQUFoRCxFQUE2RCxLQUE3RDtBQUNILEs7O3VCQTJCRCxNLHFCQUFTO0FBQUE7O0FBQ0wsZUFDSTtBQUFBO0FBQUEseUJBQ1Esb0JBQUssS0FBSyxLQUFWLEVBQWlCLFNBQVMsWUFBMUIsQ0FEUjtBQUVJLHFCQUFJLFFBRlI7QUFHSSwyQkFBVztBQUNQLGlDQUFhLElBRE47QUFFUCwyQ0FBdUIsT0FBTyxLQUFLLEtBQUwsQ0FBVyxPQUFsQixLQUE4QixXQUY5QztBQUdQLHlDQUFxQixLQUFLLEtBQUwsQ0FBVztBQUh6Qix1QkFJTixLQUFLLEtBQUwsQ0FBVyxTQUpMLElBSWlCLENBQUMsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxTQUo5QixPQUhmO0FBU0ksZ0NBQWMsS0FBSyxLQUFMLENBQVcsT0FUN0I7QUFVSSwyQkFBVyxLQUFLLGFBVnBCO0FBV0kseUJBQVMsS0FBSyxXQVhsQjtBQVlLLGlCQUFLLEtBQUwsQ0FBVztBQVpoQixTQURKO0FBZ0JILEs7OztFQTlEaUMsZ0JBQU0sYTs7QUFBdkIsUSxDQUNWLFMsR0FBWTtBQUNmLGNBQVUsZ0JBQU0sU0FBTixDQUFnQixJQURYO0FBRWYsYUFBUyxnQkFBTSxTQUFOLENBQWdCLElBRlY7QUFHZixlQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsSUFIWjtBQUlmLGlCQUFhLGdCQUFNLFNBQU4sQ0FBZ0IsSUFKZDtBQUtmLGFBQVMsZ0JBQU0sU0FBTixDQUFnQjtBQUxWLEM7QUFERixRLENBU1YsWSxHQUFlLE9BQU8sSUFBUCxDQUFZLFNBQVMsU0FBckIsQztBQVRMLFEsQ0FXVixZLEdBQWU7QUFDbEIsNkJBRGtCO0FBRWxCO0FBRmtCLEM7a0JBWEwsUSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IG9taXQgZnJvbSAnLi4vVUlVdGlscy9vbWl0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvblVucHJlc3NlZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHByZXNzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIH07XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlCdXR0b24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgb25QcmVzc2VkOiBub29wLFxuICAgICAgICBvblVucHJlc3NlZDogbm9vcCxcbiAgICB9O1xuXG4gICAgdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wc1t0aGlzLnByb3BzLnByZXNzZWQgPyAnb25VbnByZXNzZWQnIDogJ29uUHJlc3NlZCddKGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0YXRlKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMucHJvcHMub25LZXlEb3duKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJQnV0dG9uLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgcmVmPSdidXR0b24nXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzYWJsZSc6IHR5cGVvZiB0aGlzLnByb3BzLnByZXNzZWQgIT09ICd1bmRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXByZXNzZWQnOiB0aGlzLnByb3BzLnByZXNzZWQsXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgYXJpYS1wcmVzc2VkPXt0aGlzLnByb3BzLnByZXNzZWR9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=