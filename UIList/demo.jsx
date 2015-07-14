import UIList from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UIListDemo extends UIView {
    render() {
        return (
            <div>
                <UIList items={['apple', 'orange', 'banana']} />
                <UIList type='bullet' items={['apple', 'orange', 'banana']} />
                <UIList type='number' items={['apple', 'orange', 'banana']} />
            </div>
        );
    }
}
