/**
 * An accessible radio form control.
 * @class UIRadio
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIRadio extends UIView {
    initialState() {
        return {
            id: this.props.inputProps.id || this.uuid(),
        };
    }

    handleChange(event) {
        if (event.target.checked) {
            this.props.onSelected(event.target.value);
        }

        if (typeof this.props.inputProps.onChange === 'function') {
            event.persist();
            this.props.inputProps.onChange(event);
        }
    }

    renderInput() {
        return (
            <input {...this.props.inputProps}
                   ref='input'
                   type='radio'
                   id={this.state.id}
                   className={cx({
                       'ui-radio': true,
                       'ui-radio-selected': this.props.selected,
                       [this.props.inputProps.className]: !!this.props.inputProps.className,
                   })}
                   name={this.props.name}
                   value={this.props.value}
                   checked={this.props.selected}
                   aria-checked={String(this.props.selected)}
                   onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelProps}
                       ref='label'
                       className={cx({
                           'ui-radio-label': true,
                           [this.props.labelProps.className]: !!this.props.labelProps.className,
                       })}
                       htmlFor={this.state.id}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                     'ui-radio-wrapper': true,
                     [this.props.className]: !!this.props.className,
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UIRadio.propTypes = {
    inputProps: React.PropTypes.object,
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onSelected: React.PropTypes.func,
    selected: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
};

UIRadio.defaultProps = {
    inputProps: {},
    labelProps: {},
    onSelected: noop,
    selected: false,
};

export default UIRadio;
