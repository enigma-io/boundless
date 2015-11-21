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
            tokenizedEntityIndicesSelected: [],
            tokenizedEntityIndices: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let previousIndices = prevState.tokenizedEntityIndices;
        let previousSelectedIndices = prevState.tokenizedEntityIndicesSelected;
        let currentIndices = this.state.tokenizedEntityIndices;
        let currentSelectedIndices = this.state.tokenizedEntityIndicesSelected;

        if (previousIndices !== currentIndices) {
            this.props.onTokenChange(
                currentSelectedIndices.map(index => this.props.entities[index])
            );
        }

        if (previousSelectedIndices !== currentSelectedIndices) { // move focus
            if (currentSelectedIndices.length === 0) {
                return;
            } else if (   currentSelectedIndices.length === 1
                       || currentSelectedIndices[0] !== previousSelectedIndices[0] /* multi selection, leftward */) {
                this.refs[`token_${currentSelectedIndices[0]}`].focus();
            } else if (last(currentSelectedIndices) !== last(previousSelectedIndices) /* multi selection, rightward */) {
                this.refs[`token_${last(currentSelectedIndices)}`].focus();
            }
        }
    }

    handleEntitySelected(index) {
        if (this.state.tokenizedEntityIndices.indexOf(index) === -1) {
            this.setState({tokenizedEntityIndices: this.state.tokenizedEntityIndices.concat(index)});
        }
    }

    handleInputFocus(event) {
        this.setState({tokenizedEntityIndicesSelected: []});

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
        }
    }

    selectPreviousToken(append) {
        let selected = this.state.tokenizedEntityIndicesSelected;
        let indices = this.state.tokenizedEntityIndices;

        if (   selected.length === 1
            && first(selected) === first(indices)) {
            return; // already at leftmost bound
        }

        if (selected.length === 0) { // pick the rightmost
            this.setState({
                tokenizedEntityIndicesSelected: [last(indices)],
            });
        } else { // add the next leftmost to a reconstructed "selected" array
            let previousToken = indices[indices.indexOf(first(selected)) - 1];

            this.setState({
                tokenizedEntityIndicesSelected: append ? [previousToken].concat(selected) : [previousToken],
            });
        }
    }

    selectNextToken(append) {
        let selected = this.state.tokenizedEntityIndicesSelected;
        let indices = this.state.tokenizedEntityIndices;

        if (selected.length === 0) {
            return;
        }

        if (last(selected) === last(indices)) {
            this.setState({
                tokenizedEntityIndicesSelected: [],
            });

            this.refs.typeahead.focusInput();
        } else {
            let nextToken = indices[indices.indexOf(last(selected)) + 1];

            this.setState({
                tokenizedEntityIndicesSelected: append ? selected.concat(nextToken) : [nextToken],
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
            if (this.state.tokenizedEntityIndicesSelected.length) {
                event.preventDefault();
                this.setState({
                    tokenizedEntityIndices: without(this.state.tokenizedEntityIndices, ...this.state.tokenizedEntityIndicesSelected),
                    tokenizedEntityIndicesSelected: [],
                });

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
        this.setState({
            tokenizedEntityIndices: without(this.state.tokenizedEntityIndices, index),
            tokenizedEntityIndicesSelected: without(this.state.tokenizedEntityIndicesSelected, index),
        });
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
        if (   this.state.tokenizedEntityIndicesSelected.indexOf(index) === -1
            || this.state.tokenizedEntityIndicesSelected.length > 1) {
            this.setState({
                tokenizedEntityIndicesSelected: [index],
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
                {this.state.tokenizedEntityIndices.map(index => {
                    return (
                        <div ref={`token_${index}`}
                             key={index}
                             className={cx({
                                'ui-tokenfield-token': true,
                                'ui-tokenfield-token-selected': this.state.tokenizedEntityIndicesSelected.indexOf(index) !== -1,
                             })}
                             onClick={this.selectSingleToken.bind(this, index)}
                             onKeyDown={this.handleTokenKeyDown.bind(this, index)}
                             tabIndex='0'>
                            {this.props.entities[index].content}
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
                                  onEntitySelected={this.handleEntitySelected.bind(this)}
                                  onFocus={this.handleInputFocus.bind(this)}
                                  clearPartialInputOnSelection={true} />
            </div>
        );
    }
}

UITokenizedInput.propTypes = {
    ...UITypeaheadInput.propTypes,
    onTokenChange: React.PropTypes.func,
    showTokenClose: React.PropTypes.bool,
};

UITokenizedInput.defaultProps = {
    ...UITypeaheadInput.defaultProps,
    onTokenChange: noop,
    showTokenClose: true,
};

export default UITokenizedInput;
