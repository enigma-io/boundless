import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';

/**
 * Hide content until it's needed.
 */
export default class ProgressiveDisclosure extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        expanded: PropTypes.bool,
        onExpand: PropTypes.func,
        onHide: PropTypes.func,
        teaser: PropTypes.node,
        teaserExpanded: PropTypes.node,
        toggleProps: PropTypes.object,
    }

    static defaultProps = {
        children: null,
        component: 'div',
        expanded: false,
        onExpand: noop,
        onHide: noop,
        teaser: null,
        teaserExpanded: null,
        toggleProps: {},
    }

    static internalKeys = Object.keys(ProgressiveDisclosure.defaultProps)

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
        if (isFunction(this.props.toggleProps.onClick)) {
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
        if (isFunction(this.props.toggleProps.onKeyDown)) {
            this.props.toggleProps.onKeyDown(event);
        }
    }

    renderContent() {
        if (this.state.expanded) {
            return (
                <div ref='content'
                     className='b-disclosure-content'>
                    {this.props.children}
                </div>
            );
        }
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, ProgressiveDisclosure.internalKeys)}
                ref='wrapper'
                className={cx('b-disclosure', this.props.className, {
                   'b-disclosure-expanded': this.state.expanded,
                })}>

                <div
                    {...this.props.toggleProps}
                    ref='toggle'
                    className={cx('b-disclosure-toggle', this.props.toggleProps.className)}
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    tabIndex='0'>
                    {this.state.expanded ? this.props.teaserExpanded || this.props.teaser : this.props.teaser}
                </div>

                {this.renderContent()}
            </this.props.component>
        );
    }
}
