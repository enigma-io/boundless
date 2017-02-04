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
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /** if a function is passed, it will not be called until the disclosure content is due to be rendered */
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.func,
        ]),

        /**
         * any valid HTML tag name
         */
        component: PropTypes.string,

        /**
         * controls the ProgressDisclosure "expanded" state declaratively
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
         * any valid HTML tag name
         */
        toggleComponent: PropTypes.string,

        /**
         * content to be shown next to the expansion toggle when the disclosure is in "contracted" state, e.g. "Show Advanced Options"
         */
        toggleContent: PropTypes.node,

        /**
         * content to be shown next to the expansion toggle when the disclosure is in "expanded" state, e.g. "Hide Advanced Options"
         */
        toggleExpandedContent: PropTypes.node,

        toggleProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),
    }

    static defaultProps = {
        children: null,
        component: 'div',
        expanded: false,
        onExpand: noop,
        onHide: noop,
        toggleComponent: 'div',
        toggleContent: null,
        toggleExpandedContent: null,
        toggleProps: {},
    }

    static internalKeys = Object.keys(ProgressiveDisclosure.defaultProps)

    state = {
        expanded: this.props.expanded,
    }

    fireStatefulCallback = () => this.props[this.state.expanded ? 'onExpand' : 'onHide']()

    componentWillReceiveProps(newProps) {
        if (newProps.expanded !== this.props.expanded) {
            this.setState({expanded: newProps.expanded}, this.fireStatefulCallback);
        }
    }

    handleClick = (event) => {
        this.setState({expanded: !this.state.expanded}, this.fireStatefulCallback);

        /* istanbul ignore else */
        if (isFunction(this.props.toggleProps.onClick)) {
            this.props.toggleProps.onClick(event);
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.setState({expanded: !this.state.expanded}, this.fireStatefulCallback);
        }

        /* istanbul ignore else */
        if (isFunction(this.props.toggleProps.onKeyDown)) {
            this.props.toggleProps.onKeyDown(event);
        }
    }

    renderContent() {
        if (this.state.expanded) {
            return (
                <div className='b-disclosure-content'>
                    {isFunction(this.props.children) ? this.props.children() : this.props.children}
                </div>
            );
        }
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, ProgressiveDisclosure.internalKeys)}
                className={cx('b-disclosure', this.props.className, {
                   'b-disclosure-expanded': this.state.expanded,
                })}>

                <this.props.toggleComponent
                    {...this.props.toggleProps}
                    className={cx('b-disclosure-toggle', this.props.toggleProps.className)}
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    tabIndex='0'>
                    {this.state.expanded ? this.props.toggleExpandedContent || this.props.toggleContent : this.props.toggleContent}
                </this.props.toggleComponent>

                {this.renderContent()}
            </this.props.component>
        );
    }
}
