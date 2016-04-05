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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIDialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIDialog = function (_UIView) {
    _inherits(UIDialog, _UIView);

    function UIDialog() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.state = {
            headerUUID: _this.uuid(),
            bodyUUID: _this.uuid()
        }, _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return _this.props.onClose();
                    }
                }

                return;
            }

            // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
            var previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

            if (_this.isPartOfDialog(previous) && !_this.isPartOfDialog(nativeEvent.target)) {
                nativeEvent.preventDefault();
                previous.focus(); // restore focus
            }
        }, _this.handleKeyDown = function (event) {
            if (_this.props.closeOnEscKey && event.key === 'Escape') {
                _this.props.onClose();
            }

            if (typeof _this.props.onKeyDown === 'function') {
                event.persist();
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                _this.props.onClose();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    UIDialog.prototype.componentDidMount = function componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.refs.dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        if (!node || node === window) {
            return false;
        }

        return this.refs.dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                ref: 'body',
                id: this.state.bodyUUID,
                className: (0, _classnames2.default)((_cx = {
                    'ui-dialog-body': true
                }, _cx[this.props.bodyProps.className] = !!this.props.bodyProps.className, _cx)) }),
            this.props.children
        );
    };

    UIDialog.prototype.renderFooter = function renderFooter() {
        if (this.props.footer) {
            var _cx2;

            return _react2.default.createElement(
                'footer',
                _extends({}, this.props.footerProps, {
                    ref: 'footer',
                    className: (0, _classnames2.default)((_cx2 = {
                        'ui-dialog-footer': true
                    }, _cx2[this.props.footerProps.className] = !!this.props.footerProps.className, _cx2)) }),
                this.props.footer
            );
        }
    };

    UIDialog.prototype.renderHeader = function renderHeader() {
        if (this.props.header) {
            var _cx3;

            return _react2.default.createElement(
                'header',
                _extends({}, this.props.headerProps, {
                    ref: 'header',
                    id: this.state.headerUUID,
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-dialog-header': true
                    }, _cx3[this.props.headerProps.className] = !!this.props.headerProps.className, _cx3)) }),
                this.props.header
            );
        }
    };

    UIDialog.prototype.render = function render() {
        var _cx4;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props, {
                ref: 'dialog',
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-dialog': true
                }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                onKeyDown: this.handleKeyDown,
                role: 'dialog',
                'aria-labelledby': this.state.headerUUID,
                'aria-describedby': this.state.bodyUUID,
                tabIndex: '0' }),
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()
        );
    };

    return UIDialog;
}(_UIView3.default);

UIDialog.propTypes = {
    bodyProps: _react2.default.PropTypes.object,
    captureFocus: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    closeOnEscKey: _react2.default.PropTypes.bool,
    closeOnOutsideClick: _react2.default.PropTypes.bool,
    closeOnOutsideFocus: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func
};
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default
};
exports.default = UIDialog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJRGlhbG9nL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVxQjs7Ozs7Ozs7Ozs7OzBJQXVCakIsUUFBUTtBQUNKLHdCQUFZLE1BQUssSUFBTCxFQUFaO0FBQ0Esc0JBQVUsTUFBSyxJQUFMLEVBQVY7aUJBeUJKLGNBQWMsVUFBQyxXQUFELEVBQWlCO0FBQzNCLGdCQUFJLENBQUMsTUFBSyxLQUFMLENBQVcsWUFBWCxFQUF5QjtBQUMxQixvQkFBSSxNQUFLLEtBQUwsQ0FBVyxtQkFBWCxFQUFnQztBQUNoQyx3QkFBSSxDQUFDLE1BQUssY0FBTCxDQUFvQixZQUFZLE1BQVosQ0FBckIsRUFBMEM7QUFDMUMsK0JBQU8sTUFBSyxLQUFMLENBQVcsT0FBWCxFQUFQLENBRDBDO3FCQUE5QztpQkFESjs7QUFNQSx1QkFQMEI7YUFBOUI7OztBQUQyQixnQkFZdkIsV0FBVyxZQUFZLHNCQUFaLElBQXNDLFlBQVksYUFBWixDQVoxQjs7QUFjM0IsZ0JBQU8sTUFBSyxjQUFMLENBQW9CLFFBQXBCLEtBQ0EsQ0FBQyxNQUFLLGNBQUwsQ0FBb0IsWUFBWSxNQUFaLENBQXJCLEVBQTBDO0FBQzdDLDRCQUFZLGNBQVosR0FENkM7QUFFN0MseUJBQVMsS0FBVDtBQUY2QyxhQURqRDtTQWRVLFFBcUJkLGdCQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxhQUFYLElBQTRCLE1BQU0sR0FBTixLQUFjLFFBQWQsRUFBd0I7QUFDcEQsc0JBQUssS0FBTCxDQUFXLE9BQVgsR0FEb0Q7YUFBeEQ7O0FBSUEsZ0JBQUksT0FBTyxNQUFLLEtBQUwsQ0FBVyxTQUFYLEtBQXlCLFVBQWhDLEVBQTRDO0FBQzVDLHNCQUFNLE9BQU4sR0FENEM7QUFFNUMsc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBckIsRUFGNEM7YUFBaEQ7U0FMWSxRQVdoQixxQkFBcUIs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Y2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgaGVhZGVyVVVJRDogdGhpcy51dWlkKCksXG4gICAgICAgIGJvZHlVVUlEOiB0aGlzLnV1aWQoKSxcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5kaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uS2V5RG93biA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnQucGVyc2lzdCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZUNsaWNrID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgIHJlZj0nYm9keSdcbiAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuYm9keVVVSUR9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWJvZHknOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXIgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Zvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctZm9vdGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlciB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naGVhZGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaGVhZGVyVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICAgcmVmPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5zdGF0ZS5oZWFkZXJVVUlEfVxuICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnN0YXRlLmJvZHlVVUlEfVxuICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19