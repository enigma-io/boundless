### `UIKit/UITokenizedInput`
#### Distill rich entity data matched via typeahead input into simple visual abstractions.

Usage of this tool is identical to that of [`UITypeaheadInput`](../UITypeaheadInput).

```jsx
let list = [{
    content: 'orange'
}, {
    content: 'apple'
}, {
    content: 'banana'
}];

return (
    <UITokenizedInput name='my-typeahead'
                      attrs={{'aria-label': "An example of a typeahead component. Suggestions will be called out as matches are found. Press the right arrow to  accept a text suggestion or the up and down arrows to cycle through the list when available."}}
                      defaultValue='ap'
                      entities={list}
                      provideHint={true}
                      tokens={[list[0]]} />
);
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

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter]` | select the current typeahead match if one exists, trigger `onTokenChange` with token data
__Keyboard__ | `[Backspace]` on token | trigger `onTokenChange` with token data
__Keyboard__ | `[Left]` | cycle left through tokens if a token is already selected or cursor is at the start of the typeahead
__Keyboard__ | `[Right]` | cycle right through tokens if there are more than one tokens and the rightmost one is not selected
__Mouse__ | `[Click]` on token | focus token, add "selected" class
__Mouse__ | `[Click]` on token close | trigger `onTokenChange` with token data

<br />
##### Available `props`
> See the props accepted by [`UITypeaheadInput`](../UITypeaheadInput)

- __attrs__ `Object`
    - __attrs.*__
    any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tokenfield-wrapper` node

- __className__ `string`
  applied to the `.ui-tokenfield-wrapper` node

- __defaultValue__ `String`
  passed through to the main input node, `.ui-tokenfield` -- may alternatively be set in `props.inputAttrs` if desired

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-tokenfield-wrapper` node

- __inputAttrs__ `Object`
    - __inputAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tokenfield` node

- __onTokenChange__ `Function`
  triggered when an action has been taken to add or remove a token to the UI

- __showTokenClose__ `Boolean`
  (default `true`) determines if the `.ui-tokenfield-token-close` element should be rendered for each token

- __style__ `Object`
  inline styles to be applied to the `.ui-tokenfield-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference

- __tokens__ `Array<Object>`
  object references to the entities that have been added as tokens
