### `UIKit/UIPopover`
#### A non-blocking container positioned to a specific anchor element.

A popover is a type of [dialog](../UIDialog/README.md) that is meant to provide additional context to content (an "anchor") currently on-screen. Typically, a popover is spawned by interacting with the content it enriches and is dismissed by clicking or shifting focus to an alternate location.

```jsx
return (
    <UIPopover anchor={this.refs.content}
               body={[
                   <strong>tran·scen·den·tal</strong>,
                   <em>adjective</em>,
                   <UIList type='number'
                           items={[
                               'of or relating to a spiritual or nonphysical realm.',
                               '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.'
                           ]} />
               ]} />
);
```

Renders:

```html
<div class="ui-popover ui-modal" role="dialog" aria-labelledby="{uniqueId}" aria-describedby="{uniqueId}" tabindex="0" style="top: {anchorYPos}px; left: {anchorXPos}px;">
    <header id="{uniqueId}" class="ui-dialog-header"></header>
    <div id="{uniqueId}" class="ui-dialog-body">
        <strong>tran·scen·den·tal</strong>,
        <em>adjective</em>
        <ol class="ui-list ui-list-numbered">
            <li class="ui-list-item">of or relating to a spiritual or nonphysical realm.</li>
            <li class="ui-list-item">(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots.</li>
        </ol>
    </div>
    <footer class="ui-dialog-footer"></footer>
</div>
```

Combine the {element}{Axis}Align properties to create complete alignment points. For instance:

```jsx
<UIPopover anchor={HTMLElement}
           anchorXAlign={UIPopover.position.MIDDLE}
           anchorYAlign={UIPopover.position.END}
           body='foo' />
```

Aligns the popover to `{50, 100}` on the anchor element (if it was approximately 100px x 100px)

Styling of the element will be provided via the CSS hooks:

- `.ui-popover`

Below are helper classes for each position combination; helpful for aligning UI "carets" if desired.

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

<br />
##### Expected Interactions

Refer to [UIDialog](../UIDialog/README.md)

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal` node

- all supported [UIDialog props](../UIDialog/README.md)

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
  if the given alignment settings would take the popover out of bounds, change the alignment as necessary to remain in the viewport

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
