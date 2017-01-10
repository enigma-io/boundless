# CheckboxGroup
__A controller view for managing the aggregate state of multiple, related checkboxes.__

The most common use case for `CheckboxGroup` is a "select all" / children scenario. This particular configuration is built-in and is activated by passing the `selectAll` prop.

> The Boundless Team recommends reviewing the [Checkbox](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW9) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Checkbox` in your project.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` on "Select All" | should toggle the `checked` state for all children to fully on or fully off
__Keyboard__ | `[Enter, Space]` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state
__Mouse__ | `click` on "Select All" | should toggle the `checked` state for all children
__Mouse__ | `click` on child | should trigger indeterminate state on "select all" checkbox if all children are not the same state
