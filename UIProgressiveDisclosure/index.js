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

    handleClick() {
        this.setState({expanded: !this.state.expanded}, () => this.dispatchCallback());
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'Enter':
            event.preventDefault();
            this.setState({expanded: !this.state.expanded}, () => this.dispatchCallback());
        }
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 className={cx({
                    'ui-disclosure': true,
                    'ui-disclosure-expanded': this.state.expanded,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 id={this.props.id || this.props.attrs.id}
                 style={{
                    ...this.props.style,
                    ...this.props.attrs.style,
                 }}>
                <div {...this.props.toggleAttrs}
                     ref='toggle'
                     className={cx({
                        'ui-disclosure-toggle': true,
                        [this.props.toggleAttrs.className]: !!this.props.toggleAttrs.className,
                     })}
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
    attrs: React.PropTypes.object,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    onExpand: React.PropTypes.func,
    onHide: React.PropTypes.func,
    style: React.PropTypes.object,
    teaser: React.PropTypes.node,
    toggleAttrs: React.PropTypes.object,
};

UIProgressiveDisclosure.defaultProps = {
    attrs: {},
    expanded: false,
    onExpand: noop,
    onHide: noop,
    toggleAttrs: {},
};

export default UIProgressiveDisclosure;
