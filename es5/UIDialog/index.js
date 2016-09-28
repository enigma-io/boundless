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

var _uuid = require('../UIUtils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A non-blocking, focus-stealing container.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UIDialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UIDialog = function (_React$PureComponent) {
    _inherits(UIDialog, _React$PureComponent);

    function UIDialog() {
        var _temp, _this, _ret;

        _classCallCheck(this, UIDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.mounted = false, _this.uuidHeader = (0, _uuid2.default)(), _this.uuidBody = (0, _uuid2.default)(), _this.callOnCloseIfMounted = function () {
            return _this.mounted && _this.props.onClose();
        }, _this.handleFocus = function (nativeEvent) {
            if (!_this.props.captureFocus) {
                if (_this.props.closeOnOutsideFocus) {
                    if (!_this.isPartOfDialog(nativeEvent.target)) {
                        return window.setTimeout(_this.callOnCloseIfMounted, 0);
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
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }

            if ((0, _isFunction2.default)(_this.props.onKeyDown)) {
                _this.props.onKeyDown(event);
            }
        }, _this.handleOutsideClick = function (nativeEvent) {
            if (_this.props.closeOnOutsideClick && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _this.handleOutsideScrollWheel = function (nativeEvent) {
            if (_this.props.closeOnOutsideScroll && !_this.isPartOfDialog(nativeEvent.target)) {
                window.setTimeout(_this.callOnCloseIfMounted, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // fallbacks if one isn't passed


    UIDialog.prototype.componentDidMount = function componentDidMount() {
        this.mounted = true;

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
        this.mounted = false;

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

        return this.$wrapper.contains(node.nodeType === 3 ? node.parentNode : node);
    };

    UIDialog.prototype.renderBody = function renderBody() {
        var _cx;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.bodyProps, {
                id: this.props.bodyProps.id || this.uuidBody,
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
                    id: this.props.headerProps.id || this.uuidHeader,
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
            _cx4,
            _cx5;

        return _react2.default.createElement(
            'div',
            _extends({}, this.props.wrapperProps, {
                ref: function ref(node) {
                    return _this2.$wrapper = node;
                },
                className: (0, _classnames2.default)((_cx4 = {
                    'ui-dialog-wrapper': true
                }, _cx4[this.props.wrapperProps.className] = !!this.props.wrapperProps.className, _cx4)),
                tabIndex: '0' }),
            this.renderFocusBoundary(),
            this.props.before,
            _react2.default.createElement(
                'div',
                _extends({}, (0, _lodash2.default)(this.props, UIDialog.internalKeys), {
                    ref: function ref(node) {
                        return _this2.$dialog = node;
                    },
                    className: (0, _classnames2.default)((_cx5 = {
                        'ui-dialog': true
                    }, _cx5[this.props.className] = !!this.props.className, _cx5)),
                    onKeyDown: this.handleKeyDown,
                    role: 'dialog',
                    'aria-labelledby': this.uuidHeader,
                    'aria-describedby': this.uuidBody,
                    tabIndex: '0' }),
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            ),
            this.props.after,
            this.renderFocusBoundary()
        );
    };

    return UIDialog;
}(_react2.default.PureComponent);

UIDialog.propTypes = {
    after: _react2.default.PropTypes.node,
    before: _react2.default.PropTypes.node,
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
    onClose: _react2.default.PropTypes.func,
    wrapperProps: _react2.default.PropTypes.object
};
UIDialog.internalKeys = Object.keys(UIDialog.propTypes);
UIDialog.defaultProps = {
    bodyProps: {},
    captureFocus: true,
    closeOnEscKey: false,
    closeOnOutsideClick: false,
    closeOnOutsideFocus: false,
    closeOnOutsideScroll: false,
    footerProps: {},
    headerProps: {},
    onClose: _noop2.default,
    wrapperProps: {}
};
exports.default = UIDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJRGlhbG9nL2luZGV4LmpzIl0sIm5hbWVzIjpbIlVJRGlhbG9nIiwibW91bnRlZCIsInV1aWRIZWFkZXIiLCJ1dWlkQm9keSIsImNhbGxPbkNsb3NlSWZNb3VudGVkIiwicHJvcHMiLCJvbkNsb3NlIiwiaGFuZGxlRm9jdXMiLCJuYXRpdmVFdmVudCIsImNhcHR1cmVGb2N1cyIsImNsb3NlT25PdXRzaWRlRm9jdXMiLCJpc1BhcnRPZkRpYWxvZyIsInRhcmdldCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJwcmV2aW91cyIsImV4cGxpY2l0T3JpZ2luYWxUYXJnZXQiLCJyZWxhdGVkVGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImhhbmRsZUtleURvd24iLCJldmVudCIsImNsb3NlT25Fc2NLZXkiLCJrZXkiLCJvbktleURvd24iLCJoYW5kbGVPdXRzaWRlQ2xpY2siLCJjbG9zZU9uT3V0c2lkZUNsaWNrIiwiaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsIiwiY2xvc2VPbk91dHNpZGVTY3JvbGwiLCJjb21wb25lbnREaWRNb3VudCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIiRkaWFsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibm9kZSIsIiR3cmFwcGVyIiwiY29udGFpbnMiLCJub2RlVHlwZSIsInBhcmVudE5vZGUiLCJyZW5kZXJCb2R5IiwiYm9keVByb3BzIiwiaWQiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsInJlbmRlckZvb3RlciIsImZvb3RlciIsImZvb3RlclByb3BzIiwicmVuZGVySGVhZGVyIiwiaGVhZGVyIiwiaGVhZGVyUHJvcHMiLCJyZW5kZXJGb2N1c0JvdW5kYXJ5IiwicmVuZGVyIiwid3JhcHBlclByb3BzIiwiYmVmb3JlIiwiaW50ZXJuYWxLZXlzIiwiYWZ0ZXIiLCJQdXJlQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJv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QUZUO0FBR2ZNLGVBQVcsZ0JBQU1rQixTQUFOLENBQWdCQyxNQUhaO0FBSWZwRCxrQkFBYyxnQkFBTW1ELFNBQU4sQ0FBZ0JFLElBSmY7QUFLZmpCLGNBQVUsZ0JBQU1lLFNBQU4sQ0FBZ0J4QixJQUxYO0FBTWZkLG1CQUFlLGdCQUFNc0MsU0FBTixDQUFnQkUsSUFOaEI7QUFPZnBDLHlCQUFxQixnQkFBTWtDLFNBQU4sQ0FBZ0JFLElBUHRCO0FBUWZwRCx5QkFBcUIsZ0JBQU1rRCxTQUFOLENBQWdCRSxJQVJ0QjtBQVNmbEMsMEJBQXNCLGdCQUFNZ0MsU0FBTixDQUFnQkUsSUFUdkI7QUFVZmYsWUFBUSxnQkFBTWEsU0FBTixDQUFnQnhCLElBVlQ7QUFXZlksaUJBQWEsZ0JBQU1ZLFNBQU4sQ0FBZ0JDLE1BWGQ7QUFZZlgsWUFBUSxnQkFBTVUsU0FBTixDQUFnQnhCLElBWlQ7QUFhZmUsaUJBQWEsZ0JBQU1TLFNBQU4sQ0FBZ0JDLE1BYmQ7QUFjZnZELGFBQVMsZ0JBQU1zRCxTQUFOLENBQWdCRyxJQWRWO0FBZWZULGtCQUFjLGdCQUFNTSxTQUFOLENBQWdCQztBQWZmLEM7QUFERjdELFEsQ0FtQlZ3RCxZLEdBQWVRLE9BQU9DLElBQVAsQ0FBWWpFLFNBQVMyRCxTQUFyQixDO0FBbkJMM0QsUSxDQXFCVmtFLFksR0FBZTtBQUNsQnhCLGVBQVcsRUFETztBQUVsQmpDLGtCQUFjLElBRkk7QUFHbEJhLG1CQUFlLEtBSEc7QUFJbEJJLHlCQUFxQixLQUpIO0FBS2xCaEIseUJBQXFCLEtBTEg7QUFNbEJrQiwwQkFBc0IsS0FOSjtBQU9sQm9CLGlCQUFhLEVBUEs7QUFRbEJHLGlCQUFhLEVBUks7QUFTbEI3QywyQkFUa0I7QUFVbEJnRCxrQkFBYztBQVZJLEM7a0JBckJMdEQsUSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSBub24tYmxvY2tpbmcsIGZvY3VzLXN0ZWFsaW5nIGNvbnRhaW5lci5cbiAqIEBjbGFzcyBVSURpYWxvZ1xuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCc7XG5cbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL1VJVXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vVUlVdGlscy91dWlkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEaWFsb2cgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBhZnRlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJlZm9yZTogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGJvZHlQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGZvb3RlcjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG4gICAgICAgIGZvb3RlclByb3BzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuICAgICAgICBoZWFkZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHdyYXBwZXJQcm9wczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB9XG5cbiAgICBzdGF0aWMgaW50ZXJuYWxLZXlzID0gT2JqZWN0LmtleXMoVUlEaWFsb2cucHJvcFR5cGVzKVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYm9keVByb3BzOiB7fSxcbiAgICAgICAgY2FwdHVyZUZvY3VzOiB0cnVlLFxuICAgICAgICBjbG9zZU9uRXNjS2V5OiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogZmFsc2UsXG4gICAgICAgIGNsb3NlT25PdXRzaWRlRm9jdXM6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uT3V0c2lkZVNjcm9sbDogZmFsc2UsXG4gICAgICAgIGZvb3RlclByb3BzOiB7fSxcbiAgICAgICAgaGVhZGVyUHJvcHM6IHt9LFxuICAgICAgICBvbkNsb3NlOiBub29wLFxuICAgICAgICB3cmFwcGVyUHJvcHM6IHt9LFxuICAgIH1cblxuICAgIG1vdW50ZWQgPSBmYWxzZVxuXG4gICAgLy8gZmFsbGJhY2tzIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICB1dWlkSGVhZGVyID0gdXVpZCgpXG4gICAgdXVpZEJvZHkgPSB1dWlkKClcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhcHR1cmVGb2N1cyAmJiAhdGhpcy5pc1BhcnRPZkRpYWxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5oYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gZmFsc2U7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVPdXRzaWRlQ2xpY2ssIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljaywgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXMsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPdXRzaWRlU2Nyb2xsV2hlZWwsIHRydWUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZU91dHNpZGVTY3JvbGxXaGVlbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNQYXJ0T2ZEaWFsb2cobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZSA9PT0gd2luZG93KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiR3cmFwcGVyLmNvbnRhaW5zKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnBhcmVudE5vZGUgOiBub2RlKTtcbiAgICB9XG5cbiAgICBjYWxsT25DbG9zZUlmTW91bnRlZCA9ICgpID0+IHRoaXMubW91bnRlZCAmJiB0aGlzLnByb3BzLm9uQ2xvc2UoKVxuXG4gICAgaGFuZGxlRm9jdXMgPSAobmF0aXZlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhcHR1cmVGb2N1cykge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPbk91dHNpZGVGb2N1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BhcnRPZkRpYWxvZyhuYXRpdmVFdmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmNhbGxPbkNsb3NlSWZNb3VudGVkLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgaXMgZm9yIEZpcmVmb3gsIGFzIGl0IGRvZXNuJ3Qgc3VwcG9ydCByZWxhdGVkVGFyZ2V0XG4gICAgICAgIGxldCBwcmV2aW91cyA9IG5hdGl2ZUV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQgfHwgbmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgICAgICBpZiAoICAgdGhpcy5pc1BhcnRPZkRpYWxvZyhwcmV2aW91cylcbiAgICAgICAgICAgICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwcmV2aW91cy5mb2N1cygpOyAvLyByZXN0b3JlIGZvY3VzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25Fc2NLZXkgJiYgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQodGhpcy5jYWxsT25DbG9zZUlmTW91bnRlZCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uS2V5RG93bikpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU91dHNpZGVDbGljayA9IChuYXRpdmVFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT3V0c2lkZVNjcm9sbFdoZWVsID0gKG5hdGl2ZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25PdXRzaWRlU2Nyb2xsICYmICF0aGlzLmlzUGFydE9mRGlhbG9nKG5hdGl2ZUV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2FsbE9uQ2xvc2VJZk1vdW50ZWQsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5ib2R5UHJvcHN9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuYm9keVByb3BzLmlkIHx8IHRoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1ib2R5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5ib2R5UHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmJvZHlQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGZvb3RlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5mb290ZXJQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndWktZGlhbG9nLWZvb3Rlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5mb290ZXJQcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuZm9vdGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZvb3Rlcn1cbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmhlYWRlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5oZWFkZXJQcm9wcy5pZCB8fCB0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMuaGVhZGVyUHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRm9jdXNCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2FwdHVyZUZvY3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aS1vZmZzY3JlZW4nIHRhYkluZGV4PScwJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSAvLyB1c2VkIHRvIGxvY2sgZm9jdXMgaW50byBhIHBhcnRpY3VsYXIgc3Vic2V0IG9mIERPTVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLndyYXBwZXJQcm9wc31cbiAgICAgICAgICAgICAgICByZWY9e25vZGUgPT4gKHRoaXMuJHdyYXBwZXIgPSBub2RlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZy13cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMucHJvcHMud3JhcHBlclByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy53cmFwcGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJGb2N1c0JvdW5kYXJ5KCl9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5iZWZvcmV9XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vbWl0KHRoaXMucHJvcHMsIFVJRGlhbG9nLmludGVybmFsS2V5cyl9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiAodGhpcy4kZGlhbG9nID0gbm9kZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWRpYWxvZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXt0aGlzLnV1aWRIZWFkZXJ9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e3RoaXMudXVpZEJvZHl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PScwJz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJvZHkoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRm9vdGVyKCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5hZnRlcn1cblxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckZvY3VzQm91bmRhcnkoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==