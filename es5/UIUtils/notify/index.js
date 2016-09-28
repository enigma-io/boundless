'use strict';

exports.__esModule = true;
exports.errors = undefined;
exports.default = notify;

var _isFunction = require('../isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require('../isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Trigger native toasts in supporting browsers.
 * @class UINotificationService
 */

var errors = exports.errors = {
    DISABLED: 'UIUtils/notify: web notifications are currently disabled by user settings.',
    NOT_AVAILABLE: 'UIUtils/notify: web notifications are not supported on this platform.',
    CONFIG_TYPE: 'UIUtils/notify: passed a non-object as configuration.',
    CONFIG_MISSING: 'UIUtils/notify: no configuration was passed.',
    BODY_TYPE: 'UIUtils/notify: `body` must be a string.',
    BODY_MISSING: 'UIUtils/notify: `body` was omitted from the configuration object.',
    HEADER_TYPE: 'UIUtils/notify: `header` must be a string.',
    HEADER_MISSING: 'UIUtils/notify: `header` was omitted from the configuration object.',
    ICON_TYPE: 'UIUtils/notify: `icon` must be a URL string.',
    ONCLICK_TYPE: 'UIUtils/notify: `onClick` must be a function.'
};

var NotificationAPI = function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    } else if (window.webkitNotifications) {
        return window.webkitNotifications;
    } else if (navigator.mozNotification) {
        return navigator.mozNotification;
    }

    return false;
}();

function requestPermission() {
    return new Promise(function (resolve, reject) {
        NotificationAPI.requestPermission(function requestReceiver(status) {
            if (status === 'granted' || status === 0) {
                resolve();
            }

            reject(errors.DISABLED);
        });
    });
}

function checkPermission() {
    return new Promise(function (resolve, reject) {
        if (!NotificationAPI) {
            return reject(errors.NOT_AVAILABLE);
        }

        if ('permission' in NotificationAPI) {
            switch (NotificationAPI.permission) {
                case 'granted':
                    return resolve();

                case 'denied':
                    return reject(errors.DISABLED);
            }

            requestPermission().then(resolve, reject);
        } else if ('checkPermission' in NotificationAPI) {
            switch (NotificationAPI.checkPermission()) {
                case 0:
                    return resolve();

                case 1:
                    requestPermission().then(resolve, reject);
                    break;

                default:
                    return reject(errors.DISABLED);
            }
        }
    });
}

