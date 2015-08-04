import UIList from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

export default class UIListDemo extends UIView {
    initialState() {
        return {
            items: ['lorem', 'ipsum', 'dolor']
        };
    }

    render() {
        return (
            <div className='ui-spread-even'>
                <UIList items={this.state.items} />
                <UIList type='bullet' items={this.state.items} />
                <UIList type='number' items={this.state.items} />
            </div>
        );
    }
}
