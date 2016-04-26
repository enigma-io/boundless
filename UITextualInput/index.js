import React, { PropTypes } from 'react';
import UIView from '../UIView';
import cx from 'classnames';

const is_function = test => typeof test === 'function';
const is_string = test => typeof test === 'string';

export default class UITextualInput extends UIView {
    static propTypes = {
        defaultValue: PropTypes.string,
        hidePlaceholderOnFocus: PropTypes.bool,
        inputProps: PropTypes.shape({
            defaultValue: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
        }),
        name: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
    }

    static defaultProps = {
        hidePlaceholderOnFocus: false,
        inputProps: {},
        name: null,
        placeholder: '',
        type: 'text',
    }

    state = {
        input: '',
        is_controlled: is_string(this.props.inputProps.value) || is_string(this.props.value),
        is_focused: false,
    }

    componentWillMount() {
        if (this.state.is_controlled === true) {
            return this.setState({input: this.props.inputProps.value || this.props.value || ''});
        }

        this.setState({input: this.props.inputProps.defaultValue || this.props.defaultValue || ''});
    }

    componentWillReceiveProps(props) {
        if (props.inputProps.value !== this.props.inputProps.value) {
            this.setState({input: props.inputProps.value});
        } else if (props.value !== this.props.value) {
            this.setState({input: props.value});
        }
    }

    value(next_value) {
        if (this.state.is_controlled === true) {
            return console.warn('UITextualInput: a controlled component should be updated by changing its `props.value` or `props.inputProps.value`, not via programmatic methods.');
        }

        this.refs.field.value = next_value;
        this.setState({input: next_value});
    }

    handleBlur = event => {
        this.setState({is_focused: false});

        if (is_function(this.props.inputProps.onBlur) === true) {
            event.persist();
            this.props.inputProps.onBlur(event);
        }
    }

    handleFocus = event => {
        this.setState({is_focused: true});

        if (is_function(this.props.inputProps.onFocus) === true) {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    }

    handleInput = event => {
        this.setState({input: event.target.value});

        if (is_function(this.props.inputProps.onInput) === true) {
            event.persist();
            this.props.inputProps.onInput(event);
        }
    }

    renderPlaceholder() {
        const is_non_empty = Boolean(this.state.input);
        const should_show_placeholder =   this.props.hidePlaceholderOnFocus === true
                                        ? this.state.is_focused === false && is_non_empty === false
                                        : is_non_empty === false;

        return (
            <div ref='placeholder' className='ui-textual-input ui-textual-input-placeholder'>
                {should_show_placeholder ? this.props.inputProps.placeholder || this.props.placeholder : ''}
            </div>
        );
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                     'ui-textual-input-wrapper': true,
                     [this.props.className]: Boolean(this.props.className),
                 })}
                 name={null}
                 placeholder={null}
                 type={null}>
                {this.renderPlaceholder()}
                <input {...this.props.inputProps}
                       ref='field'
                       className={cx({
                           'ui-textual-input': true,
                           [this.props.inputProps.className]: Boolean(this.props.inputProps.className),
                       })}
                       defaultValue={this.props.inputProps.defaultValue || this.props.defaultValue}
                       name={this.props.inputProps.name || this.props.name}
                       placeholder={null}
                       type={this.props.inputProps.type || this.props.type}
                       value={this.props.inputProps.value || this.props.value}
                       onBlur={this.handleBlur}
                       onFocus={this.handleFocus}
                       onInput={this.handleInput} />
            </div>
        );
    }
}
