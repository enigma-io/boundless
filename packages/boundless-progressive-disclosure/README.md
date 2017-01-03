# ProgressiveDisclosure
__Hide content until it's needed, with configurable teasers.__

> The UIKit Team recommends reviewing the [Disclosure](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW12) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `ProgressiveDisclosure` in your project.

Mechanically, hidden disclosure content is not rendered to the DOM until it is needed.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`
__Keyboard__ | `[Enter]` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`
