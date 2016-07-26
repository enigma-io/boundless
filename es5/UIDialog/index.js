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
                event.persist();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJRGlhbG9nL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFYQTs7Ozs7SUFhcUIsUTs7Ozs7Ozs7Ozs7OzBJQStCakIsVyxHQUFjLHFCLFFBQ2QsUyxHQUFZLHFCLFFBNEJaLFcsR0FBYyxVQUFDLFdBQUQsRUFBaUI7QUFDM0IsZ0JBQUksQ0FBQyxNQUFLLEtBQUwsQ0FBVyxZQUFoQixFQUE4QjtBQUMxQixvQkFBSSxNQUFLLEtBQUwsQ0FBVyxtQkFBZixFQUFvQztBQUNoQyx3QkFBSSxDQUFDLE1BQUssY0FBTCxDQUFvQixZQUFZLE1BQWhDLENBQUwsRUFBOEM7QUFDMUMsK0JBQU8sT0FBTyxVQUFQLENBQWtCO0FBQUEsbUNBQU0sTUFBSyxLQUFMLENBQVcsT0FBWCxFQUFOO0FBQUEseUJBQWxCLEVBQThDLENBQTlDLENBQVA7QUFDSDtBQUNKOztBQUVEO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSSxXQUFXLFlBQVksc0JBQVosSUFBc0MsWUFBWSxhQUFqRTs7QUFFQSxnQkFBTyxNQUFLLGNBQUwsQ0FBb0IsUUFBcEIsS0FDQSxDQUFDLE1BQUssY0FBTCxDQUFvQixZQUFZLE1BQWhDLENBRFIsRUFDaUQ7QUFDN0MsNEJBQVksY0FBWjtBQUNBLHlCQUFTLEtBQVQsR0FGNkMsQ0FFM0I7QUFDckI7QUFDSixTLFFBRUQsYSxHQUFnQixVQUFDLEtBQUQsRUFBVztBQUN2QixnQkFBSSxNQUFLLEtBQUwsQ0FBVyxhQUFYLElBQTRCLE1BQU0sR0FBTixLQUFjLFFBQTlDLEVBQXdEO0FBQ3BELHVCQUFPLFVBQVAsQ0FBa0I7QUFBQSwyQkFBTSxNQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQU47QUFBQSxpQkFBbEIsRUFBOEMsQ0FBOUM7QUFDSDs7QUFFRCxnQkFBSSxPQUFPLE1BQUssS0FBTCxDQUFXLFNBQWxCLEtBQWdDLFVBQXBDLEVB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LFEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgbm9uLWJsb2NraW5nLCBmb2N1cy1zdGVhbGluZyBjb250YWluZXIuXG4gKiBAY2xhc3MgVUlEaWFsb2dcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG9taXQgZnJvbSAnbG9kYXNoLm9taXQnO1xuXG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGludGVybmFsX2tleXMgPSBPYmplY3Qua2V5cyhVSURpYWxvZy5wcm9wVHlwZXMpXG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBib2R5UHJvcHM6IHt9LFxuICAgICAgICBjYXB0dXJlRm9jdXM6IHRydWUsXG4gICAgICAgIGNsb3NlT25Fc2NLZXk6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVGb2N1czogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlU2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgZm9vdGVyUHJvcHM6IHt9LFxuICAgICAgICBoZWFkZXJQcm9wczoge30sXG4gICAgICAgIG9uQ2xvc2U6IG5vb3AsXG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2tzIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICB1dWlkX2hlYWRlciA9IHV1aWQoKVxuICAgIHV1aWRfYm9keSA9IHV1aWQoKVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiRkaWFsb2cuY29udGFpbnMobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUucGFyZW50Tm9kZSA6IG5vZGUpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwbGljaXRPcmlnaW5hbFRhcmdldCBpcyBmb3IgRmlyZWZveCwgYXMgaXQgZG9lc24ndCBzdXBwb3J0IHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgbGV0IHByZXZpb3VzID0gbmF0aXZlRXZlbnQuZXhwbGljaXRPcmlnaW5hbFRhcmdldCB8fCBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgICAgIGlmICggICB0aGlzLmlzUGFydE9mRGlhbG9nKHByZXZpb3VzKVxuICAgICAgICAgICAgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHByZXZpb3VzLmZvY3VzKCk7IC8vIHJlc3RvcmUgZm9jdXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbkVzY0tleSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25LZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVDbGljayAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb3BzLm9uQ2xvc2UoKSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVTY3JvbGwgJiYgIXRoaXMuaXNQYXJ0T2ZEaWFsb2cobmF0aXZlRXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9wcy5vbkNsb3NlKCksIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZF9ib2R5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICd1aS1kaWFsb2ctYm9keSc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuYm9keVByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxmb290ZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuZm9vdGVyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1mb290ZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mb290ZXJ9XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGhlYWRlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5oZWFkZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuaWQgfHwgdGhpcy51dWlkX2hlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmhlYWRlcn1cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJGb2N1c0JvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXB0dXJlRm9jdXMpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpLW9mZnNjcmVlbicgdGFiSW5kZXg9JzAnIGFyaWEtaGlkZGVuPSd0cnVlJz4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IC8vIHVzZWQgdG8gbG9jayBmb2N1cyBpbnRvIGEgcGFydGljdWxhciBzdWJzZXQgb2YgRE9NXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgey4uLm9taXQodGhpcy5wcm9wcywgVUlEaWFsb2cuaW50ZXJuYWxfa2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRfaGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXt0aGlzLnV1aWRfYm9keX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9JzAnPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQm9keSgpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb290ZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==