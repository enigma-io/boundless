import React from 'react';
import notify from '../index';
import UIButton from '../../../UIButton';
import UIView from '../../../UIView';

export default class NotifyDemo extends UIView {
    state = {
        n: 0,
    }

    spawnNotification = () => {
        notify(this.template(this.state.n + 1)).catch(error => console.warn(error));

        this.setState({n: this.state.n + 1});
    }

    template(index) {
        return {
            header: `Notification #${index}`,
            body: 'I can support up to two lines of text.',
            icon: 'http://icons.iconarchive.com/icons/icons8/ios7/128/Astrology-Winter-icon.png',
            onClick: () => window.open('http://www.epa.gov/'),
        };
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onClick={this.spawnNotification}>
                    Spawn Notification
                </UIButton>
            </div>
        );
    }
}
