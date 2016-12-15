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

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-disclosure` node

- __component__ `string|function`
  any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`

- __expanded__ `Boolean`
  allows the disclosure to be rendered expanded by default

- __onExpand__ `Boolean`
  called when the content is shown; not called on initial render

- __onHide__ `Function`
  called when the content is hidden; not called on initial render

- __teaser__ `Node`
  content to be shown next to the expansion toggle, e.g. "Advanced Options"

- __teaserExpanded__ `Node`
  content to be shown next to the expansion toggle when the disclosure is in "expanded" state, e.g. "Hide Advanced Options"

- __toggleProps__ `Object`
  __toggleProps.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-disclosure-toggle` node
