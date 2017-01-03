# Progress
__An unopinionated progress implementation, allowing for a variety of shapes and effects.__

> The UIKit Team recommends reviewing the [Progress Indicator](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsIndicators.html#//apple_ref/doc/uid/20000957-CH50-SW2) and [User Feedback](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/Feedback.html#//apple_ref/doc/uid/20000957-CH9-SW1) sections of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Progress` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | no `progress` passed | should have the indeterminate class
__Keyboard__ | `[Enter, Space]` on cancel element | should trigger the onCancel handler
__Mouse__ | `click` on cancel element | should trigger the onCancel handler
