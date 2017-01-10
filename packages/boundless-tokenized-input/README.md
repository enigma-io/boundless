# TokenizedInput
__Distill rich entity data matched via typeahead input into simple visual abstractions.__

Basic usage of this component is identical to that of [Typeahead](https://github.com/bibliotech/uikit/tree/master/packages/boundless-typeahead). Additional props are available to take advantage of the tokenization functionality.

> The Boundless Team recommends reviewing the [Token Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW4) of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `TokenizedInput` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists, trigger `handleAddToken` with the entity index and clear out the input field
__Keyboard__ | `[Backspace]` on token | trigger `handleRemoveTokens` with the entity index(es)
__Keyboard__ | `[Left]` | cycle left through tokens if a token is already selected or cursor is at the start of the typeahead
__Keyboard__ | `[Right]` | cycle right through tokens if there are more than one tokens and the rightmost one is not selected
__Mouse__ | `[Click]` on token | focus token, calls `handleSelection` with the token's entity index
__Mouse__ | `[Click]` on token close | trigger `handleRemoveTokens` with the token's entity index

---

### Component Instance Methods

When using `TokenizedInput` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

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
  sets the underlying textual input to the specified text and updates internal state; do not use this method when using `Typeahead` as a "controlled input"
