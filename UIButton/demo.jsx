import UIButton from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UIButtonDemo extends UIView {
    render() {
        return (
            <div>
                <UIButton
                    onClick={this.handleClick}>
                    Click Me
                </UIButton>

                <UIButton
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}>
                    Double Click Me
                </UIButton>

                <UIButton
                    onClick={this.handleClick}
                    disabled>
                    Disabled
                </UIButton>
            </div>
        );
    }

    handleClick() {
        alert('A single-click was detected.');
    }

    handleDoubleClick() {
        alert('A double-click was detected.');
    }
}
