'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIView2 = require('../UIView');

var _UIView3 = _interopRequireDefault(_UIView2);

var _noop = require('../UIUtils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Trigger native toasts in supporting browsers.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class UINotification
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NotificationAPI = (function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    } else if (window.webkitNotifications) {
        return window.webkitNotifications;
    } else if (navigator.mozNotification) {
        return navigator.mozNotification;
    }

    return false;
})();

var notificationPermissionGranted = (function detectPermissions() {
    return NotificationAPI && (NotificationAPI.permissionLevel && NotificationAPI.permissionLevel() === 'default' || NotificationAPI.checkPermission && NotificationAPI.checkPermission() === 1);
})(); // check W3C API, then webkit API (if needed)

if (!notificationPermissionGranted && NotificationAPI && NotificationAPI.requestPermission) {
    NotificationAPI.requestPermission(function requestReceiver(status) {
        if (status === 'granted' || status === 0) {
            notificationPermissionGranted = true;
        }
    });
} // Request permissions if not already granted

var UINotification = (function (_UIView) {
    _inherits(UINotification, _UIView);

    function UINotification() {
        _classCallCheck(this, UINotification);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UINotification).apply(this, arguments));
    }

    _createClass(UINotification, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (notificationPermissionGranted) {
                this.notification = new NotificationAPI(this.props.header, {
                    body: this.props.body,
                    icon: this.props.icon
                });

                this.handleClick = this.handleClick.bind(this);
                this.handleDismiss = this.handleDismiss.bind(this);
                this.handleError = this.handleError.bind(this);
                this.handleExpiration = this.handleExpiration.bind(this);

                this.notification.addEventListener('click', this.handleClick);
                this.notification.addEventListener('close', this.handleDismiss);
                this.notification.addEventListener('error', this.handleError);

                if (this.props.expiry) {
                    this.expiryTimer = window.setTimeout(this.handleExpiration, this.props.expiry);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.notification) {
                this.purgeNotification();
            }

            if (this.expiryTimer) {
                window.clearTimeout(this.expiryTimer);
            }
        }
    }, {
        key: 'purgeNotification',
        value: function purgeNotification() {
            this.notification.removeEventListener('click', this.handleClick);
            this.notification.removeEventListener('close', this.handleDismiss);
            this.notification.removeEventListener('error', this.handleError);
            this.notification.close();

            this.notification = null;
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.props.onClick();
            this.props.onDismiss();
        }
    }, {
        key: 'handleDismiss',
        value: function handleDismiss() {
            this.props.onDismiss();
        }
    }, {
        key: 'handleError',
        value: function handleError(event) {
            console.error('Notification could not be displayed', event.detail);
            this.props.onDismiss();
        }
    }, {
        key: 'handleExpiration',
        value: function handleExpiration() {
            this.purgeNotification();
            this.props.onDismiss();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return UINotification;
})(_UIView3.default);

UINotification.propTypes = {
    body: _react2.default.PropTypes.string,
    expiry: _react2.default.PropTypes.number,
    header: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func,
    onDismiss: _react2.default.PropTypes.func
};

UINotification.defaultProps = {
    body: '',
    header: '',
    icon: '',
    onClick: _noop2.default,
    onDismiss: _noop2.default
};

