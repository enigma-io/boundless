import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';

/**
 * # Button
 * __A control with "pressed" state support.__

 * > The UIKit Team recommends reviewing the [Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW2) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Button` in your project.

 * Button can be used like a normal HTML `<button>`, or when provided `props.pressed`, can become stateful. Think of a stateful button as more of a "toggle", like turning on bold-mode in a rich text editor.
 */
export default class Button extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        onClick: PropTypes.func,

        /**
         * called when the element becomes "pressed" or triggered by the user (mouse or keyboard); backing data must be updated to persist the state change; this function will still be called if `props.pressed` is not passed
         */
        onPressed: PropTypes.func,

        /**
         * called when the element becomes "unpressed"; backing data must be updated to persist the state change
         */
        onUnpressed: PropTypes.func,

        /**
         * enables "pressed" support and adds the `aria-pressed` attribute to the `.ui-button` node; essentially a "stateful" button (see the "unpressed/pressed" example demo above)
         */
        pressed: PropTypes.bool,
    }

    static defaultProps = {
        children: null,
        onClick: noop,
        onPressed: noop,
        onUnpressed: noop,
        pressed: undefined,
    }

    static internalKeys = Object.keys(Button.defaultProps)

    toggleState(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    }

    handleClick = (event) => {
        if (this.props.disabled) { return; }

        this.toggleState(event);

        if (isFunction(this.props.onClick)) {
            this.props.onClick(event);
        }
    }

    handleKeyDown = (event) => {
        if (this.props.disabled) { return; }

        switch (event.key) {
        case 'Enter':
        case 'Space':
            event.preventDefault();
            this.toggleState(event);
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    render() {
        return (
            <button
                {...omit(this.props, Button.internalKeys)}
                ref='button'
                className={cx('b-button', this.props.className, {
                    'b-button-pressable': typeof this.props.pressed !== 'undefined',
                    'b-button-pressed': this.props.pressed,
                })}
                aria-pressed={this.props.pressed}
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
