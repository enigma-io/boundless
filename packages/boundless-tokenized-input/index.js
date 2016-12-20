import React, {PropTypes} from 'react';
import cx from 'classnames';

import Typeahead from '../boundless-typeahead/index';
import extractChildProps from '../boundless-utils-object-intersection/index';
import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';

const first = (array) => array[0];
const last = (array) => array[array.length - 1];

/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 */
export default class TokenizedInput extends React.PureComponent {
    static propTypes = {
        ...Typeahead.propTypes,

        /**
         * function handler that is called when an entity is selected by the user and a token should be created
         */
        handleAddToken: PropTypes.func,

        /**
         * function handler that is called when one or more tokens are removed by the user via clicking the "close" button or pressing the `Backspace` key while tokens are selected
         */
        handleRemoveTokens: PropTypes.func,

        /**
         * function handler that is called when one or more tokens are selected by the user via click or keyboard actions; called with what the new selection should be
         */
        handleNewSelection: PropTypes.func,

        /**
         * the JSX used for the close button itself
         */
        tokenCloseComponent: PropTypes.element,

        /**
         * determines if the `.b-tokenfield-token-close` element should be rendered for each token
         */
        tokenCloseVisible: PropTypes.bool,

        /**
         * the indexes of entities that should be rendered as "tokens" in the component UI
         */
        tokens: PropTypes.arrayOf(PropTypes.number),

        /**
         * the indexes of tokenized entities that are part of an active selection; the user can press `Backspace` to trigger `handleRemoveTokens`
         */
        tokensSelected: PropTypes.arrayOf(PropTypes.number),
    }

    static defaultProps = {
        ...Typeahead.defaultProps,
        handleAddToken: noop,
        handleRemoveTokens: noop,
        handleNewSelection: noop,
        tokenCloseComponent: (<div>X</div>),
        tokenCloseVisible: true,
        tokens: [],
        tokensSelected: [],
    }

    static internalKeys = Object.keys(TokenizedInput.defaultProps)

    componentDidUpdate(prevProps) {
        const previousSelectedIndexes = prevProps.tokensSelected;
        const currentSelectedIndexes = this.props.tokensSelected;

        if (this.props.tokens.length > prevProps.tokens.length) {
            this.setValue('');
        }

        if (this._suppressNextTokenSelection) {
            this._suppressNextTokenSelection = false;

            return;
        }

        if (   previousSelectedIndexes !== currentSelectedIndexes
            && currentSelectedIndexes.length !== 0) {
            if (   currentSelectedIndexes.length === 1
                       || currentSelectedIndexes[0] !== previousSelectedIndexes[0] /* multi selection, leftward */) {
                return this.refs[`token_${currentSelectedIndexes[0]}`].focus();
            } else if (last(currentSelectedIndexes) !== last(previousSelectedIndexes) /* multi selection, rightward */) {
                return this.refs[`token_${last(currentSelectedIndexes)}`].focus();
            }

            this.refs[`token_${currentSelectedIndexes[0]}`].focus();
        } // move focus
    }

    // passthroughs to Typeahead instance methods
    focus = () => this.refs.typeahead.focus()
    getInputNode = () => this.refs.typeahead.getInputNode()
    getSelectedEntityText = () => this.refs.typeahead.getSelectedEntityText()
    getValue = () => this.refs.typeahead.getValue()
    select = () => this.refs.typeahead.select()
    setValue = (value) => this.refs.typeahead.setValue(value)

    add = (index) => {
        if (this.props.tokens.indexOf(index) === -1) { this.props.handleAddToken(index); }
    }

    remove(index) {
        const indexes = (Array.isArray(index) ? index : [index]).filter((idx) => {
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
            this.focus();
        } else {
            const nextToken = indexes[indexes.indexOf(last(selected)) + 1];

            this.selectTokens(append ? selected.concat(nextToken) : [nextToken]);
        }
    }

    clearSelection() {
        this.props.handleNewSelection([]);
    }

    handleInputClick = (event) => {
        this.clearSelection();

        if (isFunction(this.props.inputProps.onClick)) {
            this.props.inputProps.onClick(event);
        }
    }

    handleInputFocus = (event) => {
        this.clearSelection();

        if (isFunction(this.props.inputProps.onFocus)) {
            this.props.inputProps.onFocus(event);
        }
    }

    handleKeyDown = (event) => {
        switch (event.which) {
        case 37:    // left arrow
            this.selectPreviousToken(event.shiftKey);
            break;

        case 39:    // right arrow
            this.selectNextToken(event.shiftKey);
            break;

        case 8:     // backspace
            if (this.props.tokensSelected.length) {
                this.remove(this.props.tokensSelected);
                this.focus();
            }

            break;

        case 65:    // letter "a"
            if (event.metaKey) {
                event.preventDefault();

                this.focus();
                this.select();

                // hacky, but the only way unless we move selection management internal again
                this._suppressNextTokenSelection = true;

                this.props.handleNewSelection(this.props.tokens);
            } // "cmd"
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    handleTokenCloseClick(index, event) {
        // if we don't stop propagation, the event bubbles and results in a failed token selection
        event.stopPropagation();

        this.remove(index);
        this.focus();

        if (this.props.tokenCloseComponent.props.onClick) {
            this.props.tokenCloseComponent.props.onClick(event);
        }
    }

    renderTokenClose(index) {
        if (this.props.tokenCloseVisible) {
            return React.cloneElement(this.props.tokenCloseComponent, {
                className: cx('b-tokenfield-token-close', this.props.tokenCloseComponent.props.className),
                onClick: this.handleTokenCloseClick.bind(this, index),
            });
        }
    }

    handleTokenKeyDown(index, event) {
        switch (event.which) {
        case 13: // enter
        case 32: // space
            this.selectToken(index);
            event.preventDefault();
            break;

        case 8: // backspace
            this.remove(index);
            this.focus();
            event.preventDefault();
            break;
        }
    }

    renderTokens() {
        return (
            <div className='b-tokenfield-tokens'>
                {this.props.tokens.map((index) => {
                    return (
                        <div
                            ref={`token_${index}`}
                            key={index}
                            className={cx('b-tokenfield-token', {
                               'b-tokenfield-token-selected': this.props.tokensSelected.indexOf(index) !== -1,
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
        return (
            <div
                {...omit(this.props, TokenizedInput.internalKeys)}
                ref='wrapper'
                className={cx('b-tokenfield-wrapper', this.props.className)}
                onKeyDown={this.handleKeyDown}>
                {this.renderTokens()}

                <Typeahead
                    {...extractChildProps(this.props, Typeahead.defaultProps)}
                    ref='typeahead'
                    className='b-tokenfield'
                    clearPartialInputOnSelection={true}
                    inputProps={{
                        ...this.props.inputProps,
                        onClick: this.handleInputClick,
                        onFocus: this.handleInputFocus,
                    }}
                    onEntitySelected={this.add} />
            </div>
        );
    }
}
