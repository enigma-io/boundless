/**
 * Intelligently recommend entities via customizable, fuzzy recognition.
 * @class UITypeaheadInput
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UITypeaheadInput extends UIView {
    initialState() {
        return {
            entityMatchIndices: [],
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

    getSelectedEntityContent() {
        const entity = this.props.entities[this.state.selectedEntityIndex];

        return entity ? entity.content : '';
    }

    renderNotification() {
        return (
            <div ref='aria'
                 id={this.state.id}
                 className={this.props.offscreenClass}
                 aria-live='polite'>
                {this.getSelectedEntityContent()}
            </div>
        );
    }

    renderHint() {
        if (this.props.hint) {
            const userText = this.state.userInput;
            const raw = this.getSelectedEntityContent();
            let processed = '';

            if (   raw
                && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return (
                <input {...this.props.hintProps}
                       ref='hint'
                       type='text'
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

    handleMatchClick(index) {
        this.setState({selectedEntityIndex: index}, () => this.setValueWithSelectedEntity());
    }

    markMatchSubstring(entityContent, userInput) {
        if (this.props.markFunc) {
            return this.props.markFunc(entityContent, userInput);
        }

        const seekValue = userInput.toLowerCase();
        const indexStart = entityContent.toLowerCase().indexOf(seekValue);
        const indexEnd = indexStart + seekValue.length;

        return [
            <span key='0'>{entityContent.slice(0, indexStart)}</span>,
            <mark key='1' className='ui-typeahead-match-highlight'>{entityContent.slice(indexStart, indexEnd)}</mark>,
            <span key='2'>{entityContent.slice(indexEnd)}</span>,
        ];
    }

    renderMatches() {
        if (this.state.entityMatchIndices.length) {
            return (
                <div {...this.props.matchWrapperProps}
                     ref='matches'
                     className={cx({
                         'ui-typeahead-match-wrapper': true,
                         [this.props.matchWrapperProps.className]: !!this.props.matchWrapperProps.className,
                     })}>
                    {this.state.entityMatchIndices.map(index => {
                        const entity = this.props.entities[index];

                        return (
                            <div {...entity}
                                 className={cx({
                                     'ui-typeahead-match': true,
                                     'ui-typeahead-match-selected': this.state.selectedEntityIndex === index,
                                     [entity.className]: !!entity.className,
                                 })}
                                 key={entity.content}
                                 onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(entity.content, this.state.userInput)}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    selectMatch(delta) {
        const matches = this.state.entityMatchIndices;
        const totalMatches = matches.length;
        let nextIndex = matches.indexOf(this.state.selectedEntityIndex) + delta;

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
            entityMatchIndices: [],
        });
    }

    getInputNode() {
        return this.refs.input;
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
        const node = this.getInputNode();

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

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    // The default implementation is a simple "starts-with" search
    getMatchIndices(currentValue, entities) {
        if (this.props.matchFunc) {
            return this.props.matchFunc(currentValue, entities);
        }

        const seekValue = currentValue.toLowerCase();

        return entities.reduce(function seekMatch(result, entity, index) {
            return entity.content.toLowerCase().indexOf(seekValue) === 0 ? (result.push(index) && result) : result;
        }, []);
    }

    computeMatches(entities = this.props.entities) {
        const currentValue = this.state.userInput;
        const matches = currentValue === '' ? [] : this.getMatchIndices(currentValue, entities);

        this.setState({
            selectedEntityIndex: matches.length ? matches[0] : -1,
            entityMatchIndices: matches,
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

    render() {
        return (
            <div {...this.props}
                 defaultValue={undefined}
                 name={undefined}
                 type={undefined}
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

UITypeaheadInput.propTypes = {
    clearPartialInputOnSelection: React.PropTypes.bool,
    defaultValue: React.PropTypes.string,
    entities: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            content: React.PropTypes.string,
        })
    ),
    hint: React.PropTypes.bool,
    hintProps: React.PropTypes.object,
    inputProps: React.PropTypes.object,
    markFunc: React.PropTypes.func,
    matchFunc: React.PropTypes.func,
    matchWrapperProps: React.PropTypes.object,
    name: React.PropTypes.string,
    offscreenClass: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    onInput: React.PropTypes.func,
    onEntitySelected: React.PropTypes.func,
    type: React.PropTypes.string,
};

UITypeaheadInput.defaultProps = {
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
