import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../UIUtils/isFunction';
import noop from '../UIUtils/noop';
import omit from '../UIUtils/omit';
import uuid from '../UIUtils/uuid';

/**
 * An accessible radio form control.
 */
export default class UIRadio extends React.PureComponent {
    static propTypes = {
        inputProps: PropTypes.object,
        label: PropTypes.node,
        labelProps: PropTypes.object,
        name: PropTypes.string.isRequired,
        onSelected: PropTypes.func,
        selected: PropTypes.bool,
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

    static internalKeys = Object.keys(UIRadio.defaultProps)

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
                className={cx('ui-radio', this.props.inputProps.className, {
                    'ui-radio-selected': this.props.selected,
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
                    className={cx('ui-radio-label', this.props.labelProps.className)}
                    htmlFor={this.props.id || this.props.inputProps.id || this.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div
                {...omit(this.props, UIRadio.internalKeys)}
                ref='wrapper'
                className={cx('ui-radio-wrapper', this.props.className)}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}
