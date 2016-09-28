import React from 'react';
import {findDOMNode} from 'react-dom';
import omit from 'lodash.omit';

import isFunction from '../UIUtils/isFunction';
import isString from '../UIUtils/isString';

export default class UIArrowKeyNavigation extends React.PureComponent {
    static propTypes = {
        component: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func,
        ]),
    }

    static internalKeys = Object.keys(UIArrowKeyNavigation.propTypes)

    static defaultProps = {
        component: 'div',
    }

    state = {
        activeChildIndex: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== null) {
            const numChildren =   this.props.children
                                ? (Array.prototype.concat(this.props.children)).length
                                : 0;

            if (numChildren === 0) {
                this.setState({activeChildIndex: null}); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setState({activeChildIndex: numChildren - 1}); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex !== prevState.activeChildIndex) {
                this.setFocus(this.state.activeChildIndex);
            }
        }
    }

    setFocus(index) {
        const childNode = (
            this.refs.wrapper instanceof HTMLElement
          ? this.refs.wrapper
          : findDOMNode(this.refs.wrapper)
        ).children[index];

        if (childNode && childNode.getAttribute('tabindex') === '-1') {
            this.moveFocus(
                childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
            );
        } else if (childNode && document.activeElement !== childNode) {
            childNode.focus();
        }
    }

    moveFocus(delta) {
        const numChildren =   this.props.children
                            ? (Array.prototype.concat(this.props.children)).length
                            : 0;

        let nextIndex = this.state.activeChildIndex + delta;

        if (nextIndex >= numChildren) {
            nextIndex = 0; // loop
        } else if (nextIndex < 0) {
            nextIndex = numChildren - 1; // reverse loop
        }

        this.setState({activeChildIndex: nextIndex});
    }

    handleKeyDown = (event) => {
        switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault();
            this.moveFocus(-1);
            break;

        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault();
            this.moveFocus(1);
            break;
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    handleChildBlur(index, child, event) {
        if (this.state.activeChildIndex === index) {
            this.setState({activeChildIndex: null});
        }

        event.stopPropagation();

        if (!isString(child) && isFunction(child.props.onBlur)) {
            child.props.onBlur(event);
        }
    }

    handleChildFocus(index, child, event) {
        this.setState({activeChildIndex: index});

        event.stopPropagation();

        if (!isString(child) && isFunction(child.props.onFocus)) {
            child.props.onFocus(event);
        }
    }

    children() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.props.tabIndex !== undefined ? child.props.tabIndex : 0,
                onBlur: this.handleChildBlur.bind(this, index, child),
                onFocus: this.handleChildFocus.bind(this, index, child),
            });
        });
    }

    render() {
        return React.createElement(this.props.component, {
            ...omit(this.props, UIArrowKeyNavigation.internalKeys),
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown,
        }, this.children());
    }
}
