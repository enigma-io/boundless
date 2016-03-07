import React from 'react';
import UIButton from '../index';
import UIView from '../../UIView';

export default class UIButtonDemo extends UIView {
    state = {
        pressed: false,
    }

    handleClick = () => {
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
