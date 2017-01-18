import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

/**
# Radio
__An accessible radio form control.__

Radio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.

> The Boundless Team recommends reviewing the [Radio Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW10) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Radio` in your project.

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (not selected) | should trigger `onSelected`
__Mouse__ | `click` (not selected) | should trigger `onSelected`
 */
export default class Radio extends React.PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-radio` node
         */
        inputProps: PropTypes.object,

        /**
         * any React-renderable content, most commonly a simple string
         */
        label: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-radio-label` node
         */
        labelProps: PropTypes.object,

        /**
         * passthrough to the HTML `name` attribute on the `.b-radio` node
         */
        name: PropTypes.string.isRequired,

        /**
         * called when the element becomes selected; backing data must be updated to persist the state change
         */
        onSelected: PropTypes.func,

        /**
         * determines the activation state of the radio control, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))
         */
        selected: PropTypes.bool,

        /**
         * passthrough to the HTML `value` attribute on the `.b-radio` node
         */
        value: PropTypes.string.isRequired,
    }

    static defaultProps = {
        inputProps: {},
        label: null,
        labelProps: {},
        name: '',
        onSelected: noop,
        selected: false,
        value: '',
    }

    static internalKeys = Object.keys(Radio.defaultProps)

    uuid = uuid()

    handleChange = (event) => {
        if (event.target.checked) {
            this.props.onSelected(event.target.value);
        }

        /* istanbul ignore else */
        if (isFunction(this.props.inputProps.onChange)) {
            this.props.inputProps.onChange(event);
        }
    }

    renderInput() {
        return (
            <input
                {...this.props.inputProps}
                ref='input'
                type='radio'
                id={this.props.id || this.props.inputProps.id || this.uuid}
                className={cx('b-radio', this.props.inputProps.className, {
                    'b-radio-selected': this.props.selected,
                })}
                name={this.props.name}
                value={this.props.value}
                checked={this.props.selected}
                aria-checked={String(this.props.selected)}
                onChange={this.handleChange} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label
                    {...this.props.labelProps}
                    ref='label'
                    className={cx('b-radio-label', this.props.labelProps.className)}
                    htmlFor={this.props.id || this.props.inputProps.id || this.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div
                {...omit(this.props, Radio.internalKeys)}
                ref='wrapper'
                className={cx('b-radio-wrapper', this.props.className)}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}
