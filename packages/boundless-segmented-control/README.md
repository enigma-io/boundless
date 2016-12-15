# SegmentedControl
__A control containing multiple buttons, only one of which can be active at a time.__

SegmentedControl is implemented as a "controlled component", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onOptionSelected` that a controller view must intercept and apply against the data provider.

> The UIKit Team recommends reviewing the [Segmented Control](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsSelection.html#//apple_ref/doc/uid/20000957-CH49-SW5) of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `SegmentedControl` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` (not selected) | should trigger `onOptionSelected` on clicked option
__Keyboard__ |`[Tab]` | should forward-exit `SegmentedControl` tabbing context
__Keyboard__ |`[Shift+Tab]` | should backward-exit `SegmentedControl` tabbing context
__Keyboard__ |`['Left', 'Right']` | should move focus to previous/next child; should loop
__Keyboard__ | `['Enter']` | should trigger `onOptionSelected` for focused option

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.b-segmented-control` node

- __onOptionSelected__ `Function`
  called when a child element becomes selected; backing data must be updated to persist the state change

- __options__ `Array<Object>`
  the backing data for the segments of the rendered control

  > __Validation Criteria:__
  >
  > 1. There must be at least two `options` (a segmented control with one button is not allowed)
  > 1. There must only be one `option` whose `selected` attribute is `true` (multiple selections are not allowed)
  > 1. Each `value` attribute must be unique across the set of `options`

  - __options[].selected__ `Boolean`
  - __options[].value__ `String`
  - __options[].content__ `*`
    the content to go inside the button
