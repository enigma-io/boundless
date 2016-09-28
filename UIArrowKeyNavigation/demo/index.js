import React from 'react';
import UIArrowKeyNavigation from '../index';

export default class UIArrowKeyNavigationDemo extends React.PureComponent {
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

                <UIArrowKeyNavigation>
                    <div>lorem</div>
                    <hr tabIndex='-1' />
                    <div>dolor</div>
                </UIArrowKeyNavigation>
            </div>
        );
    }
}
