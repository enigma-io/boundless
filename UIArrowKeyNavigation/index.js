import React from 'react';
import UIView from '../UIView';
import {findDOMNode} from 'react-dom';

class UIArrowKeyNavigation extends UIView {
    constructor(...args) {
        super(...args);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    initialState() {
        return {
            activeChildIndex: null,
        };
    }

    componentDidUpdate() {
        if (this.state.activeChildIndex !== null) {
            const numChildren =   this.props.children
                                ? (Array.prototype.concat(this.props.children)).length
                                : 0;

            if (numChildren === 0) {
                this.setState(this.initialState()); // eslint-disable-line react/no-did-update-set-state
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setFocus(numChildren - 1);
            }
        }
    }

    setFocus(index) {
        (
            this.refs.wrapper instanceof HTMLElement
          ? this.refs.wrapper
          : findDOMNode(this.refs.wrapper)
        ).children[index].focus();
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

        this.setFocus(nextIndex);
    }

    handleKeyDown(event) {
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

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    handleChildBlur(index) {
        if (this.state.activeChildIndex === index) {
            this.setState({activeChildIndex: null});
        }
    }

    handleChildFocus(index) {
        this.setState({activeChildIndex: index});
    }

    children() {
        return this.props.children && Array.prototype.concat(this.props.children).map((child, index) => {
            return React.cloneElement(child, {
                key: child.key || index,
                tabIndex: child.tabIndex || 0,
                onBlur: this.handleChildBlur.bind(this, index),
                onFocus: this.handleChildFocus.bind(this, index),
            });
        });
    }

    render() {
        return React.createElement(this.props.component, {
            ...this.props,
            ref: 'wrapper',
            onKeyDown: this.handleKeyDown,
        }, this.children());
    }
}

UIArrowKeyNavigation.propTypes = {
    component: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
    ]),
};

UIArrowKeyNavigation.defaultProps = {
    component: 'div',
};

export default UIArrowKeyNavigation;
