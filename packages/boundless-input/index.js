import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

const isFunction = (x) => typeof x === 'function';

/**
Input abstracts away the cross-platform differences of placeholder styling and behaviors, for example: Internet Explorer dismisses native placeholders on input focus and other platforms do not. This component ensures that text input controls will feel and behave similarly on more devices.

## Component Instance Methods

When using `Input` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __getValue()__
  returns the current value of the input field

- __setValue(string)__
  programmatically set the input value; useful for clearing out the input in "uncontrolled" mode -- note that digging into the internals and setting the `refs.field.value = ''` directly will not trigger events and messes up the internal state of the component

 */
export default class Input extends React.PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * overrides the HTML container tag
         */
        component: PropTypes.string,

        /**
         * triggers the placeholder to disappear when the input field is focused, reappears when the user has tabbed away or focus is moved
         */
        hidePlaceholderOnFocus: PropTypes.bool,

        inputProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,

            defaultValue: PropTypes.string,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            onChange: PropTypes.func,
            placeholder: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string,
        }),
    }

    static defaultProps = {
        component: 'div',
        hidePlaceholderOnFocus: true,
        inputProps: {
            type: 'text',
        },
    }

    static internalKeys = Object.keys(Input.defaultProps)

    state = {
        input: '',
        isControlled: typeof this.props.inputProps.value === 'string',
        isFocused: false,
    }

    componentWillMount() {
        if (this.state.isControlled === true) {
            return this.setInputValue(this.props.inputProps.value);
        }

        this.setInputValue(this.props.inputProps.defaultValue);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setInputValue(nextProps.inputProps.value);
        }
    }

    setInputValue = (value = '') => this.setState({input: value})

    getValue = () => this.refs.field.value

    setValue(nextValue) {
        this.setInputValue(nextValue);
        this.refs.field.value = nextValue;

        if (this.state.isControlled === true) {
            // simulate input change event flow
            this.refs.field.dispatchEvent(new Event('input', {bubbles: true}));
            this.refs.field.dispatchEvent(new Event('change', {bubbles: true}));
        }
    }

    handleBlur = (event) => {
        this.setState({isFocused: false});

        if (isFunction(this.props.inputProps.onBlur) === true) {
            this.props.inputProps.onBlur(event);
        }
    }

    handleFocus = (event) => {
        this.setState({isFocused: true});

        if (isFunction(this.props.inputProps.onFocus) === true) {
            this.props.inputProps.onFocus(event);
        }
    }

    handleChange = (event) => {
        // for "controlled" scenarios, updates to the cached input text should come
        // exclusively via props (cWRP) so it exactly mirrors the current application
        // state, otherwise a re-render will occur before the new text has completed its
        // feedback loop and the cursor position is lost
        if (this.state.isControlled === false) {
            this.setInputValue(event.target.value);
        }

        if (isFunction(this.props.inputProps.onChange) === true) {
            this.props.inputProps.onChange(event);
        }
    }

    getPlaceholderText() {
        const isNonEmpty = this.state.input !== '';
        const shouldShowPlaceholder = this.props.hidePlaceholderOnFocus === true
                                      ? this.state.isFocused === false && isNonEmpty === false
                                      : isNonEmpty === false;

        return shouldShowPlaceholder ? this.props.inputProps.placeholder : '';
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, Input.internalKeys)}
                className={cx('b-input-wrapper', this.props.className)}
                title={this.getPlaceholderText()}>
                <input
                    {...this.props.inputProps}
                    ref='field'
                    className={cx('b-input', this.props.inputProps.className)}
                    placeholder={null}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange} />

                <div className='b-input-placeholder b-input'>
                    {this.getPlaceholderText()}
                </div>
            </this.props.component>
        );
    }
}
