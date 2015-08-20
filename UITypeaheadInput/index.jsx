/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

import UIView from '../UIView';
import React from 'react';
import {indexOf, map, reduce} from 'lodash';

class UITypeaheadInput extends UIView {
    initialState() {
        return {
            entityMatchIndices: [],
            selectedEntityIndex: -1,
            uuid: this.uuid()
        };
    }

    getHintClasses() {
        return ['ui-typeahead-hint'].concat(this.props.hintAttributes.className || []).join(' ');
    }

    getMatchClasses(entity, selected) {
        let classes = ['ui-typeahead-match'];

        if (selected) {
            classes.push('ui-typeahead-match-selected');
        }

        return classes.concat(entity.className || []).join(' ');
    }

    getMatchWrapperClasses() {
        return ['ui-typeahead-match-wrapper'].concat(this.props.matchWrapperAttributes.className || []).join(' ');
    }

    getInputClasses() {
        return ['ui-typeahead'].concat(this.props.className || []).join(' ');
    }

    getWrapperClasses() {
        return ['ui-typeahead-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches(this.props.defaultValue);
        }
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                {this.renderNotification()}
                {this.renderHint()}

                <input {...this.props}
                       ref='input'
                       className={this.getInputClasses()}
                       aria-controls={this.state.uuid}
                       onInput={this.handleInput.bind(this)} />

                {this.renderMatches()}
            </div>
        );
    }

    renderNotification() {
        return (
            <div ref='aria'
                 id={this.state.uuid}
                 className={this.props.offscreenClass}
                 aria-live='polite'>
                {this.getSelectedEntityContent()}
            </div>
        );
    }

    renderHint() {
        if (this.props.hint) {
            let userText = this.state.userInput;
            let raw = this.getSelectedEntityContent();
            let processed = '';

            if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return (
                <input {...this.props.hintAttributes}
                       ref='hint'
                       type='text'
                       className={this.getHintClasses()}
                       value={processed}
                       disabled={true}
                       tabIndex='-1' />
            );
        }
    }

    renderMatches() {
        if (this.state.entityMatchIndices.length) {
            return (
                <div {...this.props.matchWrapperAttributes}
                     ref='matches'
                     className={this.getMatchWrapperClasses()}>
                    {map(this.state.entityMatchIndices, (index) => {
                        let entity = this.props.entities[index];

                        return (
                            <div {...entity}
                                 className={this.getMatchClasses(entity, this.state.selectedEntityIndex === index)}
                                 key={this.createHashedKey(entity.content)}
                                 onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(entity.content, this.state.userInput)}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    getInputNode() {
        return React.findDOMNode(this.refs.input);
    }

    cursorAtEndOfInput() {
        let node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
    }

    setValue(newValue) {
        this.getInputNode().value = newValue;

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focusInput();
    }

    focusInput() {
        this.getInputNode().focus();
    }

    markMatchSubstring(entityContent, userInput) {
        if (this.props.markFunc) {
            return this.props.markFunc(entityContent, userInput);
        }

        let seekValue = userInput.toLowerCase();
        let indexStart = entityContent.toLowerCase().indexOf(seekValue);
        let indexEnd = indexStart + seekValue.length;

        return [
            <span key='0'>{entityContent.slice(0, indexStart)}</span>,
            <mark key='1' className='ui-typeahead-match-highlight'>{entityContent.slice(indexStart, indexEnd)}</mark>,
            <span key='2'>{entityContent.slice(indexEnd)}</span>
        ];
    }

    resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndices: []
        });
    }

    getSelectedEntityContent() {
        let entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.content : '';
    }

    // The default implementation is a simple "starts-with" search
    getMatchIndices(currentValue, entities) {
        if (this.props.matchFunc) {
            return this.props.matchFunc(currentValue, entities);
        }

        let seekValue = currentValue.toLowerCase();

        return reduce(entities, function seekMatch(result, entity, index) {
            return entity.content.toLowerCase().indexOf(seekValue) === 0 ? (result.push(index) && result) : result;
        }, []);
    }

    computeMatches(currentValue) {
        let entities = this.props.entities;
        let matches = currentValue === '' ? [] : this.getMatchIndices(currentValue, entities);

        this.setState({
            userInput: currentValue,
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndices: matches
        });
    }

    selectMatch(delta) {
        let matches = this.state.entityMatchIndices;
        let totalMatches = matches.length;
        let nextIndex = indexOf(matches, this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            if (nextIndex < 0) {
                nextIndex = totalMatches - 1; // reverse loop
            } else if (nextIndex >= totalMatches) {
                nextIndex = 0; // loop
            }

            this.setState({ selectedEntityIndex: matches[nextIndex] });
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'Tab':
        case 'ArrowRight':
            if (this.state.selectedEntityIndex !== -1
                && this.cursorAtEndOfInput()
                && this.getInputNode() === event.target) {
                event.nativeEvent.preventDefault();
                this.setValue(this.getSelectedEntityContent());
            }

            break;

        case 'ArrowUp':
            event.nativeEvent.preventDefault(); // block cursor movement
            this.selectMatch(-1);
            this.focusInput();
            break;

        case 'ArrowDown':
            event.nativeEvent.preventDefault(); // block cursor movement
            this.selectMatch(1);
            this.focusInput();
            break;

        case 'Escape':
            if (this.state.selectedEntityIndex !== -1
                && this.getInputNode() === event.target) {
                this.resetMatches();
            }

            break;

        case 'Enter':
            if (this.state.selectedEntityIndex !== -1
                && this.getInputNode() === event.target) {
                event.nativeEvent.preventDefault();
                this.setValue(this.getSelectedEntityContent());
            } else if (this.props.onComplete) {
                this.props.onComplete(this.state.userInput);
                this.focusInput();
            }

            break;
        }
    }

    handleInput(event) {
        this.computeMatches(event.target.value);
    }

    handleMatchClick(index) {
        this.setValue(this.props.entities[index].content);
    }
}

UITypeaheadInput.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    defaultValue: React.PropTypes.string,
    entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            content: React.PropTypes.string
        })
    ),
    hint: React.PropTypes.bool,
    hintAttributes: React.PropTypes.object,
    markFunc: React.PropTypes.func,
    matchFunc: React.PropTypes.func,
    matchWrapperAttributes: React.PropTypes.object,
    offscreenClass: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    type: React.PropTypes.string,
    wrapperAttributes: React.PropTypes.object
};

UITypeaheadInput.defaultProps = {
    entities: [],
    hintAttributes: {},
    matchWrapperAttributes: {},
    offscreenClass: 'ui-offscreen',
    type: 'text',
    wrapperAttributes: {}
};

export default UITypeaheadInput;
