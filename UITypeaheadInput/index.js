/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

import React, { PropTypes } from 'react';
import UITextualInput from '../UITextualInput';
import UIView from '../UIView';
import noop from '../UIUtils/noop';
import cx from 'classnames';
import escaper from 'escape-string-regexp';

const is_string = test => typeof test === 'string';

export default class UITypeaheadInput extends UIView {
    static mode = {
        'STARTS_WITH': 'STARTS_WITH',
        'FUZZY': 'FUZZY',
    }

    static propTypes = {
        algorithm: PropTypes.oneOfType([
            PropTypes.oneOf([
                UITypeaheadInput.mode.STARTS_WITH,
                UITypeaheadInput.mode.FUZZY,
            ]),
            PropTypes.shape({
                markFunc: PropTypes.func,
                matchFunc: PropTypes.func,
            }),
        ]),
        clearPartialInputOnSelection: PropTypes.bool,
        defaultValue: PropTypes.string,
        entities: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string,
            })
        ),
        hint: PropTypes.bool,
        hintProps: PropTypes.object,
        inputProps: PropTypes.shape({
            className: PropTypes.string,
            defaultValue: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string,
        }),
        matchWrapperProps: PropTypes.object,
        name: PropTypes.string,
        offscreenClass: PropTypes.string,
        onComplete: PropTypes.func,
        onInput: PropTypes.func,
        onEntityHighlighted: PropTypes.func,
        onEntitySelected: PropTypes.func,
        type: PropTypes.string,
        value: PropTypes.string,
    }

    static defaultProps = {
        algorithm: UITypeaheadInput.mode.STARTS_WITH,
        clearPartialInputOnSelection: false,
        entities: [],
        hintProps: {},
        inputProps: {},
        matchWrapperProps: {},
        offscreenClass: 'ui-offscreen',
        onComplete: noop,
        onEntityHighlighted: noop,
        onEntitySelected: noop,
    }

    state = {
        entityMatchIndexes: [],
        selectedEntityIndex: -1,
        id: this.uuid(),
        is_controlled: is_string(this.props.inputProps.value) || is_string(this.props.value),
        userInput:    this.props.inputProps.value
                   || this.props.value
                   || this.props.inputProps.defaultValue
                   || this.props.defaultValue
                   || '',
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

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.setState({userInput: nextProps.inputProps.value});
        } else if (nextProps.value !== this.props.value) {
            this.setState({userInput: nextProps.value});
        }
    }

    componentDidMount() {
        if (this.state.selectedEntityIndex >= 0) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.entityMatchIndexes.length && !prevState.entityMatchIndexes.length) {
            this.refs.matches.scrollTop = 0;
        } // fix an odd bug in FF where it initializes the element with an incorrect scrollTop

        if (   this.state.selectedEntityIndex >= 0
            && this.props.entities[this.state.selectedEntityIndex] !== prevProps.entities[prevState.selectedEntityIndex]) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    }

    getSelectedEntityText() {
        const entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.text : '';
    }

    handleMatchClick(index) {
        this.setState({selectedEntityIndex: index}, this.setValueWithSelectedEntity);
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
        return this.refs.input.refs.field;
    }

    select() {
        const input = this.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = input.length;
    }

    focus() {
        this.getInputNode().focus();
    }

    value(newValue) {
        this.refs.input.value(newValue);

        this.setState({ userInput: newValue });
        this.resetMatches();
        this.focus();
    }

    cursorAtEndOfInput() {
        const node = this.getInputNode();

        return node.selectionStart === node.selectionEnd && node.selectionEnd === node.value.length;
    }

    setValueWithSelectedEntity = () => {
        this.props.onEntitySelected(this.state.selectedEntityIndex);

        if (this.props.clearPartialInputOnSelection) {
            this.value('');
        } else {
            this.value(this.getSelectedEntityText());
        }
    }

    markFuzzyMatchSubstring(input, entity) {
        const entityContent = entity.text;
        const frags = entityContent.split(new RegExp('(' + escaper(input) + ')', 'ig'));
        const normalizedUserText = input.toLowerCase();
        const threshold = frags.length;
        let i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = <mark key={i} className='ui-typeahead-match-highlight'>{frags[i]}</mark>;
            }
        }

        return frags;
    }

    markStartsWithMatchSubstring(input, entity) {
        const entityContent = entity.text;
        const seekValue = input.toLowerCase();
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

        if (!this.warned_markFunc) {
            this.warned_markFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.markFunc` was provided; falling back to the default marking algorithm.');
        }

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

        if (!this.warned_matchFunc) {
            this.warned_matchFunc = true;
            console.warn('UITypeaheadInput: no `props.algorithm.matchFunc` was provided; falling back to the default matching algorithm.');
        }

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

    handleInput = (event) => {
        event.stopPropagation();

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

    handleKeyDown = (event) => {
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
                && this.getInputNode() === event.target
                && !event.shiftKey) {
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
            <div
                ref='aria'
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
                <div
                    {...this.props.hintProps}
                    ref='hint'
                    className={cx({
                        'ui-textual-input': true,
                        'ui-textual-input-placeholder': true,
                        'ui-typeahead-hint': true,
                        [this.props.hintProps.className]: !!this.props.hintProps.className,
                    })}
                    tabIndex='-1'>
                    {processed}
                </div>
            );
        }
    }

    renderMatches() {
        if (this.state.entityMatchIndexes.length) {
            return (
                <div
                    {...this.props.matchWrapperProps}
                    ref='matches'
                    className={cx({
                        'ui-typeahead-match-wrapper': true,
                        [this.props.matchWrapperProps.className]: !!this.props.matchWrapperProps.className,
                    })}>
                    {this.state.entityMatchIndexes.map(index => {
                        const entity = this.props.entities[index];

                        return (
                            <div
                                {...entity}
                                ref={`match_$${index}`}
                                className={cx({
                                    'ui-typeahead-match': true,
                                    'ui-typeahead-match-selected': this.state.selectedEntityIndex === index,
                                    [entity.className]: !!entity.className,
                                })}
                                key={entity.text}
                                onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(this.state.userInput, entity)}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        const { props, state } = this;

        return (
            <div
                {...props}
                type={null}
                ref='wrapper'
                className={cx({
                   'ui-typeahead-wrapper': true,
                   [props.className]: !!props.className,
                })}
                onKeyDown={this.handleKeyDown}>
                {this.renderNotification()}
                {this.renderHint()}

                <UITextualInput
                    ref='input'
                    inputProps={{
                        ...props.inputProps,
                        className: cx({
                            'ui-typeahead': true,
                            [props.inputProps.className]: !!props.inputProps.className,
                        }),
                        defaultValue: state.is_controlled === true ? undefined : props.inputProps.defaultValue || props.defaultValue || '',
                        name: props.inputProps.name || props.name,
                        type: props.inputProps.type || props.type,
                        onInput: this.handleInput,
                        value: state.is_controlled === true ? props.inputProps.value || props.value || '' : undefined,
                    }}
                    aria-controls={state.id} />

                {this.renderMatches()}
            </div>
        );
    }
}
