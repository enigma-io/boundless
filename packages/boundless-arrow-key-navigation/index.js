import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import isFunction from '../boundless-utils-is-function/index';
import omit from '../boundless-utils-omit-keys/index';

/**
# ArrowKeyNavigation
__A higher-order component for arrow key navigation on a grouping of children.__

ArrowKeyNavigation is designed not to care about the component types it is wrapping. Due to this, you can pass
whatever HTML tag you like into `props.component` or even a React component you've made elsewhere. Additional
props passed to `<ArrowKeyNavigation ...>` will be forwarded on to the component or HTML tag name you've supplied.

The children, similarly, can be any type of component.

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | ⬅️ `Left` | move focus to previous child if `props.mode` is `ArrowKeyNavigation.mode.HORIZONTAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ➡️ `Right` | move focus to next child if `props.mode` is `ArrowKeyNavigation.mode.HORIZONTAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ⬆️ `Up` | move focus to previous child if `props.mode` is `ArrowKeyNavigation.mode.VERTICAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ⬇️ `Down` | move focus to next child if `props.mode` is `ArrowKeyNavigation.mode.VERTICAL` or `ArrowKeyNavigation.mode.BOTH`
 */
export default class ArrowKeyNavigation extends React.PureComponent {
    static mode = {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL',
        BOTH: 'BOTH',
    }

    static propTypes = {
        /**
            Any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
        */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
            Allows for a particular child to be initially reachable via tabbing
        */
        defaultActiveChildIndex: PropTypes.number,

        /**
            Controls when arrow key presses will be caught by component and result in the active item being incremented or decremented
        */
        mode: PropTypes.oneOf(Object.keys(ArrowKeyNavigation.mode)),
    }

    static defaultProps = {
        component: 'div',
        defaultActiveChildIndex: 0,
        mode: ArrowKeyNavigation.mode.BOTH,
    }

    static internalKeys = Object.keys(ArrowKeyNavigation.defaultProps)

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
            if (this.props.mode === ArrowKeyNavigation.mode.VERTICAL
                || this.props.mode === ArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(-1);
            }

            break;

        case 'ArrowLeft':
            if (this.props.mode === ArrowKeyNavigation.mode.HORIZONTAL
                || this.props.mode === ArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(-1);
            }

            break;

        case 'ArrowDown':
            if (this.props.mode === ArrowKeyNavigation.mode.VERTICAL
                || this.props.mode === ArrowKeyNavigation.mode.BOTH) {
                event.preventDefault();
                this.moveFocus(1);
            }

            break;

        case 'ArrowRight':
            if (this.props.mode === ArrowKeyNavigation.mode.HORIZONTAL
                || this.props.mode === ArrowKeyNavigation.mode.BOTH) {
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
        if (event.target.hasAttribute('data-focus-index')) {
            const index = parseInt(event.target.getAttribute('data-focus-index'), 10);
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
                'data-focus-index': index,
                'data-skip': parseInt(child.props.tabIndex, 10) === -1 || undefined,
                key: child.key || index,
                tabIndex: this.state.activeChildIndex === index ? 0 : -1,
            });
        });
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, ArrowKeyNavigation.internalKeys)}
                ref='wrapper'
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}>
                {this.children()}
            </this.props.component>
        );
    }
}
