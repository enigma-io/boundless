/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

import UIView from '../UIView';
import React from 'react';
import {noop} from 'lodash';

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

    getCheckboxClasses() {
        let classes = ['ui-checkbox'];

        if (this.props.indeterminate) {
            classes.push('ui-checkbox-mixed');
        } else if (this.props.checked) {
            classes.push('ui-checkbox-checked');
        } else {
            classes.push('ui-checkbox-unchecked');
        }

        return classes.concat(this.props.className || []).join(' ');
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
                className={this.getCheckboxClasses()}
                aria-checked={this.ariaState()}
                onChange={this.handleChange.bind(this)} />
        );
    }

    getLabelClasses() {
        return ['ui-checkbox-label'].concat(this.props.labelAttributes.className || []).join(' ');
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

    getWrapperClasses() {
        return ['ui-checkbox-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
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
}

UICheckbox.propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
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
