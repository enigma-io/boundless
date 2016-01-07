/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UICheckbox extends UIView {
    initialState() {
        return {
            id: this.props.inputProps.id || this.uuid(),
        };
    }

    componentDidMount() {
        if (this.props.indeterminate) {
            this.setIndeterminate();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.setIndeterminate();
        }
    }

    setIndeterminate() {
        this.refs.input.indeterminate = !!this.props.indeterminate;
    }

    ariaState() {
        return this.props.indeterminate ? 'mixed' : String(this.props.checked);
    }

    handleChange() { // Send the opposite signal from what was passed to toggle the data
        this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
    }

    handleClick(event) {
        this.refs.input.focus();

        if (typeof this.props.handleClick === 'function') {
            event.persist();
            this.props.handleClick(event);
        }
    }

    renderInput() {
        return (
            <input {...this.props.inputProps}
                   ref='input'
                   type='checkbox'
                   id={this.state.id}
                   className={cx({
                       'ui-checkbox': true,
                       'ui-checkbox-mixed': this.props.indeterminate,
                       'ui-checkbox-checked': this.props.checked,
                       'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked,
                       [this.props.inputProps.className]: !!this.props.inputProps.className,
                   })}
                   name={this.props.name}
                   checked={this.props.checked}
                   aria-checked={this.ariaState()}
                   onChange={this.handleChange.bind(this)}
                   onClick={this.handleClick.bind(this)}
                   value={this.props.value} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelProps}
                       ref='label'
                       className={cx({
                            'ui-checkbox-label': true,
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
                    'ui-checkbox-wrapper': true,
                    [this.props.className]: !!this.props.className,
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UICheckbox.propTypes = {
    checked: React.PropTypes.bool,
    indeterminate: React.PropTypes.bool,
    inputProps: React.PropTypes.object,
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func,
    value: React.PropTypes.string,
};

UICheckbox.defaultProps = {
    checked: false,
    indeterminate: false,
    inputProps: {},
    labelProps: {},
    onChecked: noop,
    onUnchecked: noop,
};

export default UICheckbox;