function notify(config) {
    return new Promise(function (resolve, reject) {
        if (config === undefined) {
            return reject(errors.CONFIG_MISSING);
        } else if (Object.prototype.toString.call(config) !== '[object Object]') {
            return reject(errors.CONFIG_TYPE);
        } else if (config.body === undefined) {
            return reject(errors.BODY_MISSING);
        } else if ((0, _isString2.default)(config.body) === false) {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if ((0, _isString2.default)(config.header) === false) {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && (0, _isString2.default)(config.icon) === false) {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && (0, _isFunction2.default)(config.onClick) === false) {
            return reject(errors.ONCLICK_TYPE);
        }

        checkPermission().then(function spawnWebNotification() {
            var notification = new NotificationAPI(config.header, {
                body: config.body,
                icon: config.icon
            });

            /* istanbul ignore next */
            if (config.onClick) {
                notification.addEventListener('click', config.onClick);
            }

            resolve(notification);
        }, function (error) {
            return reject(error);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJVXRpbHMvbm90aWZ5L2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vdGlmeSIsImVycm9ycyIsIkRJU0FCTEVEIiwiTk9UX0FWQUlMQUJMRSIsIkNPTkZJR19UWVBFIiwiQ09ORklHX01JU1NJTkciLCJCT0RZX1RZUEUiLCJCT0RZX01JU1NJTkciLCJIRUFERVJfVFlQRSIsIkhFQURFUl9NSVNTSU5HIiwiSUNPTl9UWVBFIiwiT05DTElDS19UWVBFIiwiTm90aWZpY2F0aW9uQVBJIiwiZGV0ZWN0U3VwcG9ydCIsIndpbmRvdyIsIk5vdGlmaWNhdGlvbiIsIndlYmtpdE5vdGlmaWNhdGlvbnMiLCJuYXZpZ2F0b3IiLCJtb3pOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdFJlY2VpdmVyIiwic3RhdHVzIiwiY2hlY2tQZXJtaXNzaW9uIiwicGVybWlzc2lvbiIsInRoZW4iLCJjb25maWciLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJib2R5IiwiaGVhZGVyIiwiaWNvbiIsIm9uQ2xpY2siLCJzcGF3bldlYk5vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7OztrQkE4RXdCQSxNOztBQXpFeEI7Ozs7QUFDQTs7Ozs7O0FBTkE7Ozs7O0FBUU8sSUFBTUMsMEJBQVM7QUFDbEJDLGNBQVUsNEVBRFE7QUFFbEJDLG1CQUFlLHVFQUZHO0FBR2xCQyxpQkFBYSx1REFISztBQUlsQkMsb0JBQWdCLDhDQUpFO0FBS2xCQyxlQUFXLDBDQUxPO0FBTWxCQyxrQkFBYyxtRUFOSTtBQU9sQkMsaUJBQWEsNENBUEs7QUFRbEJDLG9CQUFnQixxRUFSRTtBQVNsQkMsZUFBVyw4Q0FUTztBQVVsQkMsa0JBQWM7QUFWSSxDQUFmOztBQWFQLElBQU1DLGtCQUFtQixT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QTNELEVBQWtFO0FBQ3JFLG1CQUFPZCxPQUFPckIsT0FBT1MsU0FBZCxDQUFQO0FBQ0gsU0FGTSxNQUVBLElBQUlrQixPQUFPUyxPQUFQLEtBQW1CUixTQUFuQixJQUFnQywwQkFBV0QsT0FBT1MsT0FBbEIsTUFBK0IsS0FBbkUsRUFBMEU7QUFDN0UsbUJBQU9mLE9BQU9yQixPQUFPVSxZQUFkLENBQVA7QUFDSDs7QUFFRGMsMEJBQWtCRSxJQUFsQixDQUNJLFNBQVNXLG9CQUFULEdBQWdDO0FBQzVCLGdCQUFNQyxlQUFlLElBQUkzQixlQUFKLENBQW9CZ0IsT0FBT08sTUFBM0IsRUFBbUM7QUFDcERELHNCQUFNTixPQUFPTSxJQUR1QztBQUVwREUsc0JBQU1SLE9BQU9RO0FBRnVDLGFBQW5DLENBQXJCOztBQUtBO0FBQ0EsZ0JBQUlSLE9BQU9TLE9BQVgsRUFBb0I7QUFDaEJFLDZCQUFhQyxnQkFBYixDQUE4QixPQUE5QixFQUF1Q1osT0FBT1MsT0FBOUM7QUFDSDs7QUFFRGhCLG9CQUFRa0IsWUFBUjtBQUNILFNBYkwsRUFhTztBQUFBLG1CQUFTakIsT0FBT21CLEtBQVAsQ0FBVDtBQUFBLFNBYlA7QUFlSCxLQWxDTSxDQUFQO0FBbUNIIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUcmlnZ2VyIG5hdGl2ZSB0b2FzdHMgaW4gc3VwcG9ydGluZyBicm93c2Vycy5cbiAqIEBjbGFzcyBVSU5vdGlmaWNhdGlvblNlcnZpY2VcbiAqL1xuXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuLi9pc1N0cmluZyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XG4gICAgRElTQUJMRUQ6ICdVSVV0aWxzL25vdGlmeTogd2ViIG5vdGlmaWNhdGlvbnMgYXJlIGN1cnJlbnRseSBkaXNhYmxlZCBieSB1c2VyIHNldHRpbmdzLicsXG4gICAgTk9UX0FWQUlMQUJMRTogJ1VJVXRpbHMvbm90aWZ5OiB3ZWIgbm90aWZpY2F0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicsXG4gICAgQ09ORklHX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogcGFzc2VkIGEgbm9uLW9iamVjdCBhcyBjb25maWd1cmF0aW9uLicsXG4gICAgQ09ORklHX01JU1NJTkc6ICdVSVV0aWxzL25vdGlmeTogbm8gY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkLicsXG4gICAgQk9EWV9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCBtdXN0IGJlIGEgc3RyaW5nLicsXG4gICAgQk9EWV9NSVNTSU5HOiAnVUlVdGlscy9ub3RpZnk6IGBib2R5YCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIEhFQURFUl9UWVBFOiAnVUlVdGlscy9ub3RpZnk6IGBoZWFkZXJgIG11c3QgYmUgYSBzdHJpbmcuJyxcbiAgICBIRUFERVJfTUlTU0lORzogJ1VJVXRpbHMvbm90aWZ5OiBgaGVhZGVyYCB3YXMgb21pdHRlZCBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdC4nLFxuICAgIElDT05fVFlQRTogJ1VJVXRpbHMvbm90aWZ5OiBgaWNvbmAgbXVzdCBiZSBhIFVSTCBzdHJpbmcuJyxcbiAgICBPTkNMSUNLX1RZUEU6ICdVSVV0aWxzL25vdGlmeTogYG9uQ2xpY2tgIG11c3QgYmUgYSBmdW5jdGlvbi4nLFxufTtcblxuY29uc3QgTm90aWZpY2F0aW9uQVBJID0gKGZ1bmN0aW9uIGRldGVjdFN1cHBvcnQoKSB7XG4gICAgaWYgKHdpbmRvdy5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Ob3RpZmljYXRpb247XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnM7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubW96Tm90aWZpY2F0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIE5vdGlmaWNhdGlvbkFQSS5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiByZXF1ZXN0UmVjZWl2ZXIoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZ3JhbnRlZCcgfHwgc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyb3JzLkRJU0FCTEVEKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIU5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuTk9UX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbkFQSSkge1xuICAgICAgICAgICAgc3dpdGNoIChOb3RpZmljYXRpb25BUEkucGVybWlzc2lvbikge1xuICAgICAgICAgICAgY2FzZSAnZ3JhbnRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgY2FzZSAnZGVuaWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoJ2NoZWNrUGVybWlzc2lvbicgaW4gTm90aWZpY2F0aW9uQVBJKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKE5vdGlmaWNhdGlvbkFQSS5jaGVja1Blcm1pc3Npb24oKSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9ycy5ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90aWZ5KGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX01JU1NJTkcpO1xuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb25maWcpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQ09ORklHX1RZUEUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkJPRFlfTUlTU0lORyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29uZmlnLmJvZHkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcnMuQk9EWV9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaGVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9NSVNTSU5HKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb25maWcuaGVhZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLkhFQURFUl9UWVBFKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcuaWNvbiAhPT0gdW5kZWZpbmVkICYmIGlzU3RyaW5nKGNvbmZpZy5pY29uKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLklDT05fVFlQRSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm9uQ2xpY2sgIT09IHVuZGVmaW5lZCAmJiBpc0Z1bmN0aW9uKGNvbmZpZy5vbkNsaWNrKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3JzLk9OQ0xJQ0tfVFlQRSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1Blcm1pc3Npb24oKS50aGVuKFxuICAgICAgICAgICAgZnVuY3Rpb24gc3Bhd25XZWJOb3RpZmljYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbkFQSShjb25maWcuaGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGNvbmZpZy5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBjb25maWcuaWNvbixcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpZy5vbkNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiByZWplY3QoZXJyb3IpXG4gICAgICAgICk7XG4gICAgfSk7XG59XG4iXX0=