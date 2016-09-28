'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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

var UIArrowKeyNavigation = function (_React$PureComponent) {
    _inherits(UIArrowKeyNavigation, _React$PureComponent);

    function UIArrowKeyNavigation() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
            activeChildIndex: null
        }, _this.handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    event.preventDefault();
                    _this.moveFocus(-1);
                    break;

                case 'ArrowDown':
                case 'ArrowRight':
                    event.preventDefault();
                    _this.moveFocus(1);
                    break;
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIArrowKeyNavigation.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== null) {
            var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

            if (numChildren === 0) {
                this.setState({ activeChildIndex: null }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setState({ activeChildIndex: numChildren - 1 }); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                this.setFocus(this.state.activeChildIndex);
            }
        }
    };

    UIArrowKeyNavigation.prototype.setFocus = function setFocus(index) {
        var childNode = (this.refs.wrapper instanceof HTMLElement ? this.refs.wrapper : (0, _reactDom.findDOMNode)(this.refs.wrapper)).children[index];

        if (childNode && childNode.getAttribute('tabindex') === '-1') {
            this.moveFocus(childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        } else if (childNode && document.activeElement !== childNode) {
            childNode.focus();
        }
    };

    UIArrowKeyNavigation.prototype.moveFocus = function moveFocus(delta) {
        var numChildren = this.props.children ? Array.prototype.concat(this.props.children).length : 0;

        var nextIndex = this.state.activeChildIndex + delta;

        if (nextIndex >= numChildren) {
            nextIndex = 0; // loop
        } else if (nextIndex < 0) {
            nextIndex = numChildren - 1; // reverse loop
        }

        this.setState({ activeChildIndex: nextIndex });
    };

    UIArrowKeyNavigation.prototype.handleChildBlur = function handleChildBlur(index, child, event) {
        if (this.state.activeChildIndex === index) {
            this.setState({ activeChildIndex: null });
        }

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onBlur)) {
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (!(0, _isString2.default)(child) && (0, _isFunction2.default)(child.props.onFocus)) {
            child.props.onFocus(event);
        }
    };

    UIArrowKeyNavigation.prototype.children = function children() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.props.tabIndex !== undefined ? child.props.tabIndex : 0,
                onBlur: _this2.handleChildBlur.bind(_this2, index, child),
                onFocus: _this2.handleChildFocus.bind(_this2, index, child)
            });
        });
    };

    UIArrowKeyNavigation.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, _extends({}, (0, _lodash2.default)(this.props, UIArrowKeyNavigation.internalKeys), {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_react2.default.PureComponent);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.internalKeys = Object.keys(UIArrowKeyNavigation.propTypes);
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIl0sIm5hbWVzIjpbIlVJQXJyb3dLZXlOYXZpZ2F0aW9uIiwic3RhdGUiLCJhY3RpdmVDaGlsZEluZGV4IiwiaGFuZGxlS2V5RG93biIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJtb3ZlRm9jdXMiLCJwcm9wcyIsIm9uS2V5RG93biIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsIm51bUNoaWxkcmVuIiwiY2hpbGRyZW4iLCJBcnJheSIsInByb3RvdHlwZSIsImNvbmNhdCIsImxlbmd0aCIsInNldFN0YXRlIiwic2V0Rm9jdXMiLCJpbmRleCIsImNoaWxkTm9kZSIsInJlZnMiLCJ3cmFwcGVyIiwiSFRNTEVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIk5vZGUiLCJET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkciLCJmb2N1cyIsImRlbHRhIiwibmV4dEluZGV4IiwiaGFuZGxlQ2hpbGRCbHVyIiwiY2hpbGQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkJsdXIiLCJoYW5kbGVDaGlsZEZvY3VzIiwib25Gb2N1cyIsIkNoaWxkcmVuIiwibWFwIiwiY2xvbmVFbGVtZW50IiwidGFiSW5kZXgiLCJ1bmRlZmluZWQiLCJiaW5kIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsImNvbXBvbmVudCIsImludGVybmFsS2V5cyIsInJlZiIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJmdW5jIiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7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QyxFQUF1Q2UsS0FBdkMsQ0FIcUI7QUFJN0JJLHlCQUFTLE9BQUtELGdCQUFMLENBQXNCTyxJQUF0QixTQUFpQ3pCLEtBQWpDLEVBQXdDZSxLQUF4QztBQUpvQixhQUExQixDQUFQO0FBTUgsU0FQTSxDQUFQO0FBUUgsSzs7bUNBRURXLE0scUJBQVM7QUFDTCxlQUFPLGdCQUFNQyxhQUFOLENBQW9CLEtBQUt4QyxLQUFMLENBQVd5QyxTQUEvQixlQUNBLHNCQUFLLEtBQUt6QyxLQUFWLEVBQWlCUixxQkFBcUJrRCxZQUF0QyxDQURBO0FBRUhDLGlCQUFLLFNBRkY7QUFHSDFDLHVCQUFXLEtBQUtOO0FBSGIsWUFJSixLQUFLVyxRQUFMLEVBSkksQ0FBUDtBQUtILEs7OztFQTdINkMsZ0JBQU1zQyxhOztBQUFuQ3BELG9CLENBQ1ZxRCxTLEdBQVk7QUFDZkosZUFBVyxnQkFBTUssU0FBTixDQUFnQkMsU0FBaEIsQ0FBMEIsQ0FDakMsZ0JBQU1ELFNBQU4sQ0FBZ0JFLE1BRGlCLEVBRWpDLGdCQUFNRixTQUFOLENBQWdCRyxJQUZpQixDQUExQjtBQURJLEM7QUFERnpELG9CLENBUVZrRCxZLEdBQWVRLE9BQU9DLElBQVAsQ0FBWTNELHFCQUFxQnFELFNBQWpDLEM7QUFSTHJELG9CLENBVVY0RCxZLEdBQWU7QUFDbEJYLGVBQVc7QUFETyxDO2tCQVZMakQsb0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBvbWl0IGZyb20gJ2xvZGFzaC5vbWl0JztcblxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vVUlVdGlscy9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9VSVV0aWxzL2lzU3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlBcnJvd0tleU5hdmlnYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlBcnJvd0tleU5hdmlnYXRpb24ucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgY29tcG9uZW50OiAnZGl2JyxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgYWN0aXZlQ2hpbGRJbmRleDogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKG51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCA+PSBudW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG51bUNoaWxkcmVuIC0gMX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCAhPT0gcHJldlN0YXRlLmFjdGl2ZUNoaWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2N1cyhpbmRleCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSAoXG4gICAgICAgICAgICB0aGlzLnJlZnMud3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyB0aGlzLnJlZnMud3JhcHBlclxuICAgICAgICAgIDogZmluZERPTU5vZGUodGhpcy5yZWZzLndyYXBwZXIpXG4gICAgICAgICkuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gJy0xJykge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoXG4gICAgICAgICAgICAgICAgY2hpbGROb2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICYgTm9kZS5ET0NVTUVOVF9QT1NJVElPTl9GT0xMT1dJTkcgPyAtMSA6IDFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGROb2RlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgY2hpbGROb2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRm9jdXMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbnVtQ2hpbGRyZW4gPSAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgbGV0IG5leHRJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlQ2hpbGRJbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SW5kZXggPj0gbnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5leHRJbmRleCA9IDA7IC8vIGxvb3BcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSBudW1DaGlsZHJlbiAtIDE7IC8vIHJldmVyc2UgbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbmV4dEluZGV4fSk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygtMSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVGb2N1cygxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbktleURvd24pKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZEJsdXIoaW5kZXgsIGNoaWxkLCBldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCFpc1N0cmluZyhjaGlsZCkgJiYgaXNGdW5jdGlvbihjaGlsZC5wcm9wcy5vbkJsdXIpKSB7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRGb2N1cyhpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKCFpc1N0cmluZyhjaGlsZCkgJiYgaXNGdW5jdGlvbihjaGlsZC5wcm9wcy5vbkZvY3VzKSkge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgfHwgaW5kZXgsXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnByb3BzLnRhYkluZGV4ICE9PSB1bmRlZmluZWQgPyBjaGlsZC5wcm9wcy50YWJJbmRleCA6IDAsXG4gICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUNoaWxkQmx1ci5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVDaGlsZEZvY3VzLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAuLi5vbWl0KHRoaXMucHJvcHMsIFVJQXJyb3dLZXlOYXZpZ2F0aW9uLmludGVybmFsS2V5cyksXG4gICAgICAgICAgICByZWY6ICd3cmFwcGVyJyxcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICB9LCB0aGlzLmNoaWxkcmVuKCkpO1xuICAgIH1cbn1cbiJdfQ==