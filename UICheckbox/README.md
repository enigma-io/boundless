# UICheckbox

__An accessible checkbox with indeterminate support.__

UICheckbox is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onChecked` and `onUnchecked` that a controller view must intercept and apply against the data provider.

> The UIKit Team recommends reviewing the [Checkbox](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW9) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UICheckbox` in your project.

---

### Example Usage

```jsx
import {UICheckbox} from 'enigma-uikit';

// ...

render() {
    return (
        <UICheckbox
            name='autosave'
            checked={true}
            label='Save'
            labelProps={{'data-i18n': 'en-US'}}
            wrapperProps={{className: 'control-autosave'}} />
    );
}
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

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` | should toggle the `checked` state
__Mouse__ | `click` | should toggle the `checked` state, focus the checkbox

Events will not be proxied if the input is in "disabled" state, via the HTML5 `disabled` attribute.

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-wrapper` node

- __inputProps__ `Object`
    all input-specific props like `value`, `name`, etc should be passed here -- common ones are listed below

    - __inputProps.checked__ `Boolean`
      (default `false`) determines if the checkbox is rendered as checked/unchecked, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))

    - __inputProps.disabled__ `Boolean`
      (default `false`) prevents the `on{Checked,Unchecked}` events from firing when `true`

    - __inputProps.indeterminate__ `Boolean`
      enables or disables "mixed" checkbox state, read this [CSS-Tricks article](https://css-tricks.com/indeterminate-checkboxes/)  for more information and examples

    - __inputProps.name__ `String`
      rendered as the input control's form name

    - __inputProps.value__ `String`
      passed-through to the input node, like `name`

    - __inputProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox` node

- __label__ `Node`
  any React-renderable content, most commonly a simple string

- __labelProps__ `Object`
    - __labelProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-checkbox-label` node

- __onChecked__ `Function`
  called when the element becomes checked; backing data must be updated to persist the state change

- __onUnchecked__ `Function`
  called when the element becomes unchecked; backing data must be updated to persist the state change
