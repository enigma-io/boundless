/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

import React from 'react';
import UIView from '../UIView';
import noop from '../UIUtils/noop';
import cx from 'classnames';
import escaper from 'escape-string-regexp';

class UITypeaheadInput extends UIView {
    initialState() {
        return {
            entityMatchIndexes: [],
            selectedEntityIndex: -1,
            id: this.uuid(),
            userInput: this.props.defaultValue,
        };
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
            this.refs.matches.scrollTop = 0;
        } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop
    }

    getSelectedEntityText() {
        const entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.text : '';
    }

    handleMatchClick(index) {
        this.setState({selectedEntityIndex: index}, () => this.setValueWithSelectedEntity());
    }

    selectMatch(delta) {
        const matches = this.state.entityMatchIndexes;
        const totalMatches = matches.length;
        let nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

        if (totalMatches) {
            if (nextIndex < 0) {
                nextIndex = totalMatches - 1; // reverse loop
            } else if (nextIndex >= totalMatches) {
                nextIndex = 0; // loop
            }

            const matchIndex = matches[nextIndex];
            const matchesNode = this.refs.matches;
            const matchesNodeYEnd = matchesNode.scrollTop + matchesNode.clientHeight;
            const matchNode = this.refs[`match_$${matchIndex}`];
            const matchNodeYStart = matchNode.offsetTop;
            const matchNodeYEnd = matchNodeYStart + matchNode.clientHeight;

            // bring into view if necessary
            if (matchNodeYEnd >= matchesNodeYEnd) { // below
                matchesNode.scrollTop += matchNodeYEnd - matchesNodeYEnd;
            } else if (matchNodeYStart <= matchesNode.scrollTop) { // above
                matchesNode.scrollTop = matchNodeYStart;
            }

            this.setState({selectedEntityIndex: matchIndex});
        }
    }

    resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndexes: [],
        });
    }

    getInputNode() {
        return this.refs.input;
    }

    select() {
        this.refs.input.selectionStart = 0;
        this.refs.input.selectionEnd = this.refs.input.value.length;
    }

    focus() {
        this.getInputNode().focus();
    }

    focusInput() {
        console.warn('UITypeaheadInput.focusInput is deprecated and will be removed in a future release. Please use UITypeaheadInput.focus() instead.');
        this.focus();
    }

    value(newValue) {
        this.getInputNode().value = newValue;

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    }

    setValue(newValue) {
        console.warn('UITypeaheadInput.setValue is deprecated and will be removed in a future release. Please use UITypeaheadInput.value(text) instead.');
        this.value(newValue);
    }

    cursorAtEndOfInput() {
        const node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
    }

    setValueWithSelectedEntity() {
        this.props.onEntitySelected(this.state.selectedEntityIndex);

        if (this.props.clearPartialInputOnSelection) {
            this.value('');
        } else {
            this.value(this.getSelectedEntityText());
        }
    }

    markFuzzyMatchSubstring(entityContent, userText) {
        const frags = entityContent.split(new RegExp('(' + escaper(userText) + ')', 'ig'));
        const normalizedUserText = userText.toLowerCase();
        const threshold = frags.length;
        let i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = <mark key={i} className='ui-typeahead-match-highlight'>{frags[i]}</mark>;
            }
        }

        return frags;
    }

    markStartsWithMatchSubstring(entityContent, userInput) {
        const seekValue = userInput.toLowerCase();
        const indexStart = entityContent.toLowerCase().indexOf(seekValue);
        const indexEnd = indexStart + seekValue.length;

        return [
            <span key='0'>{entityContent.slice(0, indexStart)}</span>,
            <mark key='1' className='ui-typeahead-match-highlight'>{entityContent.slice(indexStart, indexEnd)}</mark>,
            <span key='2'>{entityContent.slice(indexEnd)}</span>,
        ];
    }

    markMatchSubstring(...args) {
        switch (this.props.algorithm) {
        case UITypeaheadInput.mode.STARTS_WITH:
            return this.markStartsWithMatchSubstring(...args);

        case UITypeaheadInput.mode.FUZZY:
            return this.markFuzzyMatchSubstring(...args);
        }

        if (typeof this.props.algorithm.markFunc === 'function') {
            return this.props.algorithm.markFunc(...args);
        }

        console.warn('No `props.algorithm.markFunc` was provided to UITypeaheadInput; falling back to the default marking algorithm.');

        return this.markStartsWithMatchSubstring(...args);
    }

    getFuzzyMatchIndexes(userText, entities) {
        const normalized = userText.toLowerCase();

        return entities.reduce(function findIndexes(result, entity, index) {
            return entity.text.toLowerCase().indexOf(normalized) !== -1 ? (result.push(index) && result) : result;
        }, []);
    }

    getStartsWithMatchIndexes(userText, entities) {
        const seekValue = userText.toLowerCase();

        return entities.reduce(function seekMatch(result, entity, index) {
            return entity.text.toLowerCase().indexOf(seekValue) === 0 ? (result.push(index) && result) : result;
        }, []);
    }

    getMatchIndexes(...args) {
        switch (this.props.algorithm) {
        case UITypeaheadInput.mode.STARTS_WITH:
            return this.getStartsWithMatchIndexes(...args);

        case UITypeaheadInput.mode.FUZZY:
            return this.getFuzzyMatchIndexes(...args);
        }

        if (typeof this.props.algorithm.matchFunc === 'function') {
            return this.props.algorithm.matchFunc(...args);
        }

        console.warn('No `props.algorithm.matchFunc` was provided to UITypeaheadInput; falling back to the default matching algorithm.');

        return this.getStartsWithMatchIndexes(...args);
    }

    computeMatches(entities = this.props.entities) {
        const currentValue = this.state.userInput;
        const matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

        this.setState({
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndexes: matches,
        });
    }

    handleInput(event) {
        this.setState({userInput: event.target.value}, () => this.computeMatches());

        if (this.props.onInput) {
            event.persist();
            this.props.onInput(event);
        }

        if (typeof this.props.inputProps.onInput === 'function') {
            event.persist();
            this.props.inputProps.onInput(event);
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
            this.focus();
            break;

        case 'ArrowDown':
            event.nativeEvent.preventDefault(); // block cursor movement
            this.selectMatch(1);
            this.focus();
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

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    renderNotification() {
        return (
            <div ref='aria'
                 id={this.state.id}
                 className={this.props.offscreenClass}
                 aria-live='polite'>
                {this.getSelectedEntityText()}
            </div>
        );
    }

    renderHint() {
        if (this.props.hint) {
            const userText = this.state.userInput;
            const raw = this.getSelectedEntityText();
            let processed = '';

            if (   raw
                && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return (
                <input {...this.props.hintProps}
                       ref='hint'
                       type={this.props.type || this.props.inputProps.type || 'text'}
                       className={cx({
                           'ui-typeahead-hint': true,
                           [this.props.hintProps.className]: !!this.props.hintProps.className,
                       })}
                       value={processed}
                       disabled={true}
                       tabIndex='-1' />
            );
        }
    }

    renderMatches() {
        if (this.state.entityMatchIndexes.length) {
            return (
                <div {...this.props.matchWrapperProps}
                     ref='matches'
                     className={cx({
                         'ui-typeahead-match-wrapper': true,
                         [this.props.matchWrapperProps.className]: !!this.props.matchWrapperProps.className,
                     })}>
                    {this.state.entityMatchIndexes.map(index => {
                        const entity = this.props.entities[index];

                        return (
                            <div {...entity}
                                 ref={`match_$${index}`}
                                 className={cx({
                                     'ui-typeahead-match': true,
                                     'ui-typeahead-match-selected': this.state.selectedEntityIndex === index,
                                     [entity.className]: !!entity.className,
                                 })}
                                 key={entity.text}
                                 onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(entity.text, this.state.userInput)}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        return (
            <div {...this.props}
                 type={null}
                 ref='wrapper'
                 className={cx({
                    'ui-typeahead-wrapper': true,
                    [this.props.className]: !!this.props.className,
                 })}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                {this.renderNotification()}
                {this.renderHint()}

                <input {...this.props.inputProps}
                       ref='input'
                       className={cx({
                           'ui-typeahead': true,
                           [this.props.inputProps.className]: !!this.props.inputProps.className,
                       })}
                       defaultValue={this.props.defaultValue || this.props.inputProps.defaultValue}
                       name={this.props.name || this.props.inputProps.name}
                       type={this.props.type || this.props.inputProps.type || 'text'}
                       aria-controls={this.state.id}
                       onInput={this.handleInput.bind(this)} />

                {this.renderMatches()}
            </div>
        );
    }
}

UITypeaheadInput.mode = {
    'STARTS_WITH': 'STARTS_WITH',
    'FUZZY': 'FUZZY',
};

UITypeaheadInput.propTypes = {
    algorithm: React.PropTypes.oneOfType([
        React.PropTypes.oneOf([
            UITypeaheadInput.mode.STARTS_WITH,
            UITypeaheadInput.mode.FUZZY,
        ]),
        React.PropTypes.shape({
            markFunc: React.PropTypes.func,
            matchFunc: React.PropTypes.func,
        }),
    ]),
    clearPartialInputOnSelection: React.PropTypes.bool,
    defaultValue: React.PropTypes.string,
    entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            text: React.PropTypes.string,
        })
    ),
    hint: React.PropTypes.bool,
    hintProps: React.PropTypes.object,
    inputProps: React.PropTypes.object,
    matchWrapperProps: React.PropTypes.object,
    name: React.PropTypes.string,
    offscreenClass: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    onInput: React.PropTypes.func,
    onEntitySelected: React.PropTypes.func,
    type: React.PropTypes.string,
};

UITypeaheadInput.defaultProps = {
    algorithm: UITypeaheadInput.mode.STARTS_WITH,
    clearPartialInputOnSelection: false,
    defaultValue: '',
    entities: [],
    hintProps: {},
    inputProps: {},
    matchWrapperProps: {},
    offscreenClass: 'ui-offscreen',
    onComplete: noop,
    onEntitySelected: noop,
};

export default UITypeaheadInput;
