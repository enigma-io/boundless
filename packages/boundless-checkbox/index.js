import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

/**
 * # Checkbox

 * __An accessible checkbox with indeterminate support.__

 * Checkbox is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onChecked` and `onUnchecked` that a controller view must intercept and apply against the data provider.

 * > The UIKit Team recommends reviewing the [Checkbox](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW9) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Checkbox` in your project.

 * ### Interactions

 * Type | Context | Expectation
 * ---- | ------- | -----------
 * __Keyboard__ | `[Enter, Space]` | should toggle the `checked` state
 * __Mouse__ | `click` | should toggle the `checked` state, focus the checkbox
 *
 * Events will not be proxied if the input is in "disabled" state, via the HTML5 `disabled` attribute.
 */
export default class Checkbox extends React.PureComponent {
    static propTypes = {
        /**
         * all input-specific props like `value`, `name`, etc should be passed here -- common ones are listed below.
         * Also supports any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox` node
         */
        inputProps: PropTypes.shape({
            /**
             * determines if the checkbox is rendered as checked/unchecked, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))
             */
            checked: PropTypes.bool,

            className: PropTypes.string,

            /**
             * prevents the `on{Checked,Unchecked}` events from firing when `true`
             */
            disabled: PropTypes.bool,
            id: PropTypes.string,

            /**
             * enables or disables "mixed" checkbox state, read this [CSS-Tricks article](https://css-tricks.com/indeterminate-checkboxes/)  for more information and examples
             */
            indeterminate: PropTypes.bool,

            onChange: PropTypes.func,
            onClick: PropTypes.func,

            /**
             * rendered as the input control's form name
             */
            name: PropTypes.string,

            /**
             *  passed-through to the input node, like `name`
             */
            value: PropTypes.string,
        }),

        /**
         * any React-renderable content, most commonly a simple string
         */
        label: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-label` node
         */
        labelProps: PropTypes.object,

        /**
         * called when the element becomes checked; backing data must be updated to persist the state change
         */
        onChecked: PropTypes.func,

        /**
         * called when the element becomes unchecked; backing data must be updated to persist the state change
         */
        onUnchecked: PropTypes.func,
    }

    static defaultProps = {
        inputProps: {
            checked: false,
            indeterminate: false,
        },
        label: null,
        labelProps: {},
        onChecked: noop,
        onUnchecked: noop,
    }

    static internalKeys = Object.keys(Checkbox.defaultProps)

    id = uuid()

    componentDidMount() {
        if (this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.inputProps.indeterminate !== this.props.inputProps.indeterminate) {
            this.setIndeterminate();
        }
    }

    setIndeterminate() {
        this.refs.input.indeterminate = !!this.props.inputProps.indeterminate;
    }

    handleChange = (event) => { // Send the opposite signal from what was passed to toggle the data
        if (this.props.inputProps.disabled) { return; }

        this.props[!this.props.inputProps.checked ? 'onChecked' : 'onUnchecked'](this.props.inputProps.name);

        if (isFunction(this.props.inputProps.onChange)) {
            this.props.inputProps.onChange(event);
        }
    }

    handleClick = (event) => {
        if (this.props.inputProps.disabled) { return; }

        this.refs.input.focus();

        if (isFunction(this.props.inputProps.onClick)) {
            this.props.inputProps.onClick(event);
        }
    }

    getAriaState() {
        return this.props.inputProps.indeterminate ? 'mixed' : String(this.props.inputProps.checked);
    }

    renderInput() {
        return (
            <input
                {...omit(this.props.inputProps, 'indeterminate')}
                ref='input'
                type='checkbox'
                className={cx('b-checkbox', this.props.inputProps.className, {
                    'b-checkbox-mixed': this.props.inputProps.indeterminate,
                    'b-checkbox-checked': this.props.inputProps.checked,
                    'b-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked,
                })}
                id={this.props.inputProps.id || this.id}
                aria-checked={this.getAriaState()}
                onChange={this.handleChange}
                onClick={this.handleClick} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label
                    {...this.props.labelProps}
                    ref='label'
                    className={cx('b-checkbox-label', this.props.labelProps.className)}
                    htmlFor={this.props.inputProps.id || this.id}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div
                {...omit(this.props, Checkbox.internalKeys)}
                ref='wrapper'
                className={cx('b-checkbox-wrapper', this.props.className)}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}
