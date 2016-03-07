import React from 'react';
import UIArrowKeyNavigation from '../index';
import UIView from '../../UIView';

export default class UIArrowKeyNavigationDemo extends UIView {
    state = {
        items: ['lorem', 'ipsum', 'dolor'],
    }

    render() {
        return (
            <div className='ui-spread-even'>
                <UIArrowKeyNavigation className='demo-loose-list'>
                    {this.state.items.map(item => <span key={item}>{item}</span>)}
                </UIArrowKeyNavigation>

                <UIArrowKeyNavigation component='ul'>
                    {this.state.items.map(item => <li key={item}>{item}</li>)}
                </UIArrowKeyNavigation>

                <UIArrowKeyNavigation component='ol'>
                    {this.state.items.map(item => <li key={item}>{item}</li>)}
                </UIArrowKeyNavigation>
            </div>
        );
    }
}
