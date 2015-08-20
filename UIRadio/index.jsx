/**
 * An accessible radio form control.
 * @class UIRadio
 */

import UIView from '../UIView';
import React from 'react';
import {noop} from 'lodash';

class UIRadio extends UIView {
    initialState() {
        return {
            uuid: this.props.id || this.uuid()
        };
    }

    getInputClasses() {
        let classes = ['ui-radio'];

        if (this.props.selected) {
            classes.push('ui-radio-selected');
        }

        return classes.concat(this.props.className || []).join(' ');
    }

    getLabelClasses() {
        return ['ui-radio-label'].concat(this.props.labelAttributes.className || []).join(' ');
    }

    getWrapperClasses() {
        return ['ui-radio-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }

    renderInput() {
        return (
            <input
                {...this.props}
                ref='input'
                type='radio'
                id={this.state.uuid}
                className={this.getInputClasses()}
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
                       className={this.getLabelClasses()}
                       htmlFor={this.state.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    handleChange() { // Send the opposite signal from what was passed to toggle the data
        if (!this.props.selected) {
            this.props.onSelected(this.props.name);
        }
    }
}

UIRadio.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    id: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    name: React.PropTypes.string,
    onSelected: React.PropTypes.func,
    selected: React.PropTypes.bool,
    wrapperAttributes: React.PropTypes.object
};

UIRadio.defaultProps = {
    selected: false,
    labelAttributes: {},
    onSelected: noop,
    wrapperAttributes: {}
};

export default UIRadio;
