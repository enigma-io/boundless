# Input
__An input control with placeholder emulation for non-supporting platforms.__

---

Input abstracts away the cross-platform differences of placeholder styling and behaviors, for example: Internet Explorer dismisses native placeholders on input focus and other platforms do not. This component ensures that text input controls will feel and behave similarly on more devices.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | text entry on the input | should clear out the placeholder text
__Focus__ | on the input | should clear out the placeholder text in expectation of typing (if `props.hidePlaceholderOnFocus` is `true`)
__Blur__ | on the input | should restore the placeholder text if the input is empty at the time of focus moving away (if `props.hidePlaceholderOnFocus` is `true`)

---

### Component Instance Methods

When using `Input` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __getValue()__
  returns the current value of the input field

- __setValue(string)__
  programmatically set the input value; useful for clearing out the input in "uncontrolled" mode -- note that digging into the internals and setting the `refs.field.value = ''` directly will not trigger events and messes up the internal state of the component

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-input-wrapper` node

- __hidePlaceholderOnFocus__ `Boolean`
  (default: true) triggers the placeholder to disappear when the input field is focused, reappears when the user has tabbed away or focus is moved

- __inputProps__ `Object`
  props to be passed through to the input node, `.b-input`; this includes the standard set of React input props like `defaultValue`, `value`, `name`, `placeholder`, `autoFocus`, etc.

  - __inputProps.type__ `String`
    (default: "text")
