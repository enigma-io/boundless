import {createElement, PureComponent} from 'react';
import notify from '../';
import Button from '../../boundless-button/index';

export default class NotifyDemo extends PureComponent {
    state = {
        n: 0,
    }

    spawnNotification = () => {
        notify(this.template(this.state.n + 1)).catch((error) => console.warn(error));

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
                <Button ref='trigger' onClick={this.spawnNotification}>
                    Spawn Notification
                </Button>
            </div>
        );
    }
}
