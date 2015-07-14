import UIButton from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UIButtonDemo extends UIView {
    render() {
        return (
            <div>
                <UIButton
                    className='fast-honk-button'
                    onClick={this.handleClick}>
                    FastHonk
                </UIButton>

                <UIButton
                    className={['green', 'blue']}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}>
                    Honk
                </UIButton>

                <UIButton
                    onClick={this.handleClick}
                    disabled>
                    Whomp Whomp
                </UIButton>
            </div>
        );
    }

    handleClick() {
        alert('HONK!');
    }

    handleDoubleClick() {
        alert('SCREEEECH!');
    }
}
