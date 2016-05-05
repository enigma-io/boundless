'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIArrowKeyNavigation = function (_UIView) {
    _inherits(UIArrowKeyNavigation, _UIView);

    function UIArrowKeyNavigation() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIArrowKeyNavigation);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
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

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
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

        if (childNode && document.activeElement !== childNode) {
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

        if (typeof child !== 'string' && typeof child.props.onBlur === 'function') {
            event.persist();
            child.props.onBlur(event);
        }
    };

    UIArrowKeyNavigation.prototype.handleChildFocus = function handleChildFocus(index, child, event) {
        this.setState({ activeChildIndex: index });

        event.stopPropagation();

        if (typeof child !== 'string' && typeof child.props.onFocus === 'function') {
            event.persist();
            child.props.onFocus(event);
        }
    };

    UIArrowKeyNavigation.prototype.children = function children() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.tabIndex || 0,
                onBlur: _this2.handleChildBlur.bind(_this2, index, child),
                onFocus: _this2.handleChildFocus.bind(_this2, index, child)
            });
        });
    };

    UIArrowKeyNavigation.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, _extends({}, this.props, {
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown
        }), this.children());
    };

    return UIArrowKeyNavigation;
}(_UIView3.default);

UIArrowKeyNavigation.propTypes = {
    component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
};
UIArrowKeyNavigation.defaultProps = {
    component: 'div'
};
exports.default = UIArrowKeyNavigation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJQXJyb3dLZXlOYXZpZ2F0aW9uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQixvQjs7Ozs7Ozs7Ozs7OzBJQVlqQixLLEdBQVE7QUFDSiw4QkFBa0I7QUFEZCxTLFFBZ0RSLGEsR0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDdkIsb0JBQVEsTUFBTSxHQUFkO0FBQ0EscUJBQUssU0FBTDtBQUNBLHFCQUFLLFdBQUw7QUFDSSwwQkFBTSxjQUFOO0FBQ0EsMEJBQUssU0FBTCxDQUFlLENBQUMsQ0FBaEI7QUFDQTs7QUFFSixxQkFBSyxXQUFMO0FBQ0EscUJBQUssWUFBTDtBQUNJLDBCQUFNLGNBQU47QUFDQSwwQkFBSyxTQUFMLENBQWUsQ0FBZjtBQUNBO0FBWEo7O0FBY0EsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxTQUFsQixLQUFnQyxVQUFwQyxFQUFnRDtBQUM1QyxzQkFBTSxPQUFOO0FBQ0Esc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckI7QUFDSDtBQUNKLFM7OzttQ0EvREQsa0IsK0JBQW1CLFMsRUFBVyxTLEVBQVc7QUFDckMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxLQUFnQyxJQUFwQyxFQUEwQztBQUN0QyxnQkFBTSxjQUFnQixLQUFLLEtBQUwsQ0FBVyxRQUFYLEdBQ0MsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLEtBQUssS0FBTCxDQUFXLFFBQWxDLENBQUQsQ0FBOEMsTUFEOUMsR0FFQSxDQUZ0Qjs7QUFJQSxnQkFBSSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIscUJBQUssUUFBTCxDQUFjLEVBQUMsa0JBQWtCLElBQW5CLEVBQWQsRTtBQUNILGFBRkQsTUFFTyxJQUFJLEtBQUssS0FBTCxDQUFXLGdCQUFYLElBQStCLFdBQW5DLEVBQWdEO0FBQ25ELHlCQUFLLFFBQUwsQ0FBYyxFQUFDLGtCQUFrQixjQUFjLENB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QUFLSCxLOzs7OztBQTFIZ0Isb0IsQ0FDVixTLEdBQVk7QUFDZixlQUFXLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FDakMsZ0JBQU0sU0FBTixDQUFnQixNQURpQixFQUVqQyxnQkFBTSxTQUFOLENBQWdCLElBRmlCLENBQTFCO0FBREksQztBQURGLG9CLENBUVYsWSxHQUFlO0FBQ2xCLGVBQVc7QUFETyxDO2tCQVJMLG9CIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQXJyb3dLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgVUlWaWV3IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBdKSxcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBjb21wb25lbnQ6ICdkaXYnLFxuICAgIH1cblxuICAgIHN0YXRlID0ge1xuICAgICAgICBhY3RpdmVDaGlsZEluZGV4OiBudWxsLFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBudW1DaGlsZHJlbiA9ICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChBcnJheS5wcm90b3R5cGUuY29uY2F0KHRoaXMucHJvcHMuY2hpbGRyZW4pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAobnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlQ2hpbGRJbmRleDogbnVtQ2hpbGRyZW4gLSAxfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4ICE9PSBwcmV2U3RhdGUuYWN0aXZlQ2hpbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9jdXModGhpcy5zdGF0ZS5hY3RpdmVDaGlsZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvY3VzKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IChcbiAgICAgICAgICAgIHRoaXMucmVmcy53cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IHRoaXMucmVmcy53cmFwcGVyXG4gICAgICAgICAgOiBmaW5kRE9NTm9kZSh0aGlzLnJlZnMud3JhcHBlcilcbiAgICAgICAgKS5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZvY3VzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG51bUNoaWxkcmVuID0gICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoQXJyYXkucHJvdG90eXBlLmNvbmNhdCh0aGlzLnByb3BzLmNoaWxkcmVuKSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggKyBkZWx0YTtcblxuICAgICAgICBpZiAobmV4dEluZGV4ID49IG51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICBuZXh0SW5kZXggPSAwOyAvLyBsb29wXG4gICAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV4dEluZGV4ID0gbnVtQ2hpbGRyZW4gLSAxOyAvLyByZXZlcnNlIGxvb3BcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IG5leHRJbmRleH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoLTEpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXMoMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkQmx1cihpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZUNoaWxkSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVDaGlsZEluZGV4OiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25CbHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRGb2N1cyhpbmRleCwgY2hpbGQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUNoaWxkSW5kZXg6IGluZGV4fSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uRm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiBjaGlsZC50YWJJbmRleCB8fCAwLFxuICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVDaGlsZEJsdXIuYmluZCh0aGlzLCBpbmRleCwgY2hpbGQpLFxuICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlQ2hpbGRGb2N1cy5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHJlZjogJ3dyYXBwZXInLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG4gICAgICAgIH0sIHRoaXMuY2hpbGRyZW4oKSk7XG4gICAgfVxufVxuIl19