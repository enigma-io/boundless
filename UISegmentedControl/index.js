import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import UIButton from '../UIButton';
import isFunction from '../UIUtils/isFunction';
import noop from '../UIUtils/noop';
import omit from '../UIUtils/omit';

/**
 * A controller view for managing the aggregate state of multiple, related radio-style buttons.
 */
export default class UISegmentedControl extends React.PureComponent {
    static propTypes = {
        onOptionSelected: PropTypes.func,
        options: function validateOptions(props) {
            if (props.options.length < 2) {
                throw new Error('Must provide at least two options.');
            }

            const missingSelected = props.options.some((option) => {
                if (!('selected' in option)) {
                    return true;
                }
            });

            if (missingSelected) {
                throw new Error('Must provide a `selected` prop for each option.');
            }

            let seenSelected = false;
            const multipleSelected = props.options.some((option) => {
                if (option.selected) {
                    if (seenSelected) {
                        return true;
                    }

                    seenSelected = true;
                }
            });

            if (multipleSelected) {
                throw new Error('Encountered multiple options with `selected: true`. There can be only one.');
            }

            if (props.options.some((option) => typeof option.value === 'undefined')) {
                throw new Error('Must provide a `value` prop for each option.');
            }
        },
    }

    static defaultProps = {
        onOptionSelected: noop,
        options: [],
    }

    static internalKeys = Object.keys(UISegmentedControl.defaultProps)
    static internalChildKeys = [
        'content',
        'value',
        'selected',
    ]

    state = {
        indexOfOptionInFocus: null,
    }

    currentValue() {
        let value;

        this.props.options.some((option) => {
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

    handleOptionBlur(option, event) {
        if (this.state.indexOfOptionInFocus === this.props.options.indexOf(option)) {
            this.setState({indexOfOptionInFocus: null});
        }

        if (isFunction(option.onBlur)) {
            option.onBlur(event);
        }
    }

    handleOptionClick(option, event) {
        this.props.onOptionSelected(option.value);

        if (isFunction(option.onClick)) {
            option.onClick(event);
        }
    }

    handleOptionFocus(option, event) {
        this.setState({indexOfOptionInFocus: this.props.options.indexOf(option)});

        if (isFunction(option.onFocus)) {
            option.onFocus(event);
        }
    }

    handleKeyDown = (event) => {
        const key = event.key;
        const activeItemIndex = this.state.indexOfOptionInFocus;

        if (key === 'ArrowLeft') {
            this.setFocus(this.getPreviousOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'ArrowRight') {
            this.setFocus(this.getNextOptionIndex(activeItemIndex));
            event.preventDefault();
        } else if (key === 'Enter') {
            this.handleOptionClick(this.props.options[activeItemIndex]);
            event.preventDefault();
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    renderOptions() {
        return this.props.options.map((definition, index) => {
            return (
                <UIButton
                    {...omit(definition, UISegmentedControl.internalChildKeys)}
                    role='radio'
                    aria-checked={String(definition.selected)}
                    ref={'option_$' + index}
                    key={definition.value}
                    className={cx('ui-segmented-control-option', definition.className, {
                        'ui-segmented-control-option-selected': definition.selected,
                    })}
                    tabIndex={definition.selected ? '0' : '-1'}
                    onBlur={this.handleOptionBlur.bind(this, definition)}
                    onPressed={this.handleOptionClick.bind(this, definition)}
                    onFocus={this.handleOptionFocus.bind(this, definition)}>
                    {definition.content}
                </UIButton>
            );
        });
    }

    render() {
        return (
            <div
                {...omit(this.props, UISegmentedControl.internalKeys)}
                ref='wrapper'
                role='radiogroup'
                className={cx('ui-segmented-control', this.props.className)}
                onKeyDown={this.handleKeyDown}>
                {this.renderOptions()}
            </div>
        );
    }
}
