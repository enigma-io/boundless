/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 * @class UITokenizedInput
 */

import React from 'react';
import UITypeaheadInput from '../UITypeaheadInput';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

const first = array => array[0];
const last = array => array[array.length - 1];

class UITokenizedInput extends UIView {
    componentDidUpdate(prevProps) {
        const previousSelectedIndexes = prevProps.tokensSelected;
        const currentSelectedIndexes = this.props.tokensSelected;

        if (this.props.tokens.length > prevProps.tokens.length) {
            this.refs.typeahead.value('');
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

            this.refs[`token_${currentSelectedIndexes[0]}`].focus();
        }
    }

    add(index) {
        if (this.props.tokens.indexOf(index) === -1) { this.props.handleAddToken(index); }
    }

    remove(index) {
        const indexes = (Array.isArray(index) ? index : [index]).filter(idx => {
            return this.props.tokens.indexOf(idx) !== -1;
        });

        if (indexes.length) { this.props.handleRemoveTokens(indexes); }
    }

    selectToken(index) {
        this.props.handleNewSelection([index]);
    }

    selectTokens(indexes) {
        this.props.handleNewSelection(indexes);
    }

    selectPreviousToken(append) {
        const selected = this.props.tokensSelected;
        const indexes = this.props.tokens;

        if (   selected.length === 1
            && first(selected) === first(indexes)) {
            return; // already at leftmost bound
        }

        if (selected.length === 0) { // pick the rightmost
            this.selectToken(last(indexes));
        } else { // add the next leftmost to a reconstructed "selected" array
            const previousToken = indexes[indexes.indexOf(first(selected)) - 1];

            this.selectTokens(append ? [previousToken].concat(selected) : [previousToken]);
        }
    }

    selectNextToken(append) {
        const selected = this.props.tokensSelected;
        const indexes = this.props.tokens;

        if (selected.length === 0) {
            return;
        }

        if (last(selected) === last(indexes)) {
            this.clearSelection();
            this.refs.typeahead.focus();
        } else {
            const nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.selectTokens(append ? selected.concat(nextToken) : [nextToken]);
        }
    }

    clearSelection() {
        this.props.handleNewSelection([]);
    }

    handleInputFocus(event) {
        this.clearSelection();

        if (typeof this.props.inputProps.onFocus === 'function') {
            event.persist();
            this.props.inputProps.onFocus(event);
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
            if (this.props.tokensSelected.length) {
                event.preventDefault();
                this.remove(this.props.tokensSelected);

                this.refs.typeahead.focus();
            }

            break;
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    handleTokenCloseClick(index) {
        this.remove(index);
        this.refs.typeahead.focus();
    }

    renderTokenClose(index) {
        if (this.props.showTokenClose) {
            return (
                <div className='ui-tokenfield-token-close'
                     onClick={this.handleTokenCloseClick.bind(this, index)} />
            );
        }
    }

    handleTokenKeyDown(index, event) {
        switch (event.key) {
        case 'Enter':
        case 'Space':
            this.selectToken(index);
        }
    }

    renderTokens() {
        return (
            <div className='ui-tokenfield-tokens'>
                {this.props.tokens.map(index => {
                    return (
                        <div ref={`token_${index}`}
                             key={index}
                             className={cx({
                                'ui-tokenfield-token': true,
                                'ui-tokenfield-token-selected': this.props.tokensSelected.indexOf(index) !== -1,
                             })}
                             onClick={this.selectToken.bind(this, index)}
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
                                  onEntitySelected={this.add.bind(this)}
                                  onFocus={this.handleInputFocus.bind(this)}
                                  clearPartialInputOnSelection={true} />
            </div>
        );
    }
}

UITokenizedInput.propTypes = {
    ...UITypeaheadInput.propTypes,
    handleAddToken: React.PropTypes.func,
    handleRemoveTokens: React.PropTypes.func,
    handleNewSelection: React.PropTypes.func,
    tokens: React.PropTypes.arrayOf(React.PropTypes.number),
    tokensSelected: React.PropTypes.arrayOf(React.PropTypes.number),
    showTokenClose: React.PropTypes.bool,
};

UITokenizedInput.defaultProps = {
    ...UITypeaheadInput.defaultProps,
    handleAddToken: noop,
    handleRemoveTokens: noop,
    handleNewSelection: noop,
    tokens: [],
    tokensSelected: [],
    showTokenClose: true,
};

export default UITokenizedInput;
