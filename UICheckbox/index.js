/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

import React, {PropTypes} from 'react';
import omit from 'lodash.omit';
import cx from 'classnames';

import UIView from '../UIView';
import noop from '../UIUtils/noop';
import uuid from '../UIUtils/uuid';

export default class UICheckbox extends UIView {
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

    static internal_keys = Object.keys(UICheckbox.propTypes)

    static defaultProps = {
        inputProps: {
            checked: false,
            indeterminate: false,
        },
        labelProps: {},
        onChecked: noop,
        onUnchecked: noop,
    }

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

        if (typeof this.props.inputProps.onChange === 'function') {
            this.props.inputProps.onChange(event);
        }
    }

    handleClick = (event) => {
        if (this.props.inputProps.disabled) { return; }

        this.refs.input.focus();

        if (typeof this.props.inputProps.onClick === 'function') {
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
                className={cx({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.inputProps.indeterminate,
                    'ui-checkbox-checked': this.props.inputProps.checked,
                    'ui-checkbox-unchecked': !this.props.inputProps.indeterminate && !this.props.inputProps.checked,
                    [this.props.inputProps.className]: !!this.props.inputProps.className,
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
                    className={cx({
                        'ui-checkbox-label': true,
                        [this.props.labelProps.className]: !!this.props.labelProps.className,
                    })}
                    htmlFor={this.props.inputProps.id || this.id}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div
                {...omit(this.props, UICheckbox.internal_keys)}
                ref='wrapper'
                className={cx({
                    'ui-checkbox-wrapper': true,
                    [this.props.className]: !!this.props.className,
                })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}
