/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 * @class UISegmentedControl
 */

import UIView from '../UIView';
import UIButton from '../UIButton';
import React from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UISegmentedControl extends UIView {
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
        findDOMNode(this.refs['option_$' + index]).focus();
    }

    getNextOptionIndex(currentOptionIndex) {
        let next = currentOptionIndex + 1;

        return next < this.props.options.length ? next : 0;
    }

    getPreviousOptionIndex(currentOptionIndex) {
        let previous = currentOptionIndex - 1;

        return previous < 0 ? this.props.options.length - 1 : previous;
    }

    handleBlur(option, event) {
        if (this.state.indexOfOptionInFocus === option) {
            this.setState({indexOfOptionInFocus: null});
        }

        if (typeof option.onBlur === 'function') {
            event.persist();
            option.onBlur(event);
        }
    }

    handleClick(option, event) {
        this.props.onOptionSelected(option.value);

        if (typeof option.onClick === 'function') {
            event.persist();
            option.onClick(event);
        }
    }

    handleFocus(option, event) {
        this.setState({indexOfOptionInFocus: this.props.options.indexOf(option)});

        if (typeof option.onFocus === 'function') {
            event.persist();
            option.onFocus(event);
        }
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
            this.handleClick(this.props.options[activeItemIndex]);
            event.preventDefault();
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    renderOptions() {
        return this.props.options.map((definition, index) => {
            return (
                <UIButton {...definition}
                          selected={null}
                          role='radio'
                          aria-checked={String(definition.selected)}
                          ref={'option_$' + index}
                          key={definition.value}
                          className={cx({
                             'ui-segmented-control-option': true,
                             'ui-segmented-control-option-selected': definition.selected,
                             [definition.className]: !!definition.className,
                          })}
                          tabIndex={definition.selected ? '0' : '-1'}
                          onBlur={this.handleBlur.bind(this, definition)}
                          onClick={this.handleClick.bind(this, definition)}
                          onFocus={this.handleFocus.bind(this, definition)}>
                {definition.content}
                </UIButton>
            );
        });
    }

    render() {
        return (
            <div {...this.props}
                 ref='wrapper'
                 aria-required='radiogroup'
                 className={cx({
                    'ui-segmented-control': true,
                    [this.props.className]: !!this.props.className,
                 })}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                 {this.renderOptions()}
            </div>
        );
    }
}

UISegmentedControl.propTypes = {
    onOptionSelected: React.PropTypes.func,
    options: function(props) {
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
    },
};

UISegmentedControl.defaultProps = {
    options: [],
    onOptionSelected: noop,
};

export default UISegmentedControl;
