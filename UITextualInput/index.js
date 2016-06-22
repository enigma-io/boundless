import React, {PropTypes} from 'react';
import UIView from '../UIView';
import cx from 'classnames';

const is_function = test => typeof test === 'function';
const is_string = test => typeof test === 'string';

export default class UITextualInput extends UIView {
    static propTypes = {
        hidePlaceholderOnFocus: PropTypes.bool,
        inputProps: PropTypes.shape({
            defaultValue: PropTypes.string,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            onChange: PropTypes.func,
            onInput: PropTypes.func,
            placeholder: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string,
        }),
    }

    static defaultProps = {
        hidePlaceholderOnFocus: true,
        inputProps: {
            type: 'text',
        },
    }

    state = {
        input: '',
        is_controlled: is_string(this.props.inputProps.value),
        is_focused: false,
    }

    componentWillMount() {
        if (this.state.is_controlled === true) {
            return this.setState({input: this.props.inputProps.value || ''});
        }

        this.setState({input: this.props.inputProps.defaultValue || ''});
    }

    componentWillReceiveProps(next_props) {
        if (next_props.inputProps.value !== this.props.inputProps.value) {
            this.setState({input: next_props.inputProps.value});
        }
    }

    getValue() {
        return this.refs.field.value;
    }

    setValue(next_value) {
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

    handleChange = event => {
        this.setState({input: event.target.value});

        if (is_function(this.props.inputProps.onChange) === true) {
            event.persist();
            this.props.inputProps.onChange(event);
        }
    }

    handleInput = event => {
        this.setState({input: event.target.value});

        if (is_function(this.props.inputProps.onInput) === true) {
            event.persist();
            this.props.inputProps.onInput(event);
        }
    }

    getPlaceholderText() {
        const is_non_empty = this.state.input !== '';
        const should_show_placeholder =   this.props.hidePlaceholderOnFocus === true
                                        ? this.state.is_focused === false && is_non_empty === false
                                        : is_non_empty === false;

        return should_show_placeholder ? this.props.inputProps.placeholder : '';
    }

    renderPlaceholder() {
        return (
            <div ref='placeholder' className='ui-textual-input-placeholder ui-textual-input'>
                {this.getPlaceholderText()}
            </div>
        );
    }

    render() {
        const {props} = this;

        return (
            <div
                {...props}
                ref='wrapper'
                className={cx({
                    'ui-textual-input-wrapper': true,
                    [props.className]: Boolean(props.className),
                })}
                title={this.getPlaceholderText()}>
                {this.renderPlaceholder()}

                <input
                    {...props.inputProps}
                    ref='field'
                    className={cx({
                        'ui-textual-input': true,
                        [props.inputProps.className]: Boolean(props.inputProps.className),
                    })}
                    placeholder={null}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    onInput={this.handleInput} />
            </div>
        );
    }
}
