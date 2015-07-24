import UIView from '../UIView';
import React from 'react';

class UITypeahead extends UIView {
    initialState() {
        return {
            entityMatchIndices: [],
            selectedEntityIndex: -1,
            uuid: this.uuid()
        };
    }

    getClassNames() {
        return ['ui-typeahead-wrapper'].concat(this.props.className).join(' ');
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.computeMatches(this.props.defaultValue);
        }
    }

    render() {
        return (
            <div className={this.getClassNames()}
                 onKeyDown={this.handleKeyDown.bind(this)}>
                {this.renderNotification()}
                {this.renderHint()}

                <input {...this.props}
                       ref='input'
                       className='ui-typeahead'
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
                {this.getSelectedEntity()}
            </div>
        );
    }

    renderHint() {
        if (this.props.showHint) {
            let userText = this.state.userInput;
            let raw = this.getSelectedEntity();
            let processed = '';

            if (raw && raw.toLowerCase().indexOf(userText.toLowerCase()) === 0) {
                processed = raw.replace(new RegExp(userText, 'i'), userText);
            }

            return (
                <input ref='hint'
                       type='text'
                       className='ui-typeahead-hint'
                       value={processed}
                       disabled={true}
                       tabIndex='-1' />
            );
        }
    }

    renderMatches() {
        if (this.state.entityMatchIndices.length) {
            return (
                <div ref='matches' className='ui-typeahead-match-wrapper'>
                    {this.state.entityMatchIndices.map((index) => {
                        let entity = this.props.entities[index];
                        let classes = ['ui-typeahead-match'];

                        if (this.state.selectedEntityIndex === index) {
                            classes.push('ui-typeahead-match-selected');
                        }

                        return (
                            <div className={classes.join(' ')}
                                 key={this.createHashedKey(entity)}
                                 onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(entity, this.state.userInput)}
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

    markMatchSubstring(entity, userInput) {
        if (this.props.markFunc) {
            return this.props.markFunc(entity, userInput);
        }

        let seekValue = userInput.toLowerCase();
        let indexStart = entity.toLowerCase().indexOf(seekValue);
        let indexEnd = indexStart + seekValue.length;

        let start = entity.slice(0, indexStart);
        let middle = entity.slice(indexStart, indexEnd);
        let end = entity.slice(indexEnd);

        return [
            <span key={start}>{start}</span>,
            <mark key={middle} className='ui-typeahead-match-highlight'>{middle}</mark>,
            <span key={end}>{end}</span>
        ];
    }

    resetMatches() {
        this.setState({
            selectedEntityIndex: -1,
            entityMatchIndices: []
        });
    }

    getSelectedEntity() {
        return this.props.entities[this.state.selectedEntityIndex];
    }

    // The default implementation is a simple "starts-with" search
    getMatchIndices(currentValue, entities) {
        if (this.props.matchFunc) {
            return this.props.matchFunc(currentValue, entities);
        }

        let seekValue = currentValue.toLowerCase();

        return entities.reduce(function seekMatch(result, entity, index) {
            return entity.toLowerCase().indexOf(seekValue) === 0 ? (result.push(index) && result) : result;
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

    handleKeyDown(event) {
        switch (event.key) {
        case 'Tab':
        case 'ArrowRight':
            if (this.state.selectedEntityIndex !== -1
                && this.cursorAtEndOfInput()
                && this.getInputNode() === event.target) {
                event.nativeEvent.preventDefault();
                this.setValue(this.getSelectedEntity());
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
                this.setValue(this.getSelectedEntity());
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
        this.setValue(this.props.entities[index]);
    }
}

UITypeahead.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    defaultValue: React.PropTypes.string,
    entities: React.PropTypes.arrayOf(React.PropTypes.string),
    markFunc: React.PropTypes.func,
    matchFunc: React.PropTypes.func,
    offscreenClass: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    showHint: React.PropTypes.bool,
    type: React.PropTypes.string
};

UITypeahead.defaultProps = {
    entities: [],
    offscreenClass: 'ui-offscreen',
    type: 'text'
};

export default UITypeahead;
