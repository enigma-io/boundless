# Checkbox

__An accessible checkbox with indeterminate support.__

Checkbox is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onChecked` and `onUnchecked` that a controller view must intercept and apply against the data provider.

> The UIKit Team recommends reviewing the [Checkbox](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW9) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Checkbox` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` | should toggle the `checked` state
__Mouse__ | `click` | should toggle the `checked` state, focus the checkbox

Events will not be proxied if the input is in "disabled" state, via the HTML5 `disabled` attribute.
