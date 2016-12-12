import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

/**
 * An accessible checkbox with indeterminate support.
 */
export default class Checkbox extends React.PureComponent {
    static propTypes = {
        inputProps: PropTypes.shape({
            checked: PropTypes.bool,
            className: PropTypes.string,
            disabled: PropTypes.bool,
            id: PropTypes.string,
            indeterminate: PropTypes.bool,
            onChange: PropTypes.func,
            onClick: PropTypes.func,
            name: PropTypes.string,
            value: PropTypes.string,
        }),
        label: PropTypes.node,
        labelProps: PropTypes.object,
        onChecked: PropTypes.func,
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
                className={cx('ui-checkbox', this.props.inputProps.className, {
                    'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                    'ui-checkbox-checked': this.props.inputProps.checked,
                    'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked,
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
                    className={cx('ui-checkbox-label', this.props.labelProps.className)}
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
                className={cx('ui-checkbox-wrapper', this.props.className)}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}
