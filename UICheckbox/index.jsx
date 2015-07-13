import UIView from '../UIView';
import React from 'react';

let noop = function noop() {};

class UICheckbox extends UIView {
    initialState() {
        return {
            indeterminate: this.props.indeterminate,
            uuid: this.uuid(),
            checked: this.props.indeterminate ? false : this.props.checked
        };
    }

    componentDidMount() {
        if (this.props.autofocus) {
            React.findDOMNode(this.refs.checkbox).focus();
        }

        if (this.state.indeterminate) {
            this.setIndeterminate();
        }
    }

    componentDidUpdate() {
        if (this.state.indeterminate) {
            this.setIndeterminate();
        }
    }

    getClassNames() {
        let classes = ['ui-checkbox'];

        if (this.state.checked) {
            classes.push('ui-checkbox-checked');
        } else if (this.props.indeterminate) {
            classes.push('ui-checkbox-mixed');
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
                id={this.props.id || this.state.uuid}
                className={this.getClassNames()}
                aria-checked={this.state.checked}
                checked={this.state.checked}
                onChange={this.handleChange.bind(this)} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label
                    ref='label'
                    className='ui-checkbox-label'
                    htmlFor={this.props.id || this.state.uuid}>
                    {this.props.label}
                </label>
            );
        }
    }

    setIndeterminate() {
        React.findDOMNode(this.refs.checkbox).indeterminate = true;
    }

    handleChange(event) {
        event.persist();

        this.setState({
            checked: !this.state.checked,
            indeterminate: false
        }, () => {
            this.props[this.state.checked ? 'onChecked' : 'onUnchecked'](event);
            this.props.onChange(event);
        });
    }
}

UICheckbox.defaultProps = {
    onChange: noop,
    onChecked: noop,
    onUnchecked: noop
};

UICheckbox.propTypes = {
    autofocus: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    id: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    label: React.PropTypes.node,
    onChange: React.PropTypes.func,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func
};

export default UICheckbox;
