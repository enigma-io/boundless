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
            id: this.props.attrs.id || this.uuid()
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
            <input {...this.props.attrs}
                   ref='input'
                   type='checkbox'
                   id={this.state.id}
                   className={cx({
                       'ui-checkbox': true,
                       'ui-checkbox-mixed': this.props.indeterminate,
                       'ui-checkbox-checked': this.props.checked,
                       'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked,
                       [this.props.className]: !!this.props.className,
                       [this.props.attrs.className]: !!this.props.attrs.className
                   })}
                   name={this.props.name}
                   checked={this.props.checked}
                   aria-checked={this.ariaState()}
                   onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelAttrs}
                       ref='label'
                       className={cx({
                            'ui-checkbox-label': true,
                            [this.props.labelAttrs.className]: !!this.props.labelAttrs.className
                       })}
                       htmlFor={this.state.id}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div {...this.props.wrapperAttrs}
                 className={cx({
                    'ui-checkbox-wrapper': true,
                    [this.props.wrapperAttrs.className]: !!this.props.wrapperAttrs.className
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UICheckbox.propTypes = {
    attrs: React.PropTypes.object,
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    label: React.PropTypes.node,
    labelAttrs: React.PropTypes.object,
    name: React.PropTypes.string,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func,
    wrapperAttrs: React.PropTypes.object
};

UICheckbox.defaultProps = {
    attrs: {},
    checked: false,
    indeterminate: false,
    labelAttrs: {},
    onChecked: noop,
    onUnchecked: noop,
    wrapperAttrs: {}
};

export default UICheckbox;
