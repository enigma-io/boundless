/**
 * Trigger native toasts in supporting browsers.
 * @class UINotificationService
 */

export const errors = {
    DISABLED: 'UIUtils/notify: web notifications are currently disabled by user settings.',
    NOT_AVAILABLE: 'UIUtils/notify: web notifications are not supported on this platform.',
    CONFIG_TYPE: 'UIUtils/notify: passed a non-object as configuration.',
    CONFIG_MISSING: 'UIUtils/notify: no configuration was passed.',
    BODY_TYPE: 'UIUtils/notify: `body` must be a string.',
    BODY_MISSING: 'UIUtils/notify: `body` was omitted from the configuration object.',
    HEADER_TYPE: 'UIUtils/notify: `header` must be a string.',
    HEADER_MISSING: 'UIUtils/notify: `header` was omitted from the configuration object.',
    ICON_TYPE: 'UIUtils/notify: `icon` must be a URL string.',
    ONCLICK_TYPE: 'UIUtils/notify: `onClick` must be a function.',
};

const NotificationAPI = (function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    } else if (window.webkitNotifications) {
        return window.webkitNotifications;
    } else if (navigator.mozNotification) {
        return navigator.mozNotification;
    }

    return false;
})();

function requestPermission() {
    return new Promise((resolve, reject) => {
        NotificationAPI.requestPermission(function requestReceiver(status) {
            if (status === 'granted' || status === 0) {
                resolve();
            }

            reject(errors.DISABLED);
        });
    });
}

function checkPermission() {
    return new Promise((resolve, reject) => {
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

export default function notify(config) {
    return new Promise((resolve, reject) => {
        if (config === undefined) {
            return reject(errors.CONFIG_MISSING);
        } else if (Object.prototype.toString.call(config) !== '[object Object]') {
            return reject(errors.CONFIG_TYPE);
        } else if (config.body === undefined) {
            return reject(errors.BODY_MISSING);
        } else if (typeof config.body !== 'string') {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if (typeof config.header !== 'string') {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && typeof config.icon !== 'string') {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && typeof config.onClick !== 'function') {
            return reject(errors.ONCLICK_TYPE);
        }

        checkPermission().then(
            function spawnWebNotification() {
                const notification = new NotificationAPI(config.header, {
                    body: config.body,
                    icon: config.icon,
                });

                if (config.onClick) {
                    notification.addEventListener('click', config.onClick);
                }

                resolve(notification);
            }, error => reject(error)
        );
    });
}
