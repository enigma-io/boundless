import React, { PropTypes } from 'react';
import UIView from '../UIView';
import cx from 'classnames';

export default class UITextualInput extends UIView {
    static propTypes = {
        defaultValue: PropTypes.string,
        hidePlaceholderOnFocus: PropTypes.bool,
        inputProps: PropTypes.object,
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
        input: this.props.defaultValue || this.props.inputProps.defaultValue || '', // ignored if in controlled-mode
        is_focused: false,
    }

    value(next_value) {
        this.refs.field.value = next_value;

        this.setState({input: next_value});
    }

    handleBlur = event => {
        this.setState({is_focused: false});

        if (typeof this.props.inputProps.onBlur === 'function') {
            event.persist();
            this.props.inputProps.onBlur(event);
        }
    }

    handleFocus = event => {
        this.setState({is_focused: true});

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    }

    handleInput = event => {
        if (typeof this.props.value !== 'string') {
            this.setState({input: event.target.value});
        }

        if (typeof this.props.inputProps.onInput === 'function') {
            event.persist();
            this.props.inputProps.onInput(event);
        }
    }

    renderPlaceholder() {
        /* If a controlled input (`props.value` being set), show the placeholder based on that state */
        const is_non_empty = typeof this.props.value === 'string' ? Boolean(this.props.value) : Boolean(this.state.input);
        const should_show_placeholder =   this.props.hidePlaceholderOnFocus
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
