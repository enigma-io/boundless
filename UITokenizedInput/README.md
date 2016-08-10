# UITokenizedInput
__Distill rich entity data matched via typeahead input into simple visual abstractions.__

Basic usage of this component is identical to that of [UITypeaheadInput](../UITypeaheadInput/README.md). Additional props are available to take advantage of the tokenization functionality.

> The UIKit Team recommends reviewing the [Token Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW4) of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UITokenizedInput` in your project.

---

### Example Usage

```jsx
import {
    UITokenizedInput,
    UIView,
} from 'enigma-uikit';

class MyTokenField extends UIView {
    state = {
        list: [
            {text: 'orange'},
            {text: 'apple'},
            {text: 'banana'},
        ],

        // these are indexes of entities in "list" above
        tokens: [0],

        // indexes are added to this array when the user tries to select a token
        tokens_selected: [],
    }

    addToken = index => {
        this.setState({tokens: this.state.tokens.concat(index)});
    }

    removeTokens = indexes => {
        this.setState({tokens: this.state.tokens.filter(index => indexes.indexOf(index) === -1)});
    }

    changeTokenSelection = indexes => this.setState({tokens_selected: indexes.slice(0)})

    render() {
        return (
            <UITokenizedInput
                entities={this.state.list}
                handleAddToken={this.addToken}
                handleRemoveTokens={this.removeTokens}
                handleNewSelection={this.changeTokenSelection}
                hint={true}
                inputProps={{
                    'aria-label': 'An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to  accept a text suggestion or the up and down arrows to cycle through the list when available.',
                    defaultValue: 'ap',
                    name: 'my-tokenfield',
                }}
                tokens={this.state.tokens}
                tokensSelected={this.state.tokens_selected} />
        );
    }
}
```

Renders:

```html
<div class="ui-tokenfield-wrapper">
    <div class="ui-tokenfield-tokens">
      <div class="ui-tokenfield-token">orange <div class="ui-tokenfield-token-close"></div></div>
    </div>
    <div class="ui-typeahead-wrapper">
        <div role="region" id="{uuid}" aria-live="polite">apple</div>
        <input type="text" class="ui-typeahead-hint" role="presentation" tabindex='-1' disabled />
        <input name="my-tokenfield" type="text" class="ui-tokenfield ui-typeahead" aria-label="An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to accept a text suggestion or the up and down arrows to cycle through the list when available." aria-controls="{uuid}" /> <!-- initializes to "or" -->
        <div class="ui-typeahead-match-wrapper" role="presentation">
            <div class="ui-typeahead-match" data-match="orange"><mark class="ui-typeahead-match-highlight">ap</mark>ple</div>
        </div>
    </div>
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-tokenfield`
- `.ui-tokenfield-wrapper`
- `.ui-tokenfield-tokens`
- `.ui-tokenfield-token`
- `.ui-tokenfield-token-close`
- `.ui-tokenfield-token-selected`

In addition, the hooks available in [`UITypeaheadInput`](../UITypeaheadInput/README.md) will be present.

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists, trigger `handleAddToken` with the entity index and clear out the input field
__Keyboard__ | `[Backspace]` on token | trigger `handleRemoveTokens` with the entity index(es)
__Keyboard__ | `[Left]` | cycle left through tokens if a token is already selected or cursor is at the start of the typeahead
__Keyboard__ | `[Right]` | cycle right through tokens if there are more than one tokens and the rightmost one is not selected
__Mouse__ | `[Click]` on token | focus token, calls `handleSelection` with the token's entity index
__Mouse__ | `[Click]` on token close | trigger `handleRemoveTokens` with the token's entity index

---

### Available instance methods

- __add(index: number)__
  programmatically creates a token for `props.entities[index]`; `props.handleAddToken` will be called as a hint to persist the change in your controller view or other application state

- __focus()__
  focuses the browser oon the underlying textual input for immediate text entry

- __getInputNode()__
  returns the raw underlying textual input DOM node

- __getSelectedEntityText()__
  returns the `text` property of the currently highlighted entity (from `props.entities`), or returns an empty string

- __getValue()__
  retrieves the current value of the underlying textual input

- __remove(index: number)__
  programmatically removes the token for `props.entities[index]`; `props.handleRemoveTokens` will be called as a hint to persist the change in your controller view or other application state

- __select()__
  programmatically creates a full selection on the underlying textual input such that a press of the Backspace key would fully clear the input

- __setValue(value: string)__
  sets the underlying textual input to the specified text and updates internal state; do not use this method when using `UITypeaheadInput` as a "controlled input"

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tokenfield-wrapper` node

- all props accepted by [`UITypeaheadInput`](../UITypeaheadInput/README.md)
- all props accepted by [`UITextualInput`](../UITextualInput/README.md)

- __handleAddToken(`Number`)__ `Function`
  function handler that is called when an entity is selected by the user and a token should be created

- __handleRemoveTokens(`Array<Number>`)__ `Function`
  function handler that is called when one or more tokens are removed by the user via clicking the "close" button or
  pressing the `Backspace` key while tokens are selected

- __handleNewSelection(`Array<Number>`)__ `Function`
  function handler that is called when one or more tokens are selected by the user via click or keyboard actions; called with
  what the new selection should be

- __tokenCloseComponent__ `ReactElement`
  (default `<div>X</div>`) the JSX used for the close button itself

- __tokenCloseVisible__ `Boolean`
  (default `true`) determines if the `.ui-tokenfield-token-close` element should be rendered for each token

- __tokens__ `Array<Number>`
  the indexes of entities that should be rendered as "tokens" in the component UI

- __tokensSelected__ `Array<Number>`
  the indexes of tokenized entities that are part of an active selection; the user can press `Backspace` to trigger `handleRemoveTokens`
