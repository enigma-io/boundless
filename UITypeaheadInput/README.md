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
__Keyboard__ | `[Down]` | select the next available typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Up]` | select the previous typeahead match, retain focus on input field, should not move cursor
__Keyboard__ | `[Right, Tab]` | fill the currently-selected typeahead text into the input field, dismiss matches
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists; if no typeahead match, call `onComplete` if supplied
__Keyboard__ | `[Escape]` | clear typeahead matches if they exist
__Mouse__ | `[Click]` on typeahead match | fill the selected typeahead match text into the input field, dismiss matches, return focus to input

<br />
##### Available `props`

- __attrs__ `Object`
  - __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-typeahead` element

- __offscreenClass__ `String`
  the "offscreen" class used by your application; specifically to retain [ARIA navigability](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) as `display: none` excludes the element from consideration

- __entities__ `Array<Object>`
  a list of objects containing the property `content`; any additional [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) will be applied to the appropriate `.ui-typeahead-match` node

- __hint__ `Boolean`
  renders a disabled textfield with the full text of the currently selected input hint; will remain blank if the matched substring is not at the beginning of the user input

- __hintAttrs__ `Object`
    - __hintAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-hint` node

- __matchFunc__ `Function`
  provide a custom matching algorithm, adhering to this format:

  ```js
  myMatchFunc(currentText, suppliedEntities) {
      // ...
      return [match1Index, match2Index, /* ... */];
  }
  ```

  the index is stored instead of the entire entity to conserve memory and reduce data duplication

- __markFunc__ `Function`
  provide a custom marking function, allows for the use of custom templating / developer-defined CSS hooks

  ```js
  myMarkFunc(entityString, userInputString) {
      return /* desired JSX templating */];
  }
  ```

  could be used in conjunction with a custom `matchFunc` to normalize certain unicode characters for easier typing ç -> c

- __matchWrapperAttrs__ `Object`
    - __matchWrapperAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-match-wrapper` node

- __name__ `String`
  passed through to the main `<input>` element

- __onEntitySelected__ `Function`
  called with the index of the entity selected by the user

- __onComplete__ `Function`
  called when the user presses `Enter` with no autosuggest hint available, indicating that input is complete

- __type__ `String`
  passed through to the main `<input>` element

- __wrapperAttrs__ `Object`
    - __wrapperAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-typeahead-wrapper` node
