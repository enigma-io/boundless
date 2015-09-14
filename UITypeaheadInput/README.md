### `UIKit/UITypeaheadInput`
#### Intelligently recommend entities via customizable, fuzzy recognition.

```jsx
let list = [{
    content: 'orange'
}, {
    content: 'apple'
}, {
    content: 'banana'
}];

return (
    <UITypeaheadInput name='my-typeahead'
                 aria-label="An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to accept a text suggestion or the up and down arrows to cycle through the list when available."
                 defaultValue='or'
                 entities={list}
                 provideHint={true} />
);
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

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Down]` | select the next available typeahead match, retain focus on input field, should not move cursor
**Keyboard** | `[Up]` | select the previous typeahead match, retain focus on input field, should not move cursor
**Keyboard** | `[Right, Tab]` | fill the currently-selected typeahead text into the input field, dismiss matches
**Keyboard** | `[Enter]` | select the current typeahead match if one exists; if no typeahead match, call `onComplete` if supplied
**Keyboard** | `[Escape]` | clear typeahead matches if they exist
**Mouse** | `[Click]` on typeahead match | fill the selected typeahead match text into the input field, dismiss matches, return focus to input

<br />
##### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead` node

- **className** `[String|Array<String>]`
  additional CSS class(es) to be added to the rendered `.ui-typeahead` element

- **offscreenClass** `String`
  the "offscreen" class used by your application; specifically to retain [ARIA navigability](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) as `display: none` excludes the element from consideration

- **entities** `Array<Object>`
  a list of objects containing the property `content`; any additional [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) will be applied to the appropriate `.ui-typeahead-match` node

- **hint** `Boolean`
  renders a disabled textfield with the full text of the currently selected input hint; will remain blank if the matched substring is not at the beginning of the user input

- **hintAttributes** `Object`
    - **hintAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-hint` node

- **matchFunc** `Function`
  provide a custom matching algorithm, adhering to this format:

  ```js
  myMatchFunc(currentText, suppliedEntities) {
      // ...
      return [match1Index, match2Index, /* ... */];
  }
  ```

  the index is stored instead of the entire entity to conserve memory and reduce data duplication

- **markFunc** `Function`
  provide a custom marking function, allows for the use of custom templating / developer-defined CSS hooks

  ```js
  myMarkFunc(entityString, userInputString) {
      return /* desired JSX templating */];
  }
  ```

  could be used in conjunction with a custom `matchFunc` to normalize certain unicode characters for easier typing ç -> c

- **matchWrapperAttributes** `Object`
    - **matchWrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-match-wrapper` node

- **wrapperAttributes** `Object`
    - **wrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-wrapper` node
