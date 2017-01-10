# SegmentedControl
__A control containing multiple buttons, only one of which can be active at a time.__

SegmentedControl is implemented as a "controlled component", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onOptionSelected` that a controller view must intercept and apply against the data provider.

> The Boundless Team recommends reviewing the [Segmented Control](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsSelection.html#//apple_ref/doc/uid/20000957-CH49-SW5) of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `SegmentedControl` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` (not selected) | should trigger `onOptionSelected` on clicked option
__Keyboard__ |`[Tab]` | should forward-exit `SegmentedControl` tabbing context
__Keyboard__ |`[Shift+Tab]` | should backward-exit `SegmentedControl` tabbing context
__Keyboard__ |`['Left', 'Right']` | should move focus to previous/next child; should loop
__Keyboard__ | `['Enter']` | should trigger `onOptionSelected` for focused option
