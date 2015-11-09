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
            uuid: this.props.id || this.uuid()
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
                {...this.props}
                ref='input'
                type='radio'
                id={this.state.uuid}
                className={cx({
                    'ui-radio': true,
                    'ui-radio-selected': this.props.selected,
                    [this.props.className]: !!this.props.className
                })}
                checked={this.props.selected}
                aria-checked={String(this.props.selected)}
                onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelAttributes}
                       ref='label'
                       className={cx({
                           'ui-radio-label': true,
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
                     'ui-radio-wrapper': true,
                     [this.props.wrapperAttributes.className]: !!this.props.wrapperAttributes.className
                 })}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UIRadio.propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    name: React.PropTypes.string,
    onSelected: React.PropTypes.func,
    selected: React.PropTypes.bool,
    wrapperAttributes: React.PropTypes.object
};

UIRadio.defaultProps = {
    labelAttributes: {},
    onSelected: noop,
    selected: false,
    wrapperAttributes: {}
};

export default UIRadio;
