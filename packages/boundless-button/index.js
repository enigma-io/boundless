import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

/**
__A control with "pressed" state support.__

Button has two modes of operation:

1. stateless (like a normal `<button>`)
   ```jsx
   <Button onPressed={doSomething}>foo</Button>
   ```

   > Note that instead of `onClick`, Button uses `onPressed`. This is because the component also listens for keyboard <kbd>Enter</kbd> events, so `onClick` only tells half the story. You can still bind to that particular React event though if there's a need to tell the difference between clicks and Enter presses.

2. stateful (like a toggle, e.g. bold-mode in a rich text editor)

   "stateful" mode is triggered by passing a boolean to `props.pressed`. This enables the button to act like a controlled component. The `onUnpressed` event callback will also now be fired when appropriate.

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
        /**
         * Any valid HTML tag name or a ReactComponent, anything that can be passed as the
         * first argument to `React.createElement`; note that this component sets the `role` and `aria-checked`
         * attributes so non-`<button>` elements will still behave like a button for screen readers
         */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
         * use this callback instead of `onClick` (it's `onClick` + `onKeyDown:Enter`); fires for both button modes
         */
        onPressed: PropTypes.func,

        /**
         * called when the element becomes "unpressed"; only fires when the Button is in stateful mode
         */
        onUnpressed: PropTypes.func,

        /**
         * passthrough to `aria-pressed`; using this prop turns on the `onUnpressed` callback when applicable
         */
        pressed: PropTypes.bool,
    }

    static defaultProps = {
        component: 'button',
        onClick: () => {},
        onKeyDown: () => {},
        onPressed: () => {},
        onUnpressed: () => {},
        pressed: undefined,
    }

    static internalKeys = Object.keys(Button.defaultProps)

    fireStatefulCallback(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    }

    handleClick = (event) => {
        if (this.props.disabled) { return; }

        this.props.onClick(event);
        this.fireStatefulCallback(event);
    }

    handleKeyDown = (event) => {
        if (this.props.disabled) { return; }

        this.props.onKeyDown(event);

        switch (event.key) {
        case 'Enter':
        case 'Space':
            event.preventDefault();
            this.fireStatefulCallback(event);
        }
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, Button.internalKeys)}
                className={cx('b-button', this.props.className, {
                    'b-button-pressable': this.props.pressed !== undefined,
                    'b-button-pressed': this.props.pressed,
                })}
                aria-pressed={this.props.pressed}
                role='button'
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}>
                {this.props.children}
            </this.props.component>
        );
    }
}
