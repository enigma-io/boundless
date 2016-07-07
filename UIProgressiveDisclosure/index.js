/**
 * Hide content until it's needed.
 * @class UIProgressiveDisclosure
 */

import React from 'react';
import cx from 'classnames';
import omit from 'lodash.omit';

import UIView from '../UIView';
import noop from '../UIUtils/noop';

export default class UIProgressiveDisclosure extends UIView {
    static propTypes = {
        children: React.PropTypes.node,
        expanded: React.PropTypes.bool,
        onExpand: React.PropTypes.func,
        onHide: React.PropTypes.func,
        teaser: React.PropTypes.node,
        teaserExpanded: React.PropTypes.node,
        toggleProps: React.PropTypes.object,
    }

    static internal_keys = Object.keys(UIProgressiveDisclosure.propTypes)

    static defaultProps = {
        expanded: false,
        onExpand: noop,
        onHide: noop,
        toggleProps: {},
    }

    state = {
        expanded: this.props.expanded,
    }

    componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({expanded: newProps.expanded}, this.dispatchCallback);
        }
    }

    dispatchCallback = () => {
        this.props[this.state.expanded ? 'onExpand' : 'onHide']();
    }

    handleClick = (event) => {
        this.setState({expanded: !this.state.expanded}, this.dispatchCallback);

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onClick === 'function') {
            event.persist();
            this.props.toggleProps.onClick(event);
        }
    }

    handleKeyDown = (event) => {
        switch (event.key) {
        case 'Enter':
            event.preventDefault();
            this.setState({expanded: !this.state.expanded}, this.dispatchCallback);
        }

        /* istanbul ignore else */
        if (typeof this.props.toggleProps.onKeyDown === 'function') {
            event.persist();
            this.props.toggleProps.onKeyDown(event);
        }
    }

    renderContent() {
        if (this.state.expanded) {
            return (
                <div ref='content'
                     className='ui-disclosure-content'>
                    {this.props.children}
                </div>
            );
        }
    }

    render() {
        return (
            <div
                {...omit(this.props, UIProgressiveDisclosure.internal_keys)}
                ref='wrapper'
                className={cx({
                   'ui-disclosure': true,
                   'ui-disclosure-expanded': this.state.expanded,
                   [this.props.className]: !!this.props.className,
                })}>

                <div
                    {...this.props.toggleProps}
                    ref='toggle'
                    className={cx({
                       'ui-disclosure-toggle': true,
                       [this.props.toggleProps.className]: !!this.props.toggleProps.className,
                    })}
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    tabIndex='0'>
                    {this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser}
                </div>

                {this.renderContent()}
            </div>
        );
    }
}
