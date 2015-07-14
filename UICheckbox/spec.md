## Enigma Platform Team
### `UIKit/UICheckbox`

A generic, accessible checkbox that supports indeterminate state.

#### Usage

UICheckbox is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onChecked` and `onUnchecked` that a controller view must intercept and apply against the data provider.

```jsx
return (
    <UICheckbox label='Save' checked={true} />
);
```
Renders:
```html
<div>
    <input id='XYZ' type="checkbox" aria-checked="true" class="ui-checkbox ui-checkbox-checked" checked />
    <label for='XYZ'>Save</label>
</div>
```

Styling of the element is provided via the class hooks:

- `.ui-checkbox`
- `.ui-checkbox-unchecked`
- `.ui-checkbox-checked`
- `.ui-checkbox-mixed`
- `.ui-checkbox-label`
- `.ui-checkbox-wrapper`


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` | should toggle the `checked` state
**Mouse** | `click` | should toggle the `checked` state


#### Optional Customization (via `props`)

Any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element, e.g.

- name
- disabled
- type
- ...

These core functionality `props` are handled separately and typechecked:

- **checked** `Boolean`
  the default checked state of the checkbox (implemented as a ["controlled input"](https://facebook.github.io/react/docs/forms.html#controlled-components))

- **label** `Node`
  any React-renderable content, most commonly a simple string

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **autofocus** `Boolean`
  programmatically focuses the element on first render (does not require HTML5 support)

- **onChecked** `Function`
  called when the element's value becomes truthy

- **onUnchecked** `Function`
  called when the element's value becomes falsy


<sub>A view must be functionally-accessible and whole by props alone.</sub>
