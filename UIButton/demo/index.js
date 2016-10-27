import React from 'react';
import UIButton from '../index';

export default class UIButtonDemo extends React.PureComponent {
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
                <UIButton onPressed={this.handleClick}>
                    Click Me
                </UIButton>

                <UIButton onPressed={this.handlePressed}
                          onUnpressed={this.handleUnpressed}
                          pressed={this.state.pressed}>
                    {this.state.pressed ? 'Pressed' : 'Unpressed'}
                </UIButton>

                <UIButton onPressed={this.handleClick}
                          disabled={true}>
                    Disabled
                </UIButton>
            </div>
        );
    }
}
