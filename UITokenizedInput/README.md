# UITokenizedInput
__Distill rich entity data matched via typeahead input into simple visual abstractions.__

Usage of this component is identical to that of [UITypeaheadInput](../UITypeaheadInput).

> The Platform team recommends reviewing the [Token Field](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsText.html#//apple_ref/doc/uid/20000957-CH51-SW4) of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UITokenizedInput` in your project.

---

### Example Usage

```js
import {UITokenizedInput} from 'enigma-uikit';

const list = [
    {text: 'orange'},
    {text: 'apple'},
    {text: 'banana'},
];

// ...

render() {
    return (
        <UITokenizedInput name='my-typeahead'
                          aria-label='An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to  accept a text suggestion or the up and down arrows to cycle through the list when available.'
                          defaultValue='ap'
                          entities={list}
                          hint={true}
                          defaultTokenizedEntityIndexes={[0]} />
    );
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
        <input name="my-typeahead" type="text" class="ui-tokenfield ui-typeahead" aria-label="An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to accept a text suggestion or the up and down arrows to cycle through the list when available." aria-controls="{uuid}" /> <!-- initializes to "or" -->
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

In addition, the hooks available in [`UITypeaheadInput`](../UITypeaheadInput) will be present.

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists, trigger `onTokenChange` with token data
__Keyboard__ | `[Backspace]` on token | trigger `onTokenChange` with token data
__Keyboard__ | `[Left]` | cycle left through tokens if a token is already selected or cursor is at the start of the typeahead
__Keyboard__ | `[Right]` | cycle right through tokens if there are more than one tokens and the rightmost one is not selected
__Mouse__ | `[Click]` on token | focus token, add "selected" class
__Mouse__ | `[Click]` on token close | trigger `onTokenChange` with token data

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tokenfield-wrapper` node

- all props accepted by [`UITypeaheadInput`](../UITypeaheadInput)

- __defaultTokenizedEntityIndexes__ `Array[Number]`
  indexes of items in the `entities` list to be pre-existing tokens (the user can then add to or remove them)

- __onTokenChange__ `Function`
  triggered when an action has been taken to add or remove a token to the UI, returns an array of entity indexes

- __showTokenClose__ `Boolean`
  (default `true`) determines if the `.ui-tokenfield-token-close` element should be rendered for each token

---

### Available Methods

- `addToken(index, focusInput, clearInput)` (index=Number|Array<Number>, focusInput=Boolean, clearInput=Boolean)
  accepts an entity index or array of entity indexes to create new tokens, with optional additional side effects via
  the `focusInput` and `clearInput` boolean arguments; does trigger `onTokenChange`

- `removeToken(index, focusInput, clearInput)` (index=Number|Array<Number>, focusInput=Boolean, clearInput=Boolean)
  accepts an entity index or array of entity indexes to remove tokens, with optional additional side effects via
  the `focusInput` and `clearInput` boolean arguments; does trigger `onTokenChange`
