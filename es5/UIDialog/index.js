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

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uuid = require('../UIUtils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _UIView.call.apply(_UIView, [this].concat(args))), _this), _this.uuid_header = (0, _uuid2.default)(), _this.uuid_body = (0, _uuid2.default)(), _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(function () {
                            return _this.props.onClose();
                        }, 0);
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
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }

            if (typeof _this.props.onKeyDown === 'function') {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(function () {
                    return _this.props.onClose();
                }, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    UIDialog.prototype.componentDidMount = function componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.$dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.addEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
        window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
    };

    UIDialog.prototype.isPartOfDialog = function isPartOfDialog(node) {
        if (!node || node === window) {
            return false;
        }

        return this.$dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                id: this.props.bodyProps.id || this.uuid_body,
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
                    id: this.props.headerProps.id || this.uuid_header,
                    className: (0, _classnames2.default)((_cx3 = {
                        'ui-dialog-header': true
                    }, _cx3[this.props.headerProps.className] = !!this.props.headerProps.className, _cx3)) }),
                this.props.header
            );
        }
    };

    UIDialog.prototype.renderFocusBoundary = function renderFocusBoundary() {
        if (this.props.captureFocus) {
            return _react2.default.createElement(
                'div',
                { className: 'ui-offscreen', tabIndex: '0', 'aria-hidden': 'true' },
                ' '
            );
        }
    }; // used to lock focus into a particular subset of DOM

    UIDialog.prototype.render = function render() {
        var _this2 = this,
            _cx4;

        return _react2.default.createElement(
            'div',
            null,
            this.renderFocusBoundary(),
            _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash2.default)(this.props, UIDialog.internal_keys), {
                    ref: function ref(node) {
                        return _this2.$dialog = node;
                    },
                    className: (0, _classnames2.default)((_cx4 = {
                        'ui-dialog': true
                    }, _cx4[this.props.className] = !!this.props.className, _cx4)),
                    onKeyDown: this.handleKeyDown,
                    role: 'dialog',
                    'aria-labelledby': this.uuid_header,
                    'aria-describedby': this.uuid_body,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            ),
            this.renderFocusBoundary()
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
    closeOnOutsideScroll: _react2.default.PropTypes.bool,
    footer: _react2.default.PropTypes.node,
    footerProps: _react2.default.PropTypes.object,
    header: _react2.default.PropTypes.node,
    headerProps: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func
};
UIDialog.internal_keys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default
};
exports.default = UIDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJRGlhbG9nL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFYQTs7Ozs7SUFhcUIsUTs7Ozs7Ozs7Ozs7OzBJQStCakIsVyxHQUFjLHFCLFFBQ2QsUyxHQUFZLHFCLFFBNEJaLFcsR0FBYyxVQUFDLFdBQUQsRUFBaUI7QUFDM0IsZ0JBQUksQ0FBQyxNQUFLLEtBQUwsQ0FBVyxZQUFoQixFQUE4QjtBQUMxQixvQkFBSSxNQUFLLEtBQUwsQ0FBVyxtQkFBZixFQUFvQztBQUNoQyx3QkFBSSxDQUFDLE1BQUssY0FBTCxDQUFvQixZQUFZLE1BQWhDLENBQUwsRUFBOEM7QUFDMUMsK0JBQU8sT0FBTyxVQUFQLENBQWtCO0FBQUEsbUNBQU0sTUFBSyxLQUFMLENBQVcsT0FBWCxFQUFOO0FBQUEseUJBQWxCLEVBQThDLENBQTlDLENBQVA7QUFDSDtBQUNKOztBQUVEO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSSxXQUFXLFlBQVksc0JBQVosSUFBc0MsWUFBWSxhQUFqRTs7QUFFQSxnQkFBTyxNQUFLLGNBQUwsQ0FBb0IsUUFBcEIsS0FDQSxDQUFDLE1BQUssY0FBTCxDQUFvQixZQUFZLE1BQWhDLENBRFIsRUFDaUQ7QUFDN0MsNEJBQVksY0FBWjtBQUNBLHlCQUFTLEtBQVQsR0FGNkMsQ0FFM0I7QUFDckI7QUFDSixTLFFBRUQsYSxHQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxhQUFYLElBQTRCLE1BQU0sR0FBTixLQUFjLFFBQTlDLEVBQXdEO0FBQ3BELHVCQUFPLFVBQVAsQ0FBa0I7QUFBQSwyQkFBTSxNQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQU47QUFBQSxpQkFBbEIsRUFBOEMsQ0FBOUM7QUFDSDs7QUFFRCxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFNBQWxCLEtBQWdDLFVBQXBDLEVB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eC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBVSVZpZXcgZnJvbSAnLi4vVUlWaWV3JztcbmltcG9ydCBub29wIGZyb20gJy4uL1VJVXRpbHMvbm9vcCc7XG5pbXBvcnQgdXVpZCBmcm9tICcuLi9VSVV0aWxzL3V1aWQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSURpYWxvZyBleHRlbmRzIFVJVmlldyB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9vdGVyOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGhlYWRlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvbkNsb3NlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxfa2V5cyA9IE9iamVjdC5rZXlzKFVJRGlhbG9nLnByb3BUeXBlcylcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGJvZHlQcm9wczoge30sXG4gICAgICAgIGNhcHR1cmVGb2N1czogdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkVzY0tleTogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVTY3JvbGw6IGZhbHNlLFxuICAgICAgICBmb290ZXJQcm9wczoge30sXG4gICAgICAgIGhlYWRlclByb3BzOiB7fSxcbiAgICAgICAgb25DbG9zZTogbm9vcCxcbiAgICB9XG5cbiAgICAvLyBmYWxsYmFja3MgaWYgb25lIGlzbid0IHBhc3NlZFxuICAgIHV1aWRfaGVhZGVyID0gdXVpZCgpXG4gICAgdXVpZF9ib2R5ID0gdXVpZCgpXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLiRkaWFsb2cuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpc1BhcnRPZkRpYWxvZyhub2RlKSB7XG4gICAgICAgIGlmICghbm9kZSB8fCBub2RlID09PSB3aW5kb3cpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGRpYWxvZy5jb250YWlucyhub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS5wYXJlbnROb2RlIDogbm9kZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IGlzIGZvciBGaXJlZm94LCBhcyBpdCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRlZFRhcmdldFxuICAgICAgICBsZXQgcHJldmlvdXMgPSBuYXRpdmVFdmVudC5leHBsaWNpdE9yaWdpbmFsVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKCAgIHRoaXMuaXNQYXJ0T2ZEaWFsb2cocHJldmlvdXMpXG4gICAgICAgICAgICAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcHJldmlvdXMuZm9jdXMoKTsgLy8gcmVzdG9yZSBmb2N1c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uRXNjS2V5ICYmIGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbktleURvd24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvcHMub25DbG9zZSgpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZVNjcm9sbCAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmJvZHlQcm9wc31cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ib2R5UHJvcHMuaWQgfHwgdGhpcy51dWlkX2JvZHl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRfaGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctaGVhZGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaGVhZGVyfVxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckZvY3VzQm91bmRhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWktb2Zmc2NyZWVuJyB0YWJJbmRleD0nMCcgYXJpYS1oaWRkZW49J3RydWUnPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gLy8gdXNlZCB0byBsb2NrIGZvY3VzIGludG8gYSBwYXJ0aWN1bGFyIHN1YnNldCBvZiBET01cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4ub21pdCh0aGlzLnByb3BzLCBVSURpYWxvZy5pbnRlcm5hbF9rZXlzKX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtub2RlID0+ICh0aGlzLiRkaWFsb2cgPSBub2RlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT0nZGlhbG9nJ1xuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e3RoaXMudXVpZF9oZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZF9ib2R5fVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD0nMCc+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvb3RlcigpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9jdXNCb3VuZGFyeSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19