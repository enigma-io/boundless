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
        input: this.props.defaultValue || this.props.inputProps.defaultValue || '',
        is_focused: false,
    }

    handle_blur = event => {
        this.setState({is_focused: false});

        if (typeof this.props.inputProps.onBlur === 'function') {
            event.persist();
            this.props.inputProps.onBlur(event);
        }
    }

    handle_focus = event => {
        this.setState({is_focused: true});

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    }

    handle_input = event => {
        if (typeof this.props.value !== 'string') {
            this.setState({input: event.target.value});
        }

        if (typeof this.props.inputProps.onInput === 'function') {
            event.persist();
            this.props.inputProps.onInput(event);
        }
    }

    render_placeholder() {
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
                {this.render_placeholder()}
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
                       onBlur={this.handle_blur}
                       onFocus={this.handle_focus}
                       onInput={this.handle_input} />
            </div>
        );
    }
}
