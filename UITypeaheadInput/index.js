/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

import UIView from '../UIView';
import React from 'react';
import {indexOf, map, noop, reduce} from 'lodash';

class UITypeaheadInput extends UIView {
    initialState() {
        return {
            entityMatchIndices: [],
            selectedEntityIndex: -1,
            uuid: this.uuid()
        };
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches(this.props.defaultValue);
        }
    }

    getSelectedEntityContent() {
        let entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.content : '';
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

    getHintClasses() {
        return ['ui-typeahead-hint'].concat(this.props.hintAttributes.className || []).join(' ');
    }

    renderHint() {
        if (this.props.hint) {
            let userText = this.state.userInput;
            let raw = this.getSelectedEntityContent();
            let processed = '';

            if (   raw
                && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
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

    handleMatchClick(index) {
        this.setState({selectedEntityIndex: index}, () => this.setValueWithSelectedEntity());
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

    getWrapperClasses() {
        return ['ui-typeahead-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    getInputClasses() {
        return ['ui-typeahead'].concat(this.props.className || []).join(' ');
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

    resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndices: []
        });
    }

    getInputNode() {
        return React.findDOMNode(this.refs.input);
    }

    focusInput() {
        this.getInputNode().focus();
    }

    setValue(newValue) {
        this.getInputNode().value = newValue;

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focusInput();
    }

    cursorAtEndOfInput() {
        let node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
    }

    setValueWithSelectedEntity() {
        this.props.onEntitySelected(this.state.selectedEntityIndex);

        if (this.props.clearPartialInputOnSelection) {
            this.setValue('');
        } else {
            this.setValue(this.getSelectedEntityContent());
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'ArrowLeft':
            if (event.target.selectionStart > 1) {
                event.stopPropagation();
            }

            break;

        case 'Tab':
        case 'ArrowRight':
            if (   this.state.selectedEntityIndex !== -1
                && this.cursorAtEndOfInput()
                && this.getInputNode() === event.target) {
                event.nativeEvent.preventDefault();
                this.setValueWithSelectedEntity();
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
            if (   this.state.selectedEntityIndex !== -1
                && this.getInputNode() === event.target) {
                this.resetMatches();
            }

            break;

        case 'Enter':
            if (   this.state.selectedEntityIndex !== -1
                && this.getInputNode() === event.target) {
                event.nativeEvent.preventDefault();
                this.setValueWithSelectedEntity();
            } else {
                this.props.onComplete(this.state.userInput);
            }

            break;
        }
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

    handleInput(event) {
        this.computeMatches(event.target.value);
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
}

UITypeaheadInput.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    clearPartialInputOnSelection: React.PropTypes.bool,
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
    onEntitySelected: React.PropTypes.func,
    type: React.PropTypes.string,
    wrapperAttributes: React.PropTypes.object
};

UITypeaheadInput.defaultProps = {
    clearPartialInputOnSelection: false,
    entities: [],
    hintAttributes: {},
    matchWrapperAttributes: {},
    offscreenClass: 'ui-offscreen',
    onComplete: noop,
    onEntitySelected: noop,
    type: 'text',
    wrapperAttributes: {}
};

export default UITypeaheadInput;
