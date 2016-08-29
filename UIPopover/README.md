# UIPopover
__A non-blocking container positioned to a specific anchor element.__

A popover is a type of [dialog](../UIDialog/README.md) that is meant to provide additional context to content (an "anchor") currently on-screen. Typically, a popover is spawned by interacting with the content it enriches and is dismissed by clicking or shifting focus to an alternate location.

> The UIKit Team recommends reviewing the [Popover](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsView.html#//apple_ref/doc/uid/20000957-CH52-SW2) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIPopover` in your project.

---

### Example Usage

```jsx
import {
    UIArrowKeyNavigation,
    UIPopover,
} from 'enigma-uikit';

const definitions = [
    'of or relating to a spiritual or nonphysical realm.',
    '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.',
];

// ...

render() {
    return (
        <UIPopover anchor={this.refs.content}>
            <strong>tran·scen·den·tal</strong>
            <em>adjective</em>
            <UIArrowKeyNavigation component='ul'>
                 {definitions.map((definition, index) => <li key={index}>{definition}</li>)}
             </UIArrowKeyNavigation>
        </UIPopover>
    );
}
```

Renders:

```html
<div class="ui-popover">
    <div class="ui-popover-caret"><svg>...</svg></div>
    <div class="ui-dialog" role="dialog" aria-labelledby="{uniqueId}" aria-describedby="{uniqueId}" tabindex="0" style="top: {anchorYPos}px; left: {anchorXPos}px;">
        <header id="{uniqueId}" class="ui-dialog-header"></header>
        <div id="{uniqueId}" class="ui-dialog-body">
            <strong>tran·scen·den·tal</strong>,
            <em>adjective</em>
            <ol>
                <li tabindex="0">of or relating to a spiritual or nonphysical realm.</li>
                <li tabindex="0">(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.</li>
            </ol>
        </div>
        <footer class="ui-dialog-footer"></footer>
    </div>
</div>
```

Use a positioning preset to align the popover, e.g.

```jsx
<UIPopover
    anchor={HTMLElement}
    preset={UIPopover.preset.BELOW}>
    My popover content!
</UIPopover>
```

For more advanced positioning, combine the {element}{Axis}Align properties to create complete alignment points*. e.g.

```jsx
<UIPopover
    anchor={HTMLElement}
    anchorXAlign={UIPopover.position.MIDDLE}
    anchorYAlign={UIPopover.position.END}>
    My popover content!
</UIPopover>
```

_*NOTE: reference styles are only provided for the preset use cases._

Styling of the element will be provided via the CSS hooks:

- `.ui-popover`
- `.ui-popover-caret`
- `.ui-popover-caret-border` (not available if `props.caretComponent` is overridden)
- `.ui-popover-caret-fill`   (not available if `props.caretComponent` is overridden)

Below are helper classes for each position combination; helpful for aligning UI carets if desired.

- `.ui-popover-anchor-x-start`
- `.ui-popover-anchor-x-middle`
- `.ui-popover-anchor-x-end`
- `.ui-popover-anchor-y-start`
- `.ui-popover-anchor-y-middle`
- `.ui-popover-anchor-y-end`
- `.ui-popover-self-x-start`
- `.ui-popover-self-x-middle`
- `.ui-popover-self-x-end`
- `.ui-popover-self-y-start`
- `.ui-popover-self-y-middle`
- `.ui-popover-self-y-end`

---

### Expected Interactions

Refer to [UIDialog](../UIDialog/README.md)

---

### Available `props`

- all supported [UIDialog props](../UIDialog/README.md)

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-popover` node

- __anchor__ `[ReactElement, HTMLElement]`
  a DOM element or React reference to one for positioning purposes

- __anchorXAlign__ `Constant`
  (default `UIPopover.position.START`) location on the anchor X-axis to use for alignment calculations
    - __anchorXAlign__ `UIPopover.position.START`
      equates to `{0, ?}` on a 100x100 cartesian plane

    - __anchorXAlign__ `UIPopover.position.MIDDLE`
      equates to `{50, ?}` on a 100x100 cartesian plane

    - __anchorXAlign__ `UIPopover.position.END`
      equates to `{100, ?}` on a 100x100 cartesian plane

- __anchorYAlign__ `Constant`
  (default `UIPopover.position.END`) location on the anchor Y-axis to use for alignment calculations
    - __anchorYAlign__ `UIPopover.position.START`
      equates to `{?, 0}` on a 100x100 cartesian plane

    - __anchorYAlign__ `UIPopover.position.MIDDLE`
      equates to `{?, 50}` on a 100x100 cartesian plane

    - __anchorYAlign__ `UIPopover.position.END`
      equates to `{?, 100}` on a 100x100 cartesian plane

- __autoReposition__ `Boolean`
  (default `true`) if the given alignment settings would take the popover out of bounds, change the alignment as necessary to remain in the viewport

- __caretComponent__ `ReactElement`
  (default svg) the JSX that is rendered and used to point at the middle of the anchor element and indicate the context of the popover

- __captureFocus__ `Boolean`
  (default `false`) see [UIDialog.props.captureFocus](../UIDialog/README.md)

- __closeOnEscKey__ `Boolean`
  (default `true`) see [UIDialog.props.closeOnEscKey](../UIDialog/README.md)

- __closeOnOutsideClick__ `Boolean`
  (default `true`) see [UIDialog.props.closeOnOutsideClick](../UIDialog/README.md)

- __closeOnOutsideScroll__ `Boolean`
  (default `true`) see [UIDialog.props.closeOnOutsideScroll](../UIDialog/README.md)

- __preset__ `UIPopover.preset.ABOVE|UIPopover.preset.BELOW|UIPopover.preset.LEFT|UIPopover.preset.RIGHT`
  (default `UIPopover.preset.BELOW`) a baseline set of alignment properties that cover most use cases; override a particular subproperty by passing it as well, e.g.

  ```jsx
  <UIPopover
      anchor={HTMLElement}
      preset={UIPopover.preset.BELOW}
      selfXAlign={UIPopover.position.START}>
      My popover content!
  </UIPopover>
  ```

- __selfXAlign__ `Constant`
  (default `UIPopover.position.START`) location on the popover X-axis to use for alignment calculations
    - __selfXAlign__ `UIPopover.position.START`
      equates to `{0, ?}` on a 100x100 cartesian plane

    - __selfXAlign__ `UIPopover.position.MIDDLE`
      equates to `{50, ?}` on a 100x100 cartesian plane

    - __selfXAlign__ `UIPopover.position.END`
      equates to `{100, ?}` on a 100x100 cartesian plane

- __selfYAlign__ `Constant`
  default (`UIPopover.position.END`) location on the popover Y-axis to use for alignment calculations
    - __selfYAlign__ `UIPopover.position.START`
      equates to `{?, 0}` on a 100x100 cartesian plane

    - __selfYAlign__ `UIPopover.position.MIDDLE`
      equates to `{?, 50}` on a 100x100 cartesian plane

    - __selfYAlign__ `UIPopover.position.END`
      equates to `{?, 100}` on a 100x100 cartesian plane
