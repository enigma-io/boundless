/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 * @class UISegmentedControl
 */

import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UISegmentedControl extends UIView {
    handleClick(option) {
        this.props.onOptionSelected(option.value);
    }

    currentValue() {
        let value;

        this.props.options.some(option => {
            if (option.selected) {
                value = option.value;

                return true;
            }
        });

        return value;
    }

    setFocus(index) {
        this.refs['option_$' + index].focus();
    }

    getNextOptionIndex(currentOptionIndex) {
        let next = currentOptionIndex + 1;

        return next < this.props.options.length ? next : 0;
    }

    getPreviousOptionIndex(currentOptionIndex) {
        let previous = currentOptionIndex - 1;

        return previous < 0 ? this.props.options.length - 1 : previous;
    }

    handleBlur(option) {
        if (this.state.indexOfOptionInFocus === option) {
            this.setState({indexOfOptionInFocus: null})
        }
    }

    handleFocus(option) {
        this.setState({indexOfOptionInFocus: this.props.options.indexOf(option)});
    }

    handleKeyDown(event) {
        const key = event.key;
        const activeItemIndex = this.state.indexOfOptionInFocus;

        if (key === 'ArrowLeft') {
            this.setFocus(this.getPreviousOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'ArrowRight') {
            this.setFocus(this.getNextOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'Enter') {
            this.handleClick(this.props.options[activeItemIndex])
            event.preventDefault();
        }
    }

    renderOptions() {
        return this.props.options.map((definition, index) => {
            return (
                <div {...definition}
                     role='radio'
                     aria-checked={String(definition.selected)}
                     ref={'option_$' + index}
                     key={definition.value}
                     className={cx({
                        'ui-segmented-control-option': true,
                        'ui-segmented-control-option-selected': definition.selected
                     })}
                     tabIndex={definition.selected ? 0 : -1}
                     onBlur={this.handleBlur.bind(this, definition)}
                     onClick={this.handleClick.bind(this, definition)}
                     onFocus={this.handleFocus.bind(this, definition)}>
                {definition.content}
                </div>
            );
        });
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 aria-required='radiogroup'
                 className={cx({
                    'ui-segmented-control': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className
                 })}
                 onKeyDown={this.handleKeyDown.bind(this)}
                 id={this.props.id || this.props.attrs.id}
                 style={{...this.props.style, ...this.props.attrs.style}}>
                 {this.renderOptions()}
            </div>
        );
    }
}

UISegmentedControl.propTypes = {
    attrs: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    onOptionSelected: React.PropTypes.func,
    options: function(props, propName, componentName) {
        if (props.options.length < 2) {
            return new Error('Must provide at least two options.');
        }

        let missingSelected = props.options.some(option => {
            if (!('selected' in option)) {
                return true;
            }
        });

        if (missingSelected) {
            return new Error('Must provide a `selected` prop for each option.');
        }

        let missingValue = props.options.some(option => {
            if (!('value' in option)) {
                return true;
            }
        });

        if (missingValue) {
            return new Error('Must provide a `value` prop for each option.');
        }

        let seenSelected = false;
        let multipleSelected = props.options.some(option => {
            if (option.selected) {
                if (seenSelected) {
                    return true;
                }

                seenSelected = true;
            }
        });

        if (multipleSelected) {
            return new Error('Encountered multiple options with `selected: true`. There can be only one.');
        }
    }
};

UISegmentedControl.defaultProps = {
    attrs: {},
    options: [],
    onOptionSelected: noop
};

export default UISegmentedControl;
