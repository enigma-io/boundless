# UITypeaheadInput
__Intelligently recommend entities via customizable, fuzzy recognition.__

UITypeaheadInput is an enhancement upon [UITextualInput](../UITextualInput/README.md) which provides two built-in matching algorithms and supports the use of custom matching and marking functions.

> The UIKit Team recommends reviewing the [Search Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW5) and [Text Input Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW3) sections of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UITypeaheadInput` in your project.

UITypeaheadInput offers two built-in matching algorithms: "fuzzy" (the default) and "starts-with". For the examples below, imagine the `<>` in the "marked" section is a wrapping `<div class="ui-typeahead-match-highlight"></div>`:

1. __"Starts-with" matching & marking__ `algorithm={UITypeahead.mode.STARTS_WITH}`
   For user input `"a"` and entity texts `["apple", "grape", "apricot"]`:

   Matched: `["apple", "apricot"]`<br/>
   Marked: `["<a>pple", "<a>pricot"]`<br/><br/>

1. __"Fuzzy" matching & marking__ `algorithm={UITypeahead.mode.FUZZY}`
   For user input `"a"` and entity texts `["apple", "grape", "apricot"]`:

   Matched: `["apple", "grape", "apricot"]`<br/>
   Marked: `["<a>pple", "gr<a>pe", "<a>pricot"]`<br/><br/>

1. __Custom matching & marking__ `algorithm={{matcher: yourMatchFunc, marker: yourMarkFunc}}`
   Optionally, you can provide your own combination of matching and marking functions. For example, loosening the matching to include unicode variants of characters could be useful, e.g. ç &rarr; c

   Follow the guide in the [props summary for algorithm](#available-props).

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Down]` | select the next available typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Up]` | select the previous typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Right, Tab]` | fill the currently-selected typeahead text into the input field, dismiss matches
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists; if no typeahead match, call `onComplete` if supplied
__Keyboard__ | `[Escape]` | clear typeahead matches if they exist
__Mouse__ | `[Click]` on typeahead match | fill the selected typeahead match text into the input field, dismiss matches, return focus to input

---

### Component Instance Methods

When using `UITypeaheadInput` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __focus()__
  focuses the browser oon the underlying textual input for immediate text entry

- __getInputNode()__
  returns the raw underlying textual input DOM node

- __getSelectedEntityText()__
  returns the `text` property of the currently highlighted entity (from `props.entities`), or returns an empty string

- __getValue()__
  retrieves the current value of the underlying textual input

- __select()__
  programmatically creates a full selection on the underlying textual input such that a press of the Backspace key would fully clear the input

- __setValue(value: string)__
  sets the underlying textual input to the specified text and updates internal state; do not use this method when using `UITypeaheadInput` as a "controlled input"

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-wrapper` node

- all supported [UITextualInput props](../UITextualInput/README.md#available-props); applied to the `.ui-textual-input-wrapper` node

- __algorithm__ `Object|UITypeaheadInput.mode.STARTS_WITH|UITypeaheadInput.mode.FUZZY`
  (default `UITypeaheadInput.mode.FUZZY`) the mechanism used to identify and mark matching substrings; a custom set can be provided with the Object format:<br/><br/>

    - __algorithm.matcher__ `Function|UITypeaheadInput.mode.STARTS_WITH|UITypeaheadInput.mode.FUZZY`
      provide a custom matching algorithm, adhering to this format:

      ```js
      myMatchFunc(inputText, entities) {
          // ...
          return [match1Index, match2Index, /* ... */];
      }
      ```

      the index is stored instead of the entire entity to conserve memory and reduce data duplication

    - __algorithm.marker__ `Function|UITypeaheadInput.mode.STARTS_WITH|UITypeaheadInput.mode.FUZZY`
      provide a custom marking function, allows for the use of custom templating / developer-defined CSS hooks, adhering to this format:

      ```js
      myMarkFunc(inputText, entity) {
          return /* desired JSX templating */];
      }
      ```

- __offscreenClass__ `String`
  the "offscreen" class used by your application; specifically to retain [ARIA navigability](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) as `display: none` excludes the element from consideration

- __entities__ `Array<Object>`
    - __entities[].*__ `*`
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the appropriate `.ui-typeahead-match` node
    - __entities[].text__ `String`
      the text to be used to do string comparison and match against

- __hint__ `Boolean`
  renders a disabled textfield with the full text of the currently selected input hint; will remain blank if the matched substring is not at the beginning of the user input

- __hintProps__ `Object`
    - __hintProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-hint` node

- __inputProps__ `Object`
    - __inputProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the main input node, `.ui-typeahead`

- __matchWrapperProps__ `Object`
    - __matchWrapperProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-match-wrapper` node

- __onEntityHighlighted__ `Function(index: number)`
  called with the index of the highlighted entity due to keyboard selection

- __onEntitySelected__ `Function(index: number)`
  called with the index of the entity selected by the user

- __onComplete__ `Function(value: string, event: object)`
  called when the user presses `Enter` with no autosuggest hint available, indicating that input is complete
