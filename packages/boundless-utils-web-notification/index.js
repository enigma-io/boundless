export const errors = {
    DISABLED: 'webNotification: web notifications are currently disabled by user settings.',
    NOT_AVAILABLE: 'webNotification: web notifications are not supported on this platform.',
    CONFIG_TYPE: 'webNotification: passed a non-object as configuration.',
    CONFIG_MISSING: 'webNotification: no configuration was passed.',
    BODY_TYPE: 'webNotification: `body` must be a string.',
    BODY_MISSING: 'webNotification: `body` was omitted from the configuration object.',
    HEADER_TYPE: 'webNotification: `header` must be a string.',
    HEADER_MISSING: 'webNotification: `header` was omitted from the configuration object.',
    ICON_TYPE: 'webNotification: `icon` must be a URL string.',
    ONCLICK_TYPE: 'webNotification: `onClick` must be a function.',
};

const isFunction = (x) => typeof x === 'function';
const isString = (x) => typeof x === 'string';

const NotificationAPI = (function detectSupport() {
    if (window.Notification) {
        return window.Notification;
    }

    return false;
})();

function requestPermission() {
    return new Promise((resolve, reject) => {
        NotificationAPI.requestPermission(function requestReceiver(status) {
            if (status === 'granted') {
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

        }
    });
}

/**
 * __Trigger native toasts in supporting browsers.__
 *
 * > Support for web notifications is [available in all major desktop browsers](http://caniuse.com/#feat=notifications),
 *   except IE (February 2017).
 *
 * This module is not a React component, but a utility. The "close" functionality of web notifications was removed in a platform
 * spec update, so it's no longer possible to have a true lifecycle.
 *
 * ```js
 * import webNotification from 'boundless-utils-web-notification';
 *
 * webNotification({body: 'Some text to be displayed...'});
 * ```
 *
 * The utility works by providing an object with the following properties:
 *
 * - __body__ `String`
 *   up to two lines are displayed in the notification (based on the current browser implementations)
 *
 * - __header__ `String`
 *   the bolded title displayed at the top of the notification
 *
 * - __icon__ `HTMLString`
 *   (optional) the URL of a picture or icon to be displayed with the notification (looks best if square)
 *
 * - __onClick__ `Function`
 *   (optional) add arbitrary functionality when the notification is clicked
 *
 * This will return a `Promise`. Resolution means the notification was created correctly (returns the `Notification`,
 * and rejection will return a relevant error description string.
 */
export default function webNotification(config) {
    return new Promise((resolve, reject) => {
        if (config === undefined) {
            return reject(errors.CONFIG_MISSING);
        } else if (Object.prototype.toString.call(config) !== '[object Object]') {
            return reject(errors.CONFIG_TYPE);
        } else if (config.body === undefined) {
            return reject(errors.BODY_MISSING);
        } else if (isString(config.body) === false) {
            return reject(errors.BODY_TYPE);
        } else if (config.header === undefined) {
            return reject(errors.HEADER_MISSING);
        } else if (isString(config.header) === false) {
            return reject(errors.HEADER_TYPE);
        } else if (config.icon !== undefined && isString(config.icon) === false) {
            return reject(errors.ICON_TYPE);
        } else if (config.onClick !== undefined && isFunction(config.onClick) === false) {
            return reject(errors.ONCLICK_TYPE);
        }

        checkPermission().then(
            function spawnWebNotification() {
                const notification = new NotificationAPI(config.header, {
                    body: config.body,
                    icon: config.icon,
                });

                /* istanbul ignore next */
                if (config.onClick) {
                    notification.addEventListener('click', config.onClick);
                }

                resolve(notification);
            }, (error) => reject(error)
        );
    });
}
