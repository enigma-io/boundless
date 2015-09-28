import UINotification from '../index';
import UIButton from '../../UIButton';
import UIView from '../../UIView';
import React from 'react';

export default class UINotificationDemo extends UIView {
    initialState() {
        return {
            notifications: []
        };
    }

    handleClick(url) {
        if (url) {
            window.open(url);
        }
    }

    handleDismiss(pointer) {
        let copy = this.state.notifications.slice(0);

        this.setState({
            notifications: (copy.splice(copy.indexOf(pointer), 1) && copy)
        });
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onClick={this.spawnNotification.bind(this)}>
                    Spawn Notification
                </UIButton>
                <UIButton ref='trigger' onClick={this.removeOldestNotification.bind(this)}>
                    Remove Oldest Notification
                </UIButton>
                {this.renderNotifications()}
            </div>
        );
    }

    renderNotifications() {
        return this.state.notifications.map((definition, index) => {
            return (
                <UINotification {...definition}
                                key={index}
                                onClick={this.handleClick.bind(null, definition.clickUrl)}
                                onDismiss={this.handleDismiss.bind(this, definition)} />
            );
        });
    }

    removeOldestNotification() {
        if (this.state.notifications.length) {
            this.handleDismiss(this.state.notifications[0]);
        }
    }

    spawnNotification() {
        this.setState({ notifications: this.state.notifications.concat(UINotificationDemo.template) });
    }
}

UINotificationDemo.template = {
    header: 'A sample notification.',
    body: 'I can support up to two lines of text.',
    icon: 'http://icons.iconarchive.com/icons/icons8/ios7/128/Astrology-Winter-icon.png',
    clickUrl: 'http://www.epa.gov/',
    expiry: 5000
};
