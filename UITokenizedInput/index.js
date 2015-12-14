/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 * @class UITokenizedInput
 */

import React from 'react';
import UITypeaheadInput from '../UITypeaheadInput';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

const first = function getFirstArrayItem(array) {
    return array[0];
};

const last = function getLastArrayItem(array) {
    return array[array.length - 1];
};

const without = function rejectSomeArrayItems(baseArray, ...toBeExcluded) {
    return baseArray.filter(function rejectSome(item) {
        return toBeExcluded.indexOf(item) === -1;
    });
};

class UITokenizedInput extends UIView {
    initialState() {
        return {
            tokenizedEntityIndexesSelected: [],
            tokenizedEntityIndexes: [].concat(this.props.defaultTokenizedEntityIndexes),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let previousIndexes = prevState.tokenizedEntityIndexes;
        let previousSelectedIndexes = prevState.tokenizedEntityIndexesSelected;
        let currentIndexes = this.state.tokenizedEntityIndexes;
        let currentSelectedIndexes = this.state.tokenizedEntityIndexesSelected;

        if (previousIndexes !== currentIndexes) {
            this.props.onTokenChange(currentIndexes);
        }

        if (previousSelectedIndexes !== currentSelectedIndexes) { // move focus
            if (currentSelectedIndexes.length === 0) {
                return;
            } else if (   currentSelectedIndexes.length === 1
                       || currentSelectedIndexes[0] !== previousSelectedIndexes[0] /* multi selection, leftward */) {
                this.refs[`token_${currentSelectedIndexes[0]}`].focus();
            } else if (last(currentSelectedIndexes) !== last(previousSelectedIndexes) /* multi selection, rightward */) {
                this.refs[`token_${last(currentSelectedIndexes)}`].focus();
            }
        }
    }

    /**
     * Create a token based on an entity's array index.
     *
     * @param {Number|Array<Number>}  index         the array index of the desired entity to be tokenized
     * @param {Boolean}               [focusInput]  determines if the input should be focused after the
     *                                              token changes are applied
     * @param {Boolean}               [clearInput]  determines if the input should be cleared after the
     *                                              token changes are applied
     */
    addToken(index, focusInput, clearInput) {
        const indexes = (Array.isArray(index) ? index : [index]).filter(idx => {
            return this.state.tokenizedEntityIndexes.indexOf(idx) === -1;
        });

        this.setState({tokenizedEntityIndexes: this.state.tokenizedEntityIndexes.concat(indexes)});

        focusInput && this.refs.typeahead.focusInput();
        clearInput && this.refs.typeahead.setValue('');
    }

    /**
     * Remove a token based on an entity's array index. If no index is given, all tokens are removed.
     *
     * @param {Number|Array<Number>}  index         the array index of the desired entity to be tokenized
     * @param {Boolean}               [focusInput]  determines if the input should be focused after the
     *                                              token changes are applied
     * @param {Boolean}               [clearInput]  determines if the input should be cleared after the
     *                                              token changes are applied
     */
    removeToken(index = this.state.tokenizedEntityIndexesSelected, focusInput, clearInput) {
        const indexes = Array.isArray(index) ? index : [index];

        this.setState({
            tokenizedEntityIndexes: without(this.state.tokenizedEntityIndexes, ...indexes),
            tokenizedEntityIndexesSelected: without(this.state.tokenizedEntityIndexesSelected, ...indexes),
        });

        focusInput && this.refs.typeahead.focusInput();
        clearInput && this.refs.typeahead.setValue('');
    }

    handleInputFocus(event) {
        this.setState({tokenizedEntityIndexesSelected: []});

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    }

    selectPreviousToken(append) {
        let selected = this.state.tokenizedEntityIndexesSelected;
        let indexes = this.state.tokenizedEntityIndexes;

        if (   selected.length === 1
            && first(selected) === first(indexes)) {
            return; // already at leftmost bound
        }

        if (selected.length === 0) { // pick the rightmost
            this.setState({
                tokenizedEntityIndexesSelected: [last(indexes)],
            });
        } else { // add the next leftmost to a reconstructed "selected" array
            let previousToken = indexes[indexes.indexOf(first(selected)) - 1];

            this.setState({
                tokenizedEntityIndexesSelected: append ? [previousToken].concat(selected) : [previousToken],
            });
        }
    }

    selectNextToken(append) {
        let selected = this.state.tokenizedEntityIndexesSelected;
        let indexes = this.state.tokenizedEntityIndexes;

        if (selected.length === 0) {
            return;
        }

        if (last(selected) === last(indexes)) {
            this.setState({
                tokenizedEntityIndexesSelected: [],
            });

            this.refs.typeahead.focusInput();
        } else {
            let nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.setState({
                tokenizedEntityIndexesSelected: append ? selected.concat(nextToken) : [nextToken],
            });
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'ArrowLeft':
            this.selectPreviousToken(event.shiftKey);
            break;

        case 'ArrowRight':
            this.selectNextToken(event.shiftKey);
            break;

        case 'Backspace':
            if (this.state.tokenizedEntityIndexesSelected.length) {
                event.preventDefault();
                this.removeToken();

                this.refs.typeahead.focusInput();
            }

            break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    handleTokenCloseClick(index) {
        this.removeToken(index);
    }

    renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return (
                <div className='ui-tokenfield-token-close'
                     onClick={this.handleTokenCloseClick.bind(this, index)} />
            );
        }
    }

    selectSingleToken(index) {
        if (   this.state.tokenizedEntityIndexesSelected.indexOf(index) === -1
            || this.state.tokenizedEntityIndexesSelected.length > 1) {
            this.setState({
                tokenizedEntityIndexesSelected: [index],
            });
        }
    }

    handleTokenKeyDown(index, event) {
        switch (event.key) {
        case 'Enter':
        case 'Space':
            this.selectSingleToken(index);
        }
    }

    renderTokens() {
        return (
            <div className='ui-tokenfield-tokens'>
                {this.state.tokenizedEntityIndexes.map(index => {
                    return (
                        <div ref={`token_${index}`}
                             key={index}
                             className={cx({
                                'ui-tokenfield-token': true,
                                'ui-tokenfield-token-selected': this.state.tokenizedEntityIndexesSelected.indexOf(index) !== -1,
                             })}
                             onClick={this.selectSingleToken.bind(this, index)}
                             onKeyDown={this.handleTokenKeyDown.bind(this, index)}
                             tabIndex='0'>
                            {this.props.entities[index].text}
                            {this.renderTokenClose(index)}
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        const descendants = Object.keys(UITypeaheadInput.propTypes).reduce((props, key) => {
            props[key] = this.props[key];

            return props;
        }, {});

        return (
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                     'ui-tokenfield-wrapper': true,
                     [this.props.className]: !!this.props.className,
                 })}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                {this.renderTokens()}

                <UITypeaheadInput {...descendants}
                                  ref='typeahead'
                                  className='ui-tokenfield'
                                  onEntitySelected={this.addToken.bind(this)}
                                  onFocus={this.handleInputFocus.bind(this)}
                                  clearPartialInputOnSelection={true} />
            </div>
        );
    }
}

UITokenizedInput.propTypes = {
    ...UITypeaheadInput.propTypes,
    defaultTokenizedEntityIndexes: React.PropTypes.arrayOf(React.PropTypes.number),
    onTokenChange: React.PropTypes.func,
    showTokenClose: React.PropTypes.bool,
};

UITokenizedInput.defaultProps = {
    ...UITypeaheadInput.defaultProps,
    defaultTokenizedEntityIndexes: [],
    onTokenChange: noop,
    showTokenClose: true,
};

export default UITokenizedInput;
