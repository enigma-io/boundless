import UIView from '../UIView';
import React from 'react';
import _ from 'lodash';

class UICheckbox extends UIView {
    initialState() {
        return {
            uuid: this.uuid()
        };
    }

    componentDidMount() {
        if (this.props.autofocus) {
            React.findDOMNode(this.refs.checkbox).focus();
        }

        this.setIndeterminate();
    }

    componentDidUpdate() {
        this.setIndeterminate();
    }

    getClassNames() {
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

    render() {
        return (
            <div className='ui-checkbox-wrapper'>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }

    renderInput() {
        return (
            <input
                {...this.props}
                ref='checkbox'
                type='checkbox'
                label={null}
                id={this.state.uuid}
                className={this.getClassNames()}
                aria-checked={this.ariaState()}
                checked={this.props.checked}
                onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label
                    ref='label'
                    className='ui-checkbox-label'
                    htmlFor={this.state.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    ariaState() {
        if (this.props.indeterminate) {
            return 'mixed';
        }

        return this.props.checked;
    }

    setIndeterminate() {
        if (typeof this.props.indeterminate !== 'undefined') {
            React.findDOMNode(this.refs.checkbox).indeterminate = this.props.indeterminate;
        }
    }

    handleChange() {
        // Send the opposite signal from what was passed to toggle the data
        this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
    }
}

UICheckbox.defaultProps = {
    checked: false,
    onChecked: _.noop,
    onUnchecked: _.noop
};

UICheckbox.propTypes = {
    autofocus: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    indeterminate: React.PropTypes.bool,
    label: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func
};

export default UICheckbox;
