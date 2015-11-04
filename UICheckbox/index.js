/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UICheckbox extends UIView {
    initialState() {
        return {
            uuid: this.props.id || this.uuid()
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

    renderInput() {
        return (
            <input
                {...this.props}
                ref='input'
                type='checkbox'
                id={this.state.uuid}
                className={cx({
                    'ui-checkbox': true,
                    'ui-checkbox-mixed': this.props.indeterminate,
                    'ui-checkbox-checked': this.props.checked,
                    'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked,
                    [this.props.className]: !!this.props.className
                })}
                aria-checked={this.ariaState()}
                onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelAttributes}
                       ref='label'
                       className={cx({
                            'ui-checkbox-label': true,
                            [this.props.labelAttributes.className]: !!this.props.labelAttributes.className
                       })}
                       htmlFor={this.state.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={cx({
                    'ui-checkbox-wrapper': true,
                    [this.props.wrapperAttributes.className]: !!this.props.wrapperAttributes.className
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UICheckbox.propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    name: React.PropTypes.string,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func,
    wrapperAttributes: React.PropTypes.object
};

UICheckbox.defaultProps = {
    checked: false,
    indeterminate: false,
    labelAttributes: {},
    onChecked: noop,
    onUnchecked: noop,
    wrapperAttributes: {}
};

export default UICheckbox;
