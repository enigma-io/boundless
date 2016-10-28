import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import isFunction from '../UIUtils/isFunction';
import omit from '../UIUtils/omit';

export default class UIArrowKeyNavigation extends React.PureComponent {
    static mode = {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL',
        BOTH: 'BOTH',
    }

    static propTypes = {
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        defaultActiveChildIndex: PropTypes.number,

        mode: PropTypes.oneOf([
            UIArrowKeyNavigation.mode.HORIZONTAL,
            UIArrowKeyNavigation.mode.VERTICAL,
            UIArrowKeyNavigation.mode.BOTH,
        ]),
    }

    static internalKeys = Object.keys(UIArrowKeyNavigation.propTypes)

    static defaultProps = {
        component: 'div',
        defaultActiveChildIndex: 0,
        mode: UIArrowKeyNavigation.mode.BOTH,
    }

    state = {
        activeChildIndex: this.props.defaultActiveChildIndex,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeChildIndex !== prevState.activeChildIndex) {
            this.setFocus(this.state.activeChildIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeChildIndex !== 0) {
            const numChildren =   nextProps.children
                                ? React.Children.count(nextProps.children)
                                : 0;

            if (numChildren === 0) {
                this.setState({activeChildIndex: 0});
            } else if (this.state.activeChildIndex >= numChildren) {
                this.setState({activeChildIndex: numChildren - 1});
            }
        }
    }

    setFocus(index) {
        const childNode = (
            this.refs.wrapper instanceof HTMLElement
          ? this.refs.wrapper
          : findDOMNode(this.refs.wrapper)
        ).children[index];

        if (childNode && childNode.hasAttribute('data-skip')) {
            this.moveFocus(
                childNode.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
            );
        } else if (childNode && document.activeElement !== childNode) {
            childNode.focus();
        }
    }

    moveFocus(delta) {
        const numChildren = this.props.children
                            ? React.Children.count(this.props.children)
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
            if (this.props.mode === UIArrowKeyNavigation.mode.VERTICAL
                || this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(-1);
            }

            break;

        case 'ArrowLeft':
            if (this.props.mode === UIArrowKeyNavigation.mode.HORIZONTAL
                || this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(-1);
            }

            break;

        case 'ArrowDown':
            if (this.props.mode === UIArrowKeyNavigation.mode.VERTICAL
                || this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(1);
            }

            break;

        case 'ArrowRight':
            if (this.props.mode === UIArrowKeyNavigation.mode.HORIZONTAL
                || this.props.mode === UIArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(1);
            }

            break;
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    handleFocus = (event) => {
        if (event.target.hasAttribute('data-index')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            const child = React.Children.toArray(this.props.children)[index];

            this.setState({activeChildIndex: index});

            if (child.props.onFocus) {
                child.props.onFocus(event);
            }
        }
    }

    children() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                'data-index': index,
                'data-skip': parseInt(child.props.tabIndex, 10) === -1 || undefined,
                key: child.key || index,
                tabIndex: this.state.activeChildIndex === index ? 0 : -1,
            });
        });
    }

    render() {
        return React.createElement(this.props.component, {
            ...omit(this.props, UIArrowKeyNavigation.internalKeys),
            ref: 'wrapper',
            onFocus: this.handleFocus,
            onKeyDown: this.handleKeyDown,
        }, this.children());
    }
}
