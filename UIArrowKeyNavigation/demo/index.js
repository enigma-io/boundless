import React from 'react';
import UIArrowKeyNavigation from '../index';

export default class UIArrowKeyNavigationDemo extends React.PureComponent {
    state = {
        items: ['lorem', 'ipsum', 'dolor'],
    }

    render() {
        return (
            <div className='ui-spread-even'>
                <section>
                    <h6>Horizontal-only</h6>
                    <UIArrowKeyNavigation className='demo-loose-list' mode={UIArrowKeyNavigation.mode.HORIZONTAL}>
                        {this.state.items.map((item) => <span key={item}>{item}</span>)}
                    </UIArrowKeyNavigation>
                </section>

                <section>
                    <h6>Vertical-only</h6>
                    <UIArrowKeyNavigation component='ul' mode={UIArrowKeyNavigation.mode.VERTICAL}>
                        {this.state.items.map((item) => <li key={item}>{item}</li>)}
                    </UIArrowKeyNavigation>
                </section>

                <section>
                    <h6>Both directions</h6>
                    <UIArrowKeyNavigation component='ol' mode={UIArrowKeyNavigation.mode.BOTH}>
                        {this.state.items.map((item) => <li key={item}>{item}</li>)}
                    </UIArrowKeyNavigation>
                </section>

                <section>
                    <h6>Second child active by default</h6>
                    <UIArrowKeyNavigation component='ul' mode={UIArrowKeyNavigation.mode.VERTICAL} defaultActiveChildIndex={1}>
                        {this.state.items.map((item) => <li key={item}>{item}</li>)}
                    </UIArrowKeyNavigation>
                </section>

                <section>
                    <h6>Ignored child (horizontal rule)</h6>
                    <UIArrowKeyNavigation>
                        <div>lorem</div>
                        <hr tabIndex='-1' />
                        <div>dolor</div>
                    </UIArrowKeyNavigation>
                </section>
            </div>
        );
    }
}
