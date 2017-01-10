# Radio
__An accessible radio form control.__

Radio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.

> The Boundless Team recommends reviewing the [Radio Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW10) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Radio` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (not selected) | should trigger `onSelected`
__Mouse__ | `click` (not selected) | should trigger `onSelected`
