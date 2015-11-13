/**
 * Trigger native toasts in supporting browsers.
 * @class UINotification
 */

import UIView from '../UIView';
import noop from '../UIUtils/noop';

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

let notificationPermissionGranted = (function detectPermissions() {
    return NotificationAPI
           && ((NotificationAPI.permissionLevel && NotificationAPI.permissionLevel() === 'default')
                || (NotificationAPI.checkPermission && NotificationAPI.checkPermission() === 1));
})();  // check W3C API, then webkit API (if needed)

if (!notificationPermissionGranted && NotificationAPI && NotificationAPI.requestPermission) {
    NotificationAPI.requestPermission(function requestReceiver(status) {
        if (status === 'granted'
            || status === 0) {
            notificationPermissionGranted = true;
        }
    });
} // Request permissions if not already granted

class UINotification extends UIView {
    componentDidMount() {
        if (notificationPermissionGranted) {
            this.notification = new NotificationAPI(this.props.header, {
                body: this.props.body,
                icon: this.props.icon,
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

    componentWillUnmount() {
        if (this.notification) {
            this.purgeNotification();
        }

        if (this.expiryTimer) {
            window.clearTimeout(this.expiryTimer);
        }
    }

    purgeNotification() {
        this.notification.removeEventListener('click', this.handleClick);
        this.notification.removeEventListener('close', this.handleDismiss);
        this.notification.removeEventListener('error', this.handleError);
        this.notification.close();

        this.notification = null;
    }

    handleClick() {
        this.props.onClick();
        this.props.onDismiss();
    }

    handleDismiss() {
        this.props.onDismiss();
    }

    handleError(event) {
        console.error('Notification could not be displayed', event.detail);
        this.props.onDismiss();
    }

    handleExpiration() {
        this.purgeNotification();
        this.props.onDismiss();
    }

    render() {
        return null;
    }
}

UINotification.propTypes = {
    body: React.PropTypes.string,
    expiry: React.PropTypes.number,
    header: React.PropTypes.string,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
};

UINotification.defaultProps = {
    body: '',
    header: '',
    icon: '',
    onClick: noop,
    onDismiss: noop,
};

export default UINotification;
