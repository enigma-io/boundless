/**
 * Hide content until it's needed.
 * @class UIProgressiveDisclosure
 */

import React from 'react';
import UIView from '../UIView';
import {noop} from 'lodash';

export default class UIProgressiveDisclosure extends UIView {
    initialState() {
        return {
            expanded: this.props.expanded
        };
    }

    triggerAppropriateCallback() {
        this.props[this.state.expanded ? 'onExpand' : 'onHide']();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({expanded: newProps.expanded}, () => this.triggerAppropriateCallback());
        }
    }

    getClasses() {
        let classes = ['ui-disclosure'];

        if (this.state.expanded) {
            classes.push('ui-disclosure-expanded');
        }

        return classes.concat(this.props.className || []).join(' ');
    }

    handleClick() {
        this.setState({expanded: !this.state.expanded}, () => this.triggerAppropriateCallback());
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'Enter':
            event.preventDefault();
            this.setState({expanded: !this.state.expanded}, () => this.triggerAppropriateCallback());
        }
    }

    render() {
        return (
            <div {...this.props}
                 className={this.getClasses()}>
                <div ref='toggle'
                     className='ui-disclosure-toggle'
                     onClick={this.handleClick.bind(this)}
                     onKeyDown={this.handleKeyDown.bind(this)}
                     tabIndex='0'>
                    {this.props.teaser}
                </div>
                <div ref='content'
                     className='ui-disclosure-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

UIProgressiveDisclosure.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    expanded: React.PropTypes.bool,
    onExpand: React.PropTypes.func,
    onHide: React.PropTypes.func,
    teaser: React.PropTypes.node
};

UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: noop,
    onHide: noop
};

export default UIProgressiveDisclosure;
