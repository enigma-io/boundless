import React from 'react';
import Button from '../index';

export default class ButtonDemo extends React.PureComponent {
    state = {
        pressed: false,
    }

    handleClick = () => {
        // eslint-disable-next-line no-alert
        alert('A single-click was detected.');
    }

    handlePressed = () => {
        this.setState({pressed: true});
    }

    handleUnpressed = () => {
        this.setState({pressed: false});
    }

    render() {
        return (
            <div>
                <Button onPressed={this.handleClick}>
                    Click Me
                </Button>

                <Button
                    onPressed={this.handlePressed}
                    onUnpressed={this.handleUnpressed}
                    pressed={this.state.pressed}>
                    {this.state.pressed ? 'Pressed' : 'Unpressed'}
                </Button>

                <Button
                    onPressed={this.handleClick}
                    disabled={true}>
                    Disabled
                </Button>
            </div>
        );
    }
}
