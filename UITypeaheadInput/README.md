# UITypeaheadInput
__Intelligently recommend entities via customizable, fuzzy recognition.__

UITypeaheadInput is an enhancement upon [UITextualInput](../UITextualInput/README.md) which provides two built-in matching algorithms and supports the use of custom matching and marking functions.

> The UIKit Team recommends reviewing the [Search Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW5) and [Text Input Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW3) sections of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UITypeaheadInput` in your project.

---

UITypeaheadInput offers two built-in matching algorithms: "starts-with" (the default) and "fuzzy". For the examples below, imagine the `<>` in the "marked" section is a wrapping `<div class="ui-typeahead-match-highlight"></div>`:

1. __"Starts-with" matching & marking__ `algorithm={UITypeahead.mode.STARTS_WITH}`
   For user input `"a"` and entity texts `["apple", "grape", "apricot"]`:

   Matched: `["apple", "apricot"]`<br/>
   Marked: `["<a>pple", "<a>pricot"]`<br/><br/>

1. __"Fuzzy" matching & marking__ `algorithm={UITypeahead.mode.FUZZY}`
   For user input `"a"` and entity texts `["apple", "grape", "apricot"]`:

   Matched: `["apple", "grape", "apricot"]`<br/>
   Marked: `["<a>pple", "gr<a>pe", "<a>pricot"]`<br/><br/>

1. __Custom matching & marking__ `algorithm={{matchFunc: yourMatchFunc, markFunc: yourMarkFunc}}`
   Optionally, you can provide your own combination of matching and marking functions. For example, loosening the matching to include unicode variants of characters could be useful, e.g. ç &rarr; c

   Follow the guide in the [props summary for algorithm](#available-props).

---

### Example Usage

```js
import {UITypeaheadInput} from 'enigma-uikit';

const list = [
    {text: 'orange'},
    {text: 'apple'},
    {text: 'banana'},
];

// ...

render() {
    return (
        <UITypeaheadInput
            name='my-typeahead'
            aria-label='An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to accept a text suggestion or the up and down arrows to cycle through the list when available.'
            defaultValue='or'
            entities={list}
            hint={true} />
    );
}
```

Renders:

```html
<div class="ui-typeahead-wrapper">
    <div role="region" id="{uuid}" aria-live="polite">orange</div>
    <input type="text" class="ui-typeahead-hint" role="presentation" tabindex='-1' disabled />
    <input name="my-typeahead" type="text" class="ui-typeahead" aria-label="An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to accept a text suggestion or the up and down arrows to cycle through the list when available." aria-controls="{uuid}" /> <!-- initializes to "or" -->
    <div class="ui-typeahead-match-wrapper" role="presentation">
        <div class="ui-typeahead-match" data-match="orange"><mark class="ui-typeahead-match-highlight">or</mark>ange</div>
    </div>
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-typeahead`
- `.ui-typeahead-wrapper`
- `.ui-typeahead-hint`
- `.ui-typeahead-match`
- `.ui-typeahead-match-wrapper`
- `.ui-typeahead-match-selected`
- `.ui-typeahead-match-highlight`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Down]` | select the next available typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Up]` | select the previous typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Right, Tab]` | fill the currently-selected typeahead text into the input field, dismiss matches
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists; if no typeahead match, call `onComplete` if supplied
__Keyboard__ | `[Escape]` | clear typeahead matches if they exist
__Mouse__ | `[Click]` on typeahead match | fill the selected typeahead match text into the input field, dismiss matches, return focus to input

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-wrapper` node

- all supported [UITextualInput props](../UITextualInput/README.md#available-props); applied to the `.ui-textual-input-wrapper` node

- __algorithm__ `UITypeaheadInput.mode.STARTS_WITH, UITypeaheadInput.mode.FUZZY, Object{Function, Function}`
  (default `UITypeaheadInput.mode.STARTS_WITH`) the mechanism used to identify and mark matching substrings; a custom set can be provided with the Object format:<br/><br/>

    - __algorithm.matchFunc__ `Function`
      provide a custom matching algorithm, adhering to this format:

      ```js
      myMatchFunc(inputText, entities) {
          // ...
          return [match1Index, match2Index, /* ... */];
      }
      ```

      the index is stored instead of the entire entity to conserve memory and reduce data duplication

    - __algorithm.markFunc__ `Function`
      provide a custom marking function, allows for the use of custom templating / developer-defined CSS hooks, adhering to this format:

      ```js
      myMarkFunc(inputText, entity) {
          return /* desired JSX templating */];
      }
      ```

- __defaultValue__ `String`
  passed through to the main input node, `.ui-typeahead` -- may alternatively be set in `props.inputProps` if desired

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

- __name__ `String`
  passed through to the main input node, `.ui-typeahead` -- may alternatively be set in `props.inputProps` if desired

- __onEntityHighlighted__ `Function`
  called with the index of the highlighted entity due to keyboard selection

- __onEntitySelected__ `Function`
  called with the index of the entity selected by the user

- __onComplete__ `Function`
  called when the user presses `Enter` with no autosuggest hint available, indicating that input is complete

- __type__ `String`
  passed through to the main input node, `.ui-typeahead` -- may alternatively be set in `props.inputProps` if desired
