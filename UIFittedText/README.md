# UIFittedText
__Fit given text inside a parent container, obeying implict and explicit constraints.__

The most common use case for this class is fitting single-line text of unknown/variable length into a button or heading with finite boundaries.

> The UIKit Team recommends reviewing the [Terminology and Wording](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/TerminologyWording.html#//apple_ref/doc/uid/20000957-CH15-SW1) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIFittedText` in your project.

---

### Interactions

There are no expected user interactions. The component emits normal text and merely changes the presentation; accessibility is not obstructed.

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-text` node

- __component__ `string|function`
  any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`

- __maxFontSize__ `Number`
  an upper-boundary for how large the UI text is allowed to grow
