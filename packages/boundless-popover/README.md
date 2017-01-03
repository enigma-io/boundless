# Popover
__A non-blocking container positioned to a specific anchor element.__

A popover is a type of [dialog](boundless-dialog/README.md) that is meant to provide additional context to content (an "anchor") currently on-screen. Typically, a popover is spawned by interacting with the content it enriches and is dismissed by clicking or shifting focus to an alternate location.

> The UIKit Team recommends reviewing the [Popover](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsView.html#//apple_ref/doc/uid/20000957-CH52-SW2) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Popover` in your project.

Use a positioning preset to align the popover, e.g.

```jsx
<Popover
    anchor={HTMLElement}
    preset={Popover.preset.BELOW}>
    My popover content!
</Popover>
```

For more advanced positioning, combine the {element}{Axis}Align properties to create complete alignment points*. e.g.

```jsx
<Popover
    anchor={HTMLElement}
    anchorXAlign={Popover.position.MIDDLE}
    anchorYAlign={Popover.position.END}>
    My popover content!
</Popover>
```

_*NOTE: Demo reference styles are only provided for the preset use cases._

---

### Interactions

Refer to [Dialog](boundless-dialog/README.md)
