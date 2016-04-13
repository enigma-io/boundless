import React from 'react';
import UITextualInput from '../index';
import UIView from '../../UIView';

export default class UITextualInputDemo extends UIView {
    render() {
        return (
            <div className='ui-spread-even'>
                <div>
                    <h5><code>hidePlaceholderOnFocus=&#123;false&#125;</code></h5>
                    <UITextualInput placeholder='Start typing and I disappear!' />
                </div>
                <div style={{marginLeft: '1em'}}>
                    <h5><code>hidePlaceholderOnFocus=&#123;true&#125;</code></h5>
                    <UITextualInput placeholder='Focus on me and I disappear!' hidePlaceholderOnFocus={true} />
                </div>
            </div>
        );
    }
}
