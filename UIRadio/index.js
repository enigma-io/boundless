/**
 * An accessible radio form control.
 * @class UIRadio
 */

import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIRadio extends UIView {
    initialState() {
        return {
            id: this.props.attrs.id || this.uuid()
        };
    }

    handleChange(event) {
        if (event.target.checked) {
            this.props.onSelected(event.target.value);
        }
    }

    renderInput() {
        return (
            <input
                {...this.props.attrs}
                ref='input'
                type='radio'
                id={this.state.id}
                className={cx({
                    'ui-radio': true,
                    'ui-radio-selected': this.props.selected,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className
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
                <label {...this.props.labelAttrs}
                       ref='label'
                       className={cx({
                           'ui-radio-label': true,
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
                     'ui-radio-wrapper': true,
                     [this.props.wrapperAttrs.className]: !!this.props.wrapperAttrs.className
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UIRadio.propTypes = {
    attrs: React.PropTypes.object,
    className: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttrs: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onSelected: React.PropTypes.func,
    selected: React.PropTypes.bool,
    wrapperAttrs: React.PropTypes.object,
    value: React.PropTypes.string.isRequired
};

UIRadio.defaultProps = {
    attrs: {},
    labelAttrs: {},
    onSelected: noop,
    selected: false,
    wrapperAttrs: {}
};

export default UIRadio;
