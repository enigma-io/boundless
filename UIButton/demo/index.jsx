import UIButton from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

export default class UIButtonDemo extends UIView {
    initialState() {
        return {
            pressed: false
        };
    }

    render() {
        return (
            <div>
                <UIButton onClick={this.handleClick}>
                    Click Me
                </UIButton>

                <UIButton onPressed={this.handlePressed.bind(this)}
                          onUnpressed={this.handleUnpressed.bind(this)}
                          pressed={this.state.pressed}>
                    {this.state.pressed ? 'Pressed' : 'Unpressed'}
                </UIButton>

                <UIButton onClick={this.handleClick}
                          disabled>
                    Disabled
                </UIButton>
            </div>
        );
    }

    handleClick() {
        alert('A single-click was detected.');
    }

    handlePressed() {
        this.setState({ pressed: true });
    }

    handleUnpressed() {
        this.setState({ pressed: false });
    }
}
