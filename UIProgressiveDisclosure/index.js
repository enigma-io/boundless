/**
 * Hide content until it's needed.
 * @class UIProgressiveDisclosure
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

export default class UIProgressiveDisclosure extends UIView {
    initialState() {
        return {
            expanded: this.props.expanded,
        };
    }

    dispatchCallback() {
        this.props[this.state.expanded ? 'onExpand' : 'onHide']();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({expanded: newProps.expanded}, () => this.dispatchCallback());
        }
    }

    handleClick(event) {
        this.setState({expanded: !this.state.expanded}, () => this.dispatchCallback());

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onClick === 'function') {
            event.persist();
            this.props.toggleProps.onClick(event);
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'Enter':
            event.preventDefault();
            this.setState({expanded: !this.state.expanded}, () => this.dispatchCallback());
        }

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onKeyDown === 'function') {
            event.persist();
            this.props.toggleProps.onKeyDown(event);
        }
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded,
                    [this.props.className]: !!this.props.className,
                 })}>
                <div {...this.props.toggleProps}
                     ref='toggle'
                     className={cx({
                        'ui-disclosure-toggle': true,
                        [this.props.toggleProps.className]: !!this.props.toggleProps.className,
                     })}
                     onClick={this.handleClick.bind(this)}
                     onKeyDown={this.handleKeyDown.bind(this)}
                     tabIndex='0'>
                    {this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser}
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
    expanded: React.PropTypes.bool,
    onExpand: React.PropTypes.func,
    onHide: React.PropTypes.func,
    teaser: React.PropTypes.node,
    teaserExpanded: React.PropTypes.node,
    toggleProps: React.PropTypes.object,
};

UIProgressiveDisclosure.defaultProps = {
    expanded: false,
    onExpand: noop,
    onHide: noop,
    toggleProps: {},
};

export default UIProgressiveDisclosure;
