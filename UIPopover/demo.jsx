import UIList from '../UIList';
import UIPopover from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIPopoverDemo extends UIView {
    constructor(...args) {
        super(...args);

        this.togglePopover = this.togglePopover.bind(this);
    }

    initialState() {
        return {
            showPopover: false
        };
    }

    render() {
        return (
            <div>
                <abbr ref='trigger' className='show-help-popover' onClick={this.togglePopover}>transcendental</abbr>
                {this.renderPopover()}
            </div>
        );
    }

    renderPopover() {
        if (this.state.showPopover) {
            return (
                <UIPopover anchor={this.refs.trigger}
                           body={this.renderPopoverBody()}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover} />
            );
        }
    }

    renderPopoverBody() {
        return [
            <strong>tran·scen·den·tal</strong>,
            <br />,
            <em>adjective</em>,
            <UIList type='number'
                    items={[
                        'of or relating to a spiritual or nonphysical realm.',
                        '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.'
                    ]} />
        ];
    }

    togglePopover() {
        this.setState({ showPopover: !this.state.showPopover });
    }
}
