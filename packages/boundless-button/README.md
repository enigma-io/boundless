# Button
__A control with "pressed" state support.__

> The UIKit Team recommends reviewing the [Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW2) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Button` in your project.

Button can be used like a normal HTML `<button>`, or when provided `props.pressed`, can become stateful. Think of a stateful button as more of a "toggle", like turning on bold-mode in a rich text editor.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (unpressed) | trigger the `onPressed` handler
__Keyboard__ | `[Enter, Space]` (pressed) | trigger the `onUnpressed` handler
__Mouse__ | `click` (unpressed) | trigger the `onPressed` handler
__Mouse__ | `click` (pressed) | trigger the `onUnpressed` handler
