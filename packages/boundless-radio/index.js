import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';
import uuid from 'boundless-utils-uuid';

const isFunction = (x) => typeof x === 'function';

/**
__An accessible radio form control.__

Radio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.
 */
export default class Radio extends React.PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * override the wrapper component HTML element tag if desired
         */
        component: PropTypes.string,

        inputProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * any React-renderable content
         */
        labelContent: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),

        labelProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

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
        component: 'div',
        inputProps: {},
        labelContent: null,
        labelProps: {},
        name: '',
        onSelected: () => {},
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
        if (this.props.labelContent) {
            return (
                <label
                    {...this.props.labelProps}
                    className={cx('b-radio-label', this.props.labelProps.className)}
                    htmlFor={this.props.id || this.props.inputProps.id || this.uuid}>
                    {this.props.labelContent}
                </label>
            );
        }
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, Radio.internalKeys)}
                className={cx('b-radio-wrapper', this.props.className)}>
                {this.renderInput()}
                {this.renderLabel()}
            </this.props.component>
        );
    }
}
