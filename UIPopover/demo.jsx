import UIList from '../UIList';
import UIPopover from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIPopoverDemo extends UIView {
    constructor(...args) {
        super(...args);
    }

    initialState() {
        return {};
    }

    render() {
        return (
            <div>
                <p>Words of the day for {(new Date()).toLocaleDateString()}</p>
                <div className='ui-spread-even'>
                    <div>
                        <abbr ref='trigger1'
                              className='show-help-popover'
                              onClick={this.togglePopover.bind(this, 1)}>
                            transcendental
                        </abbr>
                        {this.renderPopover1()}
                    </div>

                    <div>
                        <abbr ref='trigger2'
                              className='show-help-popover'
                              onClick={this.togglePopover.bind(this, 2)}>
                            obstetrics
                        </abbr>
                        {this.renderPopover2()}
                    </div>

                    <div>
                        <abbr ref='trigger3'
                              className='show-help-popover'
                              onClick={this.togglePopover.bind(this, 3)}>
                            olio
                        </abbr>
                        {this.renderPopover3()}
                    </div>

                    <div>
                        <abbr ref='trigger4'
                              className='show-help-popover'
                              onClick={this.togglePopover.bind(this, 4)}>
                            anastrophe
                        </abbr>
                        {this.renderPopover4()}
                    </div>

                    <div>
                        <abbr ref='trigger5'
                              className='show-help-popover'
                              onClick={this.togglePopover.bind(this, 5)}>
                            octothorp
                        </abbr>
                        {this.renderPopover5()}
                    </div>
                </div>
            </div>
        );
    }

    renderPopover1() {
        if (this.state.showPopover1) {
            return (
                <UIPopover anchor={this.refs.trigger1}
                           body={[
                               <strong>tran·scen·den·tal</strong>,
                               <br />,
                               <em>adjective</em>,
                               <UIList type='number'
                                       items={[
                                           'of or relating to a spiritual or nonphysical realm.',
                                           '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.'
                                       ]} />
                           ]}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, 1)} />
            );
        }
    }

    renderPopover2() {
        if (this.state.showPopover2) {
            return (
                <UIPopover anchor={this.refs.trigger2}
                           anchorXAlign={UIPopover.Constants.MIDDLE}
                           selfXAlign={UIPopover.Constants.MIDDLE}
                           body={[
                               <strong>ob·stet·rics</strong>,
                               <br />,
                               <em>noun</em>,
                               <p>the branch of medicine and surgery concerned with childbirth and the care of women giving birth.</p>
                           ]}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, 2)} />
            );
        }
    }

    renderPopover3() {
        if (this.state.showPopover3) {
            return (
                <UIPopover anchor={this.refs.trigger3}
                           anchorXAlign={UIPopover.Constants.END}
                           anchorYAlign={UIPopover.Constants.MIDDLE}
                           selfXAlign={UIPopover.Constants.START}
                           selfYAlign={UIPopover.Constants.MIDDLE}
                           body={[
                               <strong>o·li·o</strong>,
                               <br />,
                               <em>noun</em>,
                               <p>another term for <a href='https://www.google.com/search?safe=active&espv=2&biw=1440&bih=743&q=define+olla+podrida&sa=X&ved=0CB8QgCswAGoVChMIlbiutZmDxwIVQx0-Ch1f-g9t'>olla podrida</a></p>,
                               <UIList type='bullet'
                                       items={[
                                           'a miscellaneous collection of things.',
                                           'a variety act or show.'
                                       ]} />
                           ]}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, 3)} />
            );
        }
    }

    renderPopover4() {
        if (this.state.showPopover4) {
            return (
                <UIPopover anchor={this.refs.trigger4}
                           anchorXAlign={UIPopover.Constants.START}
                           anchorYAlign={UIPopover.Constants.MIDDLE}
                           selfXAlign={UIPopover.Constants.END}
                           selfYAlign={UIPopover.Constants.MIDDLE}
                           body={[
                               <strong>a·nas·tro·phe</strong>,
                               <br />,
                               <em>noun</em>,
                               <p>the inversion of the usual order of words or clauses.</p>
                           ]}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, 4)} />
            );
        }
    }

    renderPopover5() {
        if (this.state.showPopover5) {
            return (
                <UIPopover anchor={this.refs.trigger5}
                           anchorXAlign={UIPopover.Constants.MIDDLE}
                           anchorYAlign={UIPopover.Constants.START}
                           selfXAlign={UIPopover.Constants.MIDDLE}
                           selfYAlign={UIPopover.Constants.END}
                           body={[
                               <strong>oc·to·thorp</strong>,
                               <br />,
                               <em>noun</em>,
                               <p>another term for the pound sign (#).</p>
                           ]}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, 5)} />
            );
        }
    }

    togglePopover(index) {
        this.setState({ ['showPopover' + index]: !this.state['showPopover' + index] });
    }
}
