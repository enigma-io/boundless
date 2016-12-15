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

---

### Props

- any/all supported [Dialog props](boundless-dialog/README.md)

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-popover` node

- __anchor__ `[ReactElement, HTMLElement]`
  a DOM element or React reference to one for positioning purposes

- __anchorXAlign__ `Constant`
  (default `Popover.position.START`) location on the anchor X-axis to use for alignment calculations
    - __anchorXAlign__ `Popover.position.START`
      equates to `{0, ?}` on a 100x100 cartesian plane

    - __anchorXAlign__ `Popover.position.MIDDLE`
      equates to `{50, ?}` on a 100x100 cartesian plane

    - __anchorXAlign__ `Popover.position.END`
      equates to `{100, ?}` on a 100x100 cartesian plane

- __anchorYAlign__ `Constant`
  (default `Popover.position.END`) location on the anchor Y-axis to use for alignment calculations
    - __anchorYAlign__ `Popover.position.START`
      equates to `{?, 0}` on a 100x100 cartesian plane

    - __anchorYAlign__ `Popover.position.MIDDLE`
      equates to `{?, 50}` on a 100x100 cartesian plane

    - __anchorYAlign__ `Popover.position.END`
      equates to `{?, 100}` on a 100x100 cartesian plane

- __autoReposition__ `Boolean`
  (default `true`) if the given alignment settings would take the popover out of bounds, change the alignment as necessary to remain in the viewport

- __caretComponent__ `ReactElement`
  (default svg) the JSX that is rendered and used to point at the middle of the anchor element and indicate the context of the popover

- __captureFocus__ `Boolean`
  (default `false`) see [Dialog.props.captureFocus](boundless-dialog/README.md)

- __closeOnEscKey__ `Boolean`
  (default `true`) see [Dialog.props.closeOnEscKey](boundless-dialog/README.md)

- __closeOnOutsideClick__ `Boolean`
  (default `true`) see [Dialog.props.closeOnOutsideClick](boundless-dialog/README.md)

- __closeOnOutsideScroll__ `Boolean`
  (default `true`) see [Dialog.props.closeOnOutsideScroll](boundless-dialog/README.md)

- __portalProps__ `object`
  (default `{}`) any/all supported [Portal props](boundless-portal/README.md)

- __preset__ `Popover.preset.ABOVE|Popover.preset.BELOW|Popover.preset.LEFT|Popover.preset.RIGHT`
  (default `Popover.preset.BELOW`) a baseline set of alignment properties that cover most use cases; override a particular subproperty by passing it as well, e.g.

  ```jsx
  <Popover
      anchor={HTMLElement}
      preset={Popover.preset.BELOW}
      selfXAlign={Popover.position.START}>
      My popover content!
  </Popover>
  ```

- __selfXAlign__ `Constant`
  (default `Popover.position.START`) location on the popover X-axis to use for alignment calculations
    - __selfXAlign__ `Popover.position.START`
      equates to `{0, ?}` on a 100x100 cartesian plane

    - __selfXAlign__ `Popover.position.MIDDLE`
      equates to `{50, ?}` on a 100x100 cartesian plane

    - __selfXAlign__ `Popover.position.END`
      equates to `{100, ?}` on a 100x100 cartesian plane

- __selfYAlign__ `Constant`
  default (`Popover.position.END`) location on the popover Y-axis to use for alignment calculations
    - __selfYAlign__ `Popover.position.START`
      equates to `{?, 0}` on a 100x100 cartesian plane

    - __selfYAlign__ `Popover.position.MIDDLE`
      equates to `{?, 50}` on a 100x100 cartesian plane

    - __selfYAlign__ `Popover.position.END`
      equates to `{?, 100}` on a 100x100 cartesian plane