exports.default = UINotification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VJTm90aWZpY2F0aW9uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFNLGVBQWUsR0FBRyxDQUFDLFNBQVMsYUFBYSxHQUFHO0FBQzlDLFFBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtBQUNyQixlQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDOUIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtBQUNuQyxlQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztLQUNyQyxNQUFNLElBQUksU0FBUyxDQUFDLGVBQWUsRUFBRTtBQUNsQyxlQUFPLFNBQVMsQ0FBQyxlQUFlLENBQUM7S0FDcEM7O0FBRUQsV0FBTyxLQUFLLENBQUM7Q0FDaEIsQ0FBQSxFQUFHLENBQUM7O0FBRUwsSUFBSSw2QkFBNkIsR0FBRyxDQUFDLFNBQVMsaUJBQWlCLEdBQUc7QUFDOUQsV0FBTyxlQUFlLEtBQ1gsQUFBQyxlQUFlLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxTQUFTLElBQzlFLGVBQWUsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxBQUFDLENBQUM7Q0FDaEcsQ0FBQSxFQUFHOztBQUFDLEFBRUwsSUFBSSxDQUFDLDZCQUE2QixJQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsaUJBQWlCLEVBQUU7QUFDeEYsbUJBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDL0QsWUFBSSxNQUFNLEtBQUssU0FBUyxJQUNqQixNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ2pCLHlDQUE2QixHQUFHLElBQUksQ0FBQztTQUN4QztLQUNKLENBQUMsQ0FBQztDQUNOOztBQUFBLElBRUssY0FBYztjQUFkLGNBQWM7O2FBQWQsY0FBYzs4QkFBZCxjQUFjOztzRUFBZCxjQUFjOzs7aUJBQWQs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O0FBa0VwQixjQUFjLENBQUMsU0FBUyxHQUFHO0FBQ3ZCLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixVQUFNLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLE1BQU07QUFDOUIsVUFBTSxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzlCLFFBQUksRUFBRSxnQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM1QixXQUFPLEVBQUUsZ0JBQU0sU0FBUyxDQUFDLElBQUk7QUFDN0IsYUFBUyxFQUFFLGdCQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ2xDLENBQUM7O0FBRUYsY0FBYyxDQUFDLFlBQVksR0FBRztBQUMxQixRQUFJLEVBQUUsRUFBRTtBQUNSLFVBQU0sRUFBRSxFQUFFO0FBQ1YsUUFBSSxFQUFFLEVBQUU7QUFDUixXQUFPLGdCQUFNO0FBQ2IsYUFBUyxnQkFBTTtDQUNsQixDQUFDOztrQkFFYSxjQUFjIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVUlWaWV3IGZyb20gJy4uL1VJVmlldyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuLi9VSVV0aWxzL25vb3AnO1xuXG5jb25zdCBOb3RpZmljYXRpb25BUEkgPSAoZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICBpZiAod2luZG93Lk5vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4gd2luZG93Lk5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxubGV0IG5vdGlmaWNhdGlvblBlcm1pc3Npb25HcmFudGVkID0gKGZ1bmN0aW9uIGRldGVjdFBlcm1pc3Npb25zKCkge1xuICAgIHJldHVybiBOb3RpZmljYXRpb25BUElcbiAgICAgICAgICAgJiYgKChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbkxldmVsICYmIE5vdGlmaWNhdGlvbkFQSS5wZXJtaXNzaW9uTGV2ZWwoKSA9PT0gJ2RlZmF1bHQnKVxuICAgICAgICAgICAgICAgIHx8IChOb3RpZmljYXRpb25BUEkuY2hlY2tQZXJtaXNzaW9uICYmIE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSA9PT0gMSkpO1xufSkoKTsgIC8vIGNoZWNrIFczQyBBUEksIHRoZW4gd2Via2l0IEFQSSAoaWYgbmVlZGVkKVxuXG5pZiAoIW5vdGlmaWNhdGlvblBlcm1pc3Npb25HcmFudGVkICYmIE5vdGlmaWNhdGlvbkFQSSAmJiBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24pIHtcbiAgICBOb3RpZmljYXRpb25BUEkucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gcmVxdWVzdFJlY2VpdmVyKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCdcbiAgICAgICAgICAgIHx8IHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uUGVybWlzc2lvbkdyYW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG59IC8vIFJlcXVlc3QgcGVybWlzc2lvbnMgaWYgbm90IGFscmVhZHkgZ3JhbnRlZFxuXG5jbGFzcyBVSU5vdGlmaWNhdGlvbiBleHRlbmRzIFVJVmlldyB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmIChub3RpZmljYXRpb25QZXJtaXNzaW9uR3JhbnRlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uQVBJKHRoaXMucHJvcHMuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgYm9keTogdGhpcy5wcm9wcy5ib2R5LFxuICAgICAgICAgICAgICAgIGljb246IHRoaXMucHJvcHMuaWNvbixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEaXNtaXNzID0gdGhpcy5oYW5kbGVEaXNtaXNzLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yID0gdGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFeHBpcmF0aW9uID0gdGhpcy5oYW5kbGVFeHBpcmF0aW9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMuaGFuZGxlRGlzbWlzcyk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5leHBpcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGlyeVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQodGhpcy5oYW5kbGVFeHBpcmF0aW9uLCB0aGlzLnByb3BzLmV4cGlyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnB1cmdlTm90aWZpY2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5leHBpcnlUaW1lcikge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmV4cGlyeVRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1cmdlTm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMuaGFuZGxlRGlzbWlzcyk7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5oYW5kbGVFcnJvcik7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLmNsb3NlKCk7XG5cbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEaXNtaXNzKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcygpO1xuICAgIH1cblxuICAgIGhhbmRsZUVycm9yKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdGlmaWNhdGlvbiBjb3VsZCBub3QgYmUgZGlzcGxheWVkJywgZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFeHBpcmF0aW9uKCkge1xuICAgICAgICB0aGlzLnB1cmdlTm90aWZpY2F0aW9uKCk7XG4gICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cblVJTm90aWZpY2F0aW9uLnByb3BUeXBlcyA9IHtcbiAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGV4cGlyeTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWNvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkRpc21pc3M6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxufTtcblxuVUlOb3RpZmljYXRpb24uZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIGhlYWRlcjogJycsXG4gICAgaWNvbjogJycsXG4gICAgb25DbGljazogbm9vcCxcbiAgICBvbkRpc21pc3M6IG5vb3AsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVSU5vdGlmaWNhdGlvbjtcbiJdfQ==