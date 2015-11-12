### `UIKit/UICheckbox`
#### An accessible checkbox with indeterminate support.

UICheckbox is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onChecked` and `onUnchecked` that a controller view must intercept and apply against the data provider.

```jsx
return (
    <UICheckbox checked={true}
                label='Save'
                labelAttrs={{'data-i18n': 'en-US'}}
                name='autosave'
                wrapperAttrs={{className: 'control-autosave'}} />
);
```
Renders:
```html
<div class="ui-checkbox-wrapper control-autosave">
    <input id="1f2cd27f-0754-4344-9d20-436a201b2f80" name="autosave" type="checkbox" aria-checked="true" class="ui-checkbox ui-checkbox-checked" checked />
    <label for="1f2cd27f-0754-4344-9d20-436a201b2f80" data-i18n="en-US">Save</label>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-checkbox`
- `.ui-checkbox-checked`
- `.ui-checkbox-label`
- `.ui-checkbox-mixed`
- `.ui-checkbox-wrapper`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` | should toggle the `checked` state
__Mouse__ | `click` | should toggle the `checked` state

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-wrapper` node

- __checked__ `Boolean`
  determines if the checkbox is rendered as checked/unchecked, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-checkbox-wrapper` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-checkbox-wrapper` node

- __indeterminate__ `Boolean`
  enables or disables "mixed" checkbox state, read this [CSS-Tricks article](https://css-tricks.com/indeterminate-checkboxes/)  for more information and examples

- __inputAttrs__ `Object`
    - __inputAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox` node

- __label__ `Node`
  any React-renderable content, most commonly a simple string

- __labelAttrs__ `Object`
    - __labelAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-label` node

- __name__ `String`
  rendered as the input control's form name

- __onChecked__ `Function`
  called when the element becomes checked; backing data must be updated to persist the state change

- __onUnchecked__ `Function`
  called when the element becomes unchecked; backing data must be updated to persist the state change

- __style__ `Object`
  inline styles to be applied to the `.ui-checkbox-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference

- __value__ `String`
  passed-through to the input node, like `name`
