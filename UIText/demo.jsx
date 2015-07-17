import UIButton from '../UIButton';
import UIText from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UITextDemo extends UIView {
    render() {
        return (
            <div>
                <UIButton className='medium-button'>
                    <UIText text='Blah blah blah blah blah' />
                </UIButton>
                <UIButton className='medium-button'>
                    <UIText text='Blah' maxSize={30} />
                </UIButton>
            </div>
        );
    }
}
