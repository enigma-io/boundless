### `UIKit/UICheckboxGroup`
#### A controller view for managing the aggregate state of multiple, related checkboxes.

Content to render is given to `UICheckboxGroup` via the `items` prop with a specific shape. Additional attributes can be added if desired, see the [UICheckbox spec](../UICheckbox/README.md) for more details.

The most common use case for `UICheckboxGroup` is a "select all" / children scenario. This particular configuration is built-in and is activated by passing the `selectAll` prop.

```js
{
    autoFocus: "Boolean (optional)",
    checked: "Boolean",
    label: "String (optional)",
    name: "String",
    value: "String (optional)"
}
```
```jsx
let boxes = [{
    label: 'ABC',
    value: 'DEF',
    name: 'GHI',
    checked: false
}, {
    label: 'JKL',
    value: 'MNO',
    name: 'PQR',
    checked: false
}, {
    label: 'STU',
    value: 'VWX',
    name: 'YZ',
    checked: false
}];

return (
    <UICheckboxGroup items={boxes} selectAll={true} />
);
```

Renders:

```html
<div class="ui-checkbox-group">
    <div class="ui-checkbox-wrapper">
        <input id='<randomhash>' class="ui-checkbox ui-checkbox-unchecked" type="checkbox" aria-checked="false" />
        <label class="ui-checkbox-label" for='<randomhash>'>Select All</label>
    </div>
    <div class="ui-checkbox-wrapper">
        <input id='<randomhash>' class="ui-checkbox ui-checkbox-unchecked" type="checkbox" aria-checked="false" value="DEF" name="GHI" />
        <label class="ui-checkbox-label" for='<randomhash>'>ABC</label>
    </div>
    <div class="ui-checkbox-wrapper">
        <input id='<randomhash>' class="ui-checkbox ui-checkbox-unchecked" type="checkbox" aria-checked="false" value="MNO" name="PQR" />
        <label class="ui-checkbox-label" for='<randomhash>'>JKL</label>
    </div>
    <div class="ui-checkbox-wrapper">
        <input id='<randomhash>' class="ui-checkbox ui-checkbox-unchecked" type="checkbox" aria-checked="false" value="VWX" name="YZ" />
        <label class="ui-checkbox-label" for='<randomhash>'>STU</label>
    </div>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-checkbox-group`
- `.ui-checkbox-group-selectall`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` on "Select All" | should toggle the `checked` state for all children to fully on or fully off
__Keyboard__ | `[Enter, Space]` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state
__Mouse__ | `click` on "Select All" | should toggle the `checked` state for all children
__Mouse__ | `click` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state

<br />
##### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-group` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-checkbox-group` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-checkbox-group` node

- __items__ `Array<Object>`
  the data wished to be rendered, each item must conform to the [UICheckbox prop spec](../UICheckbox/README.md)

- __onAllChecked__ `Function`
  called when all children become checked (not fired on first render), no return

- __onAllUnchecked__ `Function`
  called when all children become unchecked (not fired on first render), no return

- __onChildChecked__ `String`
  called when a specific child has become checked, returns the child definition

- __onChildUnchecked__ `String`
  called when a specific child has become checked, returns the child definition

- __selectAll__ `Boolean`
  renders a master checkbox that can manipulate the values of all children simultaneously

- __selectAllProps__ `Object`
    - __selectAllProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-group-selectall` node

- __selectAllLabel__ `String`
  the text or renderable node to display next to the checkbox, defaults to "Select All"

- __selectAllPosition__ `Constant` (see [the implementation](index.js))
  the rendering position of the "select all" checkbox, defaults to "before"

- __style__ `Object`
  inline styles to be applied to the `.ui-checkbox-group` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference
