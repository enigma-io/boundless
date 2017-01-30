import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

const isFunction = (x) => typeof x === 'function';
const noop = () => {};

/**
__Hide content until it's needed, with configurable teasers.__

Mechanically, hidden disclosure content is not rendered to the DOM until it is needed.
 */
export default class ProgressiveDisclosure extends React.PureComponent {
    static propTypes = {
        /** if a function is passed, it will not be called until the disclosure content is due to be rendered */
        children: PropTypes.any,

        /**
         * any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
         */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
         * allows the disclosure to be rendered expanded by default
         */
        expanded: PropTypes.bool,

        /**
         * called when the content is shown; not called on initial render
         */
        onExpand: PropTypes.func,

        /**
         * called when the content is hidden; not called on initial render
         */
        onHide: PropTypes.func,

        /**
         * content to be shown next to the expansion toggle, e.g. "Advanced Options"
         */
        teaser: PropTypes.node,

        /**
         * content to be shown next to the expansion toggle when the disclosure is in "expanded" state, e.g. "Hide Advanced Options"
         */
        teaserExpanded: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-disclosure-toggle` node
         */
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
                    {isFunction(this.props.children) ? this.props.children() : this.props.children}
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
