import UIButton from '../UIButton';
import UIText from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UITextDemo extends UIView {
    render() {
        return (
            <div>
                <UIButton className='medium-button'>
                    <UIText>Blah blah blah blah blah</UIText>
                </UIButton>
                <UIButton className='medium-button'>
                    <UIText maxFontSize={30}>Blah</UIText>
                </UIButton>
            </div>
        );
    }
}
