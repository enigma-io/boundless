import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

const isFunction = (x) => typeof x === 'function';
const noop = () => {};

/**
__A control with "pressed" state support.__

Button has two modes of operation:

1. stateless (like a normal `<button>`)
   ```jsx
   <Button onPressed={doSomething}>foo</Button>
   ```

   > Note that instead of `onClick`, Button uses `onPressed`. This is because the component also listens for keyboard <kbd>Enter</kbd> events, so `onClick` only tells half the story. You can still bind to that particular React event though if there's a need to tell the difference between clicks and Enter presses.

2. stateful (like a toggle, e.g. bold-mode in a rich text editor)

   "stateful" mode is triggered by passing a boolean to `pressed`. This enables the button to act like a controlled component. The `onUnpressed` event callback will also now be fired when appropriate.

   ```jsx
   <Button
       pressed={true}
       onPressed={doSomething}
       onUnpressed={doSomethingElse}>
       foo
   </Button>
   ```
 */
export default class Button extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,

        /**
            Any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
        */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

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
         * enables "pressed" support and adds the `aria-pressed` attribute to the `.b-button` node; essentially a "stateful" button (see the "unpressed/pressed" example demo above)
         */
        pressed: PropTypes.bool,
    }

    static defaultProps = {
        children: null,
        component: 'button',
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
            <this.props.component
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
            </this.props.component>
        );
    }
}
