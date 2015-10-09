/**
 * Distill rich entity data matched via typeahead input into simple visual abstractions.
 * @class UITokenizedInput
 */

import UITypeaheadInput from '../UITypeaheadInput';
import UIView from '../UIView';
import React from 'react';
import {first, last, noop, without} from 'lodash';

class UITokenizedInput extends UIView {
    initialState() {
        return {
            tokenizedEntityIndicesSelected: [],
            tokenizedEntityIndices: []
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
                this.refs[`token${currentSelectedIndices[0]}`].focus();
            } else if (last(currentSelectedIndices) !== last(previousSelectedIndices) /* multi selection, rightward */) {
                this.refs[`token${last(currentSelectedIndices)}`].focus();
            }
        }
    }

    handleEntitySelected(index) {
        if (this.state.tokenizedEntityIndices.indexOf(index) === -1) {
            this.setState({tokenizedEntityIndices: this.state.tokenizedEntityIndices.concat(index)});
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
                tokenizedEntityIndicesSelected: [last(indices)]
            });
        } else { // add the next leftmost to a reconstructed "selected" array
            let previousToken = indices[indices.indexOf(first(selected)) - 1];

            this.setState({
                tokenizedEntityIndicesSelected: append ? [previousToken].concat(selected) : [previousToken]
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
                tokenizedEntityIndicesSelected: []
            });

            this.refs.typeahead.focusInput();
        } else {
            let nextToken = indices[indices.indexOf(last(selected)) + 1];

            this.setState({
                tokenizedEntityIndicesSelected: append ? selected.concat(nextToken) : [nextToken]
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
                    tokenizedEntityIndicesSelected: []
                });

                this.refs.typeahead.focusInput();
            }

            break;
        }
    }

    handleTokenCloseClick(index) {
        this.setState({
            tokenizedEntityIndices: without(this.state.tokenizedEntityIndices, index),
            tokenizedEntityIndicesSelected: without(this.state.tokenizedEntityIndicesSelected, index)
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

    getTokenClasses(index) {
        let classes = ['ui-tokenfield-token'];

        if (this.state.tokenizedEntityIndicesSelected.indexOf(index) !== -1) {
            classes.push('ui-tokenfield-token-selected');
        }

        return classes.join(' ');
    }

    selectSingleToken(index) {
        if (   this.state.tokenizedEntityIndicesSelected.indexOf(index) === -1
            || this.state.tokenizedEntityIndicesSelected.length > 1) {
            this.setState({
                tokenizedEntityIndicesSelected: [index]
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
                        <div ref={`token${index}`}
                             className={this.getTokenClasses(index)}
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

    getWrapperClasses() {
        return ['ui-tokenfield-wrapper'].concat(this.props.outerWrapperAttributes.className || []).join(' ');
    }

    getTypeaheadClasses() {
        return ['ui-tokenfield'].concat(this.props.className || []).join(' ');
    }

    render() {
        return (
            <div {...this.props.outerWrapperAttributes}
                 className={this.getWrapperClasses()}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                {this.renderTokens()}

                <UITypeaheadInput {...this.props}
                                  ref='typeahead'
                                  className={this.getTypeaheadClasses()}
                                  onEntitySelected={this.handleEntitySelected.bind(this)}
                                  clearPartialInputOnSelection={true} />
            </div>
        );
    }
}

UITokenizedInput.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            content: React.PropTypes.string
        })
    ),
    onTokenChange: React.PropTypes.func,
    outerWrapperAttributes: React.PropTypes.object,
    showTokenClose: React.PropTypes.bool
};

UITokenizedInput.defaultProps = {
    entities: [],
    onTokenChange: noop,
    outerWrapperAttributes: {},
    showTokenClose: true
};

export default UITokenizedInput;
