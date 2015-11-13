/**
 * An accessible checkbox with indeterminate support.
 * @class UICheckbox
 */

import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UICheckbox extends UIView {
    initialState() {
        return {
            id: this.props.inputAttrs.id || this.uuid(),
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

    ariaState() {
        return this.props.indeterminate ? 'mixed' : String(this.props.checked);
    }

    handleChange() { // Send the opposite signal from what was passed to toggle the data
        this.props[!this.props.checked ? 'onChecked' : 'onUnchecked'](this.props.name);
    }

    renderInput() {
        return (
            <input {...this.props.inputAttrs}
                   ref='input'
                   type='checkbox'
                   id={this.state.id}
                   className={cx({
                       'ui-checkbox': true,
                       'ui-checkbox-mixed': this.props.indeterminate,
                       'ui-checkbox-checked': this.props.checked,
                       'ui-checkbox-unchecked': !this.props.indeterminate && !this.props.checked,
                       [this.props.inputAttrs.className]: !!this.props.inputAttrs.className,
                   })}
                   name={this.props.name}
                   checked={this.props.checked}
                   aria-checked={this.ariaState()}
                   onChange={this.handleChange.bind(this)}
                   value={this.props.value} />
        );
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <label {...this.props.labelAttrs}
                       ref='label'
                       className={cx({
                            'ui-checkbox-label': true,
                            [this.props.labelAttrs.className]: !!this.props.labelAttrs.className,
                       })}
                       htmlFor={this.state.id}>
                    {this.props.label}
                </label>
            );
        }
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 className={cx({
                    'ui-checkbox-wrapper': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 id={this.props.id || this.props.attrs.id}
                 style={{...this.props.style, ...this.props.attrs.style}}>
                {this.renderInput()}
                {this.renderLabel()}
            </div>
        );
    }
}

UICheckbox.propTypes = {
    attrs: React.PropTypes.object,
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    inputAttrs: React.PropTypes.object,
    label: React.PropTypes.node,
    labelAttrs: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChecked: React.PropTypes.func,
    onUnchecked: React.PropTypes.func,
    style: React.PropTypes.object,
    value: React.PropTypes.string,
};

UICheckbox.defaultProps = {
    attrs: {},
    checked: false,
    indeterminate: false,
    inputAttrs: {},
    labelAttrs: {},
    onChecked: noop,
    onUnchecked: noop,
};

export default UICheckbox;
