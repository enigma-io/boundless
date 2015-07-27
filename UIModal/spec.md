## Enigma Platform Team
### `UIKit/UIModal`

A dialog that blocks user interaction with the rest of the page.

#### Usage

A modal is an enhancement upon a [dialog](../UIDialog/spec.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

```jsx
let footerButtons = [
  <UIButton onClick={this.handleConfirm}>Confirm</UIButton>,
  <UIButton onClick={this.handleCancel}>Cancel</UIButton>
];

return (
    <UIModal headerContent='My Dialog'
             bodyContent='Testing 123'
             footerContent={footerButtons} />
);
```

Renders:

```html
<div class="ui-modal-wrapper">
    <div class="ui-modal-mask"></div>
    <div class="ui-dialog ui-modal" role="dialog" aria-labelledby="{uniqueId}" aria-describedby="{uniqueId}" tabindex="0">
        <header id="{uniqueId}" class="ui-dialog-header">My Dialog</header>
        <div id="{uniqueId}" class="ui-dialog-body">Testing 123</div>
        <footer class="ui-dialog-footer">
            <button class="ui-button">Confirm</button>
            <button class="ui-button">Cancel</button>
        </footer>
    </div>
</div>
```

Styling of the element will be provided via the class hooks:

- `.ui-modal`
- `.ui-modal-mask`
- `.ui-modal-wrapper`


#### Expected Interactions

Refer to [UIDialog](../UIDialog/spec.md)


#### Customization (via `props`)

Any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element, e.g.

- name
- disabled
- type
- ...

These core functionality `props` are handled separately and typechecked:

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **headerContent** `any renderable content`
  text, ReactElements, etc. to represent the "title bar" area of the modal

- **bodyContent** `any renderable content`
  text, ReactElements, etc. comprising the main area of the modal, e.g. forms, information, warnings

- **footerContent** `any renderable content`
  text, ReactElements, etc. comprising the "footer" area of the modal, e.g. confirm/cancel buttons

- **closeOnEscKey** `Boolean`
  enable detection of "Escape" keypresses to trigger `props.onClose`

- **closeOnOutsideClick** `Boolean`
  enable detection of clicks outside the modal area to trigger `props.onClose`

- **onClose** `Function`
  a handler called if `closeOnEscKey` or `closeOnOutsideClick` is passed as `true`


<sub>A view must be functionally-accessible and whole by props alone.</sub>
