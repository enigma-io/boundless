## Enigma Platform Team
### `UIKit/UIDialog`

A non-blocking implementation with header, body and footer support.

#### Usage

A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page) and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

```jsx
let footerButtons = [
  <UIButton onClick={this.handleConfirm}>Confirm</UIButton>,
  <UIButton onClick={this.handleCancel}>Cancel</UIButton>
];

return (
    <UIDialog headerContent='My Dialog'
              bodyContent='Testing 123'
              footerContent={footerButtons}
              closeOnEscKey={true}
              closeOnOutsideClick={true}
              onClose={this.handleCancel} />
);
```

Renders:

```html
<div class="ui-dialog" role="dialog" aria-labelledby="{uniqueId}" aria-describedby="{uniqueId}" tabindex="0">
    <header id="{uniqueId}" class="ui-dialog-header">My Dialog</header>
    <div id="{uniqueId}" class="ui-dialog-body">Testing 123</div>
    <footer class="ui-dialog-footer">
      <button class="ui-button">Confirm</button>
      <button class="ui-button">Cancel</button>
    </footer>
</div>
```

Styling of the element will be provided via the class hooks:

- `.ui-dialog`
- `.ui-dialog-header`
- `.ui-dialog-body`
- `.ui-dialog-footer`


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Render** | `N/A` | focus on dialog
**Event** | window `focus` | should be cancelled if moving inside -> outside dialog (relatedTarget + explicitOriginalTarget)
**Keyboard** | `Esc` | should trigger `props.onClose` if `closeOnEscKey === true`
**Mouse** | `Click` outside of dialog | should trigger `props.onClose` if `closeOnOutsideClick === true`


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
  text, ReactElements, etc. to represent the "title bar" area of the dialog

- **bodyContent** `any renderable content`
  text, ReactElements, etc. comprising the main area of the dialog, e.g. forms, information, warnings

- **footerContent** `any renderable content`
  text, ReactElements, etc. comprising the "footer" area of the dialog, e.g. confirm/cancel buttons

- **closeOnEscKey** `Boolean`
  enable detection of "Escape" keypresses to trigger `props.onClose`

- **closeOnOutsideClick** `Boolean`
  enable detection of clicks outside the dialog area to trigger `props.onClose`

- **onClose** `Function`
  a handler called if `closeOnEscKey` or `closeOnOutsideClick` is passed as `true`


<sub>A view must be functionally-accessible and whole by props alone.</sub>
