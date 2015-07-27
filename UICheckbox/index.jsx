import UIView from '../UIView';
import React from 'react';

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

    getLabelClasses() {
        return ['ui-checkbox-label'].concat(this.props.labelAttributes.className || []).join(' ');
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

    renderLabel() {
        if (this.props.labelContent) {
            return (
                <label {...this.props.labelAttributes}
                       ref='label'
                       className={this.getLabelClasses()}
                       htmlFor={this.state.uuid}>
                    {this.props.labelContent}
                </label>
            );
        }
    }

    ariaState() {
        return this.props.indeterminate ? 'mixed' : String(this.props.checked);
    }

    setIndeterminate() {
        React.findDOMNode(this.refs.input).indeterminate = !!this.props.indeterminate;
    }

    handleChange() { // Send the opposite signal from what was passed to toggle the data
        this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
    }
}

UICheckbox.propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    indeterminate: React.PropTypes.bool,
    labelAttributes: React.PropTypes.object,
    labelContent: React.PropTypes.node,
    name: React.PropTypes.string,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func,
    wrapperAttributes: React.PropTypes.object
};

function noop() { return; }

UICheckbox.defaultProps = {
    checked: false,
    indeterminate: false,
    labelAttributes: {},
    onChecked: noop,
    onUnchecked: noop,
    wrapperAttributes: {}
};

export default UICheckbox;
