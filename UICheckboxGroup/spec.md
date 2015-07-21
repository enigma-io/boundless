## Enigma Platform Team
### `UIKit/UICheckboxGroup`

A controller view for managing the aggregate state of multiple, related checkboxes.

#### Usage

The content to render is given to `UICheckboxGroup` via the `items` prop with a specific shape.

```json
{
    autofocus: "Boolean (optional)",
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
        <UICheckboxGroup items={boxes} showSelectAll={true} />
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


Styling of the element is provided via the class hooks:

- `.ui-checkbox-group`
- `.ui-checkbox-group-selectall`


#### Usage Scenarios

The most common case is a "select all" / children scenario. This particular configuration is built-in and is activated by passing the `showSelectAll` prop.


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` on "Select All" | should toggle the `checked` state for all children to fully on or fully off
**Keyboard** | `[Enter, Space]` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state
**Mouse** | `click` on "Select All" | should toggle the `checked` state for all children
**Mouse** | `click` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state


#### Customization (via `props`)

- **items** `Array<Object>`
  the data wished to be rendered, must conform to a specific shape

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **showSelectAll** `Boolean`
  renders a master checkbox that can manipulate the values of all children simultaneously

- **selectAllLabel** `String`
  the text or renderable node to display next to the checkbox, defaults to "Select All"

- **selectAllPosition** `Constant` (see [the implementation](index.jsx))
  the rendering position of the "select all" checkbox, defaults to "before"

- **onAllChecked** `Function`
  called when all children become checked (not fired on first render), no return

- **onAllUnchecked** `Function`
  called when all children become unchecked (not fired on first render), no return

- **onChildChecked** `String`
  called when a specific child has become checked, returns the child definition

- **onChildUnchecked** `String`
  called when a specific child has become checked, returns the child definition


<sub>A view must be functionally-accessible and whole by props alone.</sub>
