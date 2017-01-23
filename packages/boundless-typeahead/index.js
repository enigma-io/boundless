import React, {PropTypes} from 'react';
import cx from 'classnames';
import escaper from 'escape-string-regexp';

import Input from '../boundless-input/index';
import extractChildProps from '../boundless-utils-object-intersection/index';
import isFunction from '../boundless-utils-is-function/index';
import isString from '../boundless-utils-is-string/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

/**
# Typeahead
__Intelligently recommend entities via customizable, fuzzy recognition.__

Typeahead is an enhancement upon [Input](https://github.com/bibliotech/uikit/tree/master/packages/boundless-input) which provides two built-in matching algorithms ("fuzzy" \[default\] and "starts-with") and supports the use of custom matching and marking functions.

In the examples below, imagine the `<>` in the "marks" section is a wrapping `<mark>` element:

1. __"Starts-with" matching & marking__
   ```jsx
   <Typeahead
       algorithm={Typeahead.mode.STARTS_WITH}
       entities={[
           {text: 'apple'},
           {text: 'apricot'},
           {text: 'grape'},
       ]}
       inputProps={{value: 'a'}} />
   ```

   + matches: `"apple", "apricot"`
   + marks: `"<a>pple", "<a>pricot"`

1. __"Fuzzy" matching & marking__
   ```jsx
   <Typeahead
       algorithm={Typeahead.mode.FUZZY}
       entities={[
           {text: 'apple'},
           {text: 'apricot'},
           {text: 'grape'},
       ]}
       inputProps={{value: 'a'}} />
   ```

   + matches: `"apple", "apricot", "grape"`
   + marks: `"<a>pple", "<a>pricot", "gr<a>pe"`

1. __Custom matching & marking__

    Optionally, you can provide your own combination of matching and marking functions. For example, loosening the matching to include unicode variants of characters could be useful, e.g. ç &rarr; c

    ```jsx
    <Typeahead
        algorithm={{
            matcher: yourMatchFunc,
            marker: yourMarkFunc,
        }} />
    ```

## Component Instance Methods

When using `Typeahead` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __`focus()`__
  focuses the browser oon the underlying textual input for immediate text entry

- __`getInputNode()`__
  returns the raw underlying textual input DOM node

- __`getSelectedEntityText()`__
  returns the `text` property of the currently highlighted entity (from `props.entities`), or returns an empty string

- __`getValue()`__
  retrieves the current value of the underlying textual input

- __`select()`__
  programmatically creates a full selection on the underlying textual input such that a press of the Backspace key would fully clear the input

- __`setValue(value: string)`__
  sets the underlying textual input to the specified text and updates internal state; do not use this method when using `Typeahead` as a "controlled input"
 */
export default class Typeahead extends React.PureComponent {
    static mode = {
        'STARTS_WITH': 'STARTS_WITH',
        'FUZZY': 'FUZZY',
    }

    static propTypes = {
        /** Typeahead accepts all supported [Input props](/Input#props) */
        ...Input.propTypes,

        /**
            the mechanism used to identify and mark matching substrings; a custom set can be provided as an object (see the properties below)
         */
        algorithm: PropTypes.oneOfType([
            PropTypes.oneOf([
                Typeahead.mode.STARTS_WITH,
                Typeahead.mode.FUZZY,
            ]),
            PropTypes.shape({
                /**
                    the return value of the function format will be what shows up in the typeahead dropdown list (JSX arrays are accepted, the component will provide the wrapper)

                    an example marking function:

                    ```js
                    startsWithMarkingFunc(inputText, entity) {
                        const entityContent = entity.text;
                        const seekValue = input.toLowerCase();
                        const indexStart = entityContent.toLowerCase().indexOf(seekValue);
                        const indexEnd = indexStart + seekValue.length;

                        return [
                            <span key='before'>{entityContent.slice(0, indexStart)}</span>,
                            <mark key='mark'>{entityContent.slice(indexStart, indexEnd)}</mark>,
                            <span key='after'>{entityContent.slice(indexEnd)}</span>,
                        ];
                    }
                    ```
                 */
                marker: PropTypes.oneOfType([
                    PropTypes.func,
                    PropTypes.oneOf([
                        Typeahead.mode.STARTS_WITH,
                        Typeahead.mode.FUZZY,
                    ]),
                ]),

                /**
                    the return value of the function format determines which entities will be passed to the marking function

                    an example matching function:

                    ```js
                    startsWithMatchingFunc(inputText, entities) {
                        const seekValue = userText.toLowerCase();

                        return entities.reduce(function seekMatch(results, entity, index) {
                            if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                                results.push(index);
                            }

                            return results;
                        }, []);
                    }
                    ```
                 */
                matcher: PropTypes.oneOfType([
                    PropTypes.func,
                    PropTypes.oneOf([
                        Typeahead.mode.STARTS_WITH,
                        Typeahead.mode.FUZZY,
                    ]),
                ]),
            }),
        ]),

        /**
         * if `true`, clears the input text when a (partial) match is selected
         */
        clearOnSelection: PropTypes.bool,

        /**
         * an array of objects that user input is filtered against; at a minimum, each object must have a `text` property and any other supplied property is passed through to the resulting DOM element
         */
        entities: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * the text to be used to do string comparison and match against
                 */
                text: PropTypes.string.isRequired,
            })
        ),

        /**
         * renders a disabled textfield with the full text of the currently selected input hint; will remain blank if the matched substring is not at the beginning of the user input
         */
        hint: PropTypes.bool,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-typeahead-hint` HTML element
         */
        hintProps: PropTypes.object,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-typeahead-match-wrapper` HTML element
         */
        matchWrapperProps: PropTypes.object,

        /**
         * the "offscreen" class used by your application; specifically to retain [ARIA navigability](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) as `display: none` excludes the element from consideration
         */
        offscreenClass: PropTypes.string,

        /**
         * called when the user presses `Enter` with no autosuggest hint available, indicating that input is complete
         */
        onComplete: PropTypes.func,

        /**
         * called with the index of the highlighted entity due to keyboard selection
         */
        onEntityHighlighted: PropTypes.func,

        /**
         * called with the index of the entity selected by the user
         */
        onEntitySelected: PropTypes.func,
    }

    static defaultProps = {
        ...Input.defaultProps,
        algorithm: Typeahead.mode.FUZZY,
        clearOnSelection: false,
        entities: [],
        hint: null,
        hintProps: {},
        matchWrapperProps: {},
        offscreenClass: 'b-offscreen',
        onComplete: noop,
        onEntityHighlighted: noop,
        onEntitySelected: noop,
    }

    static internalKeys = Object.keys(Typeahead.defaultProps)

    state = {
        entityMatchIndexes: [],
        id: uuid(),
        isControlled: isString(this.props.inputProps.value),
        input: this.props.inputProps.value
               || this.props.inputProps.defaultValue
               || '',
        selectedEntityIndex: -1,
    }

    mounted = false

    updateInputState = (value = '') => this.setState({input: value})

    componentWillMount() {
        if (this.props.inputProps.value || this.props.inputProps.defaultValue) {
            this.computeMatches();
        }
    }

    componentDidMount() {
        this.mounted = true;

        if (this.state.selectedEntityIndex >= 0) {
            this.props.onEntityHighlighted(this.state.selectedEntityIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entities !== this.props.entities) {
            this.computeMatches(nextProps.entities);
        }

        if (nextProps.inputProps.value !== this.props.inputProps.value) {
            this.updateInputState(nextProps.inputProps.value);
            this.computeMatches();
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

    componentWillUnmount() {
        this.mounted = false;
    }

    getSelectedEntityText = () => {
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

    resetMatches = () => {
        if (this.mounted) {
            this.setState({
                selectedEntityIndex: -1,
                entityMatchIndexes: [],
            });
        }
    }

    getInputNode = () => this.refs.input.refs.field

    select = () => {
        const input = this.getInputNode();

        input.selectionStart = 0;
        input.selectionEnd = this.getValue().length;
    }

    focus = () => this.getInputNode().focus()
    getValue = () => this.refs.input.getValue()

    setValue = (value = '') => {
        this.refs.input.setValue(value);

        this.updateInputState(value);
        this.resetMatches();
        this.focus();
    }

    cursorAtEndOfInput() {
        const node = this.getInputNode();

        return    node.selectionStart === node.selectionEnd
               && node.selectionEnd === this.getValue().length;
    }

    setValueWithSelectedEntity = () => {
        this.props.onEntitySelected(this.state.selectedEntityIndex);

        if (this.props.clearOnSelection) {
            this.setValue('');
        } else {
            this.setValue(this.getSelectedEntityText());
        }

        // needs to happen after the upcoming render that will be triggered by `setValue`
        window.setTimeout(this.resetMatches, 0);
    }

    markFuzzyMatchSubstring(input, entity) {
        const entityContent = entity.text;
        const frags = entityContent.split(new RegExp('(' + escaper(input) + ')', 'ig'));
        const normalizedUserText = input.toLowerCase();
        const threshold = frags.length;
        let i = -1;

        while (++i < threshold) {
            if (frags[i].toLowerCase() === normalizedUserText) {
                frags[i] = <mark key={i} className='b-typeahead-match-highlight'>{frags[i]}</mark>;
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
            <mark key='1' className='b-typeahead-match-highlight'>{entityContent.slice(indexStart, indexEnd)}</mark>,
            <span key='2'>{entityContent.slice(indexEnd)}</span>,
        ];
    }

    getMarkingFunction() {
        if (isString(this.props.algorithm)) {
            if (this.props.algorithm === Typeahead.mode.STARTS_WITH) {
                return this.markStartsWithMatchSubstring;
            }

            return this.markFuzzyMatchSubstring;

        } else if (isFunction(this.props.algorithm.marker)) {
            return this.props.algorithm.marker;
        }

        if (this.warnedMarker === undefined) {
            this.warnedMarker = true;
            console.warn('Typeahead: no `props.algorithm.marker` was provided; falling back to the default marking algorithm (FUZZY).');
        }

        return this.markFuzzyMatchSubstring;
    }

    markMatchSubstring = (...args) => this.getMarkingFunction()(...args)

    getFuzzyMatchIndexes(userText, entities) {
        const normalized = userText.toLowerCase();

        return entities.reduce(function findIndexes(result, entity, index) {
            return   entity.text.toLowerCase().indexOf(normalized) !== -1
                   ? (result.push(index) && result)
                   : result;
        }, []);
    }

    getStartsWithMatchIndexes(userText, entities) {
        const seekValue = userText.toLowerCase();

        return entities.reduce(function seekMatch(results, entity, index) {
            if (entity.text.toLowerCase().indexOf(seekValue) === 0) {
                results.push(index);
            }

            return results;

        }, []);
    }

    getMatchingFunction() {
        if (isString(this.props.algorithm)) {
            if (this.props.algorithm === Typeahead.mode.STARTS_WITH) {
                return this.getStartsWithMatchIndexes;
            }

            return this.getFuzzyMatchIndexes;

        } else if (isFunction(this.props.algorithm.matcher)) {
            return this.props.algorithm.matcher;
        }

        if (this.warnedMatcher === undefined) {
            this.warnedMatcher = true;
            console.warn('Typeahead: no `props.algorithm.matcher` was provided; falling back to the default matching algorithm (FUZZY).');
        }

        return this.getFuzzyMatchIndexes;
    }

    getMatchIndexes = (...args) => this.getMatchingFunction()(...args)

    computeMatches(providedEntities) {
        this.setState((state, props) => {
            const entities = providedEntities || props.entities;
            const currentValue = state.input;
            const matches = currentValue === '' ? [] : this.getMatchIndexes(currentValue, entities);

            return {
                selectedEntityIndex: matches.length ? matches[0] : -1,
                entityMatchIndexes: matches,
            };
        });
    }

    handleChange = (event) => {
        if (this.state.isControlled === false) {
            this.updateInputState(event.target.value);
            this.computeMatches();
        }

        if (isFunction(this.props.inputProps.onChange)) {
            this.props.inputProps.onChange(event);
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
                this.props.onComplete(this.state.input, event);
            }

            break;
        }

        if (isFunction(this.props.onKeyDown)) {
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
            const userText = this.state.input;
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
                    className={cx(
                        'b-input',
                        'b-input-placeholder',
                        'b-typeahead-hint',
                        this.props.hintProps.className,
                    )}
                    tabIndex='-1'>
                    {processed}
                </div>
            );
        }
    }

    renderMatches() {
        if (this.state.entityMatchIndexes.length) {
            const props = this.props.matchWrapperProps;

            return (
                <div
                    {...props}
                    ref='matches'
                    className={cx('b-typeahead-match-wrapper', props.className)}>
                    {this.state.entityMatchIndexes.map((index) => {
                        const entity = this.props.entities[index];
                        const {className, text, ...rest} = entity;

                        return (
                            <div
                                {...rest}
                                ref={`match_$${index}`}
                                className={cx('b-typeahead-match', className, {
                                    'b-typeahead-match-selected': this.state.selectedEntityIndex === index,
                                })}
                                key={text}
                                onClick={this.handleMatchClick.bind(this, index)}>
                                {this.markMatchSubstring(this.state.input, entity)}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        const {props, state} = this;

        return (
            <div
                {...omit(props, Typeahead.internalKeys)}
                ref='wrapper'
                className={cx('b-typeahead-wrapper', props.className)}
                onKeyDown={this.handleKeyDown}>
                {this.renderNotification()}
                {this.renderHint()}

                <Input
                    {...extractChildProps(props, Input.defaultProps)}
                    ref='input'
                    aria-controls={state.id}
                    inputProps={{
                        ...props.inputProps,
                        className: cx('b-typeahead', props.inputProps.className),
                        onChange: this.handleChange,
                    }} />

                {this.renderMatches()}
            </div>
        );
    }
}
