# Radio
__An accessible radio form control.__

Radio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.

> The UIKit Team recommends reviewing the [Radio Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW10) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Radio` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (not selected) | should trigger `onSelected`
__Mouse__ | `click` (not selected) | should trigger `onSelected`

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-wrapper` node

- __inputProps__ `Object`
    - __inputProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio` node

- __label__ `Node`
  any React-renderable content, most commonly a simple string

- __labelProps__ `Object`
    - __labelProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-label` node

- __name__ `String`
  passthrough to the HTML `name` attribute on the `.ui-radio` node

- __onSelected__ `Function`
  called when the element becomes selected; backing data must be updated to persist the state change

- __selected__ `Boolean`
  determines the activation state of the radio control, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))

- __value__ `String`
  passthrough to the HTML `value` attribute on the `.ui-radio` node
