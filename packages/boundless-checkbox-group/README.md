# CheckboxGroup
__A controller view for managing the aggregate state of multiple, related checkboxes.__

Content to render is given to `CheckboxGroup` via the `items` prop with a specific shape. Additional attributes can be added if desired, see the [Checkbox spec](../Checkbox/README.md) for more details.

The most common use case for `CheckboxGroup` is a "select all" / children scenario. This particular configuration is built-in and is activated by passing the `selectAll` prop.

> The UIKit Team recommends reviewing the [Checkbox](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW9) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Checkbox` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` on "Select All" | should toggle the `checked` state for all children to fully on or fully off
__Keyboard__ | `[Enter, Space]` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state
__Mouse__ | `click` on "Select All" | should toggle the `checked` state for all children
__Mouse__ | `click` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-checkbox-group` node

- __items__ `Array<Object>`
  the data wished to be rendered, each item must conform to the [Checkbox prop spec](../Checkbox/README.md)

- __onAllChecked__ `Function`
  called when all children become checked (not fired on first render), no return

- __onAllUnchecked__ `Function`
  called when all children become unchecked (not fired on first render), no return

- __onChildChecked__ `String`
  called when a specific child has become checked, returns the child definition

- __onChildUnchecked__ `String`
  called when a specific child has become checked, returns the child definition

- __selectAll__ `Boolean`
  (default `false`) renders a master checkbox that can manipulate the values of all children simultaneously

- __selectAllProps__ `Object`
  must conform to the [Checkbox prop spec](../Checkbox/README.md)

    - __selectAllProps.label__ `String`
      (default "Select All") the text or renderable node to display next to the checkbox

    - __selectAllProps.inputProps__ `Object`

- __selectAllPosition__ `Constant` (see [the implementation](index.js))
  the rendering position of the "select all" checkbox, defaults to "before"
