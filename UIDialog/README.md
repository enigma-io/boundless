### `UIKit/UIDialog`
#### A non-blocking, focus-stealing container.
<br />

A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page) and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

Specific areas (header, body, footer) are defined to provide easy conformance to the [WAI-ARIA spec](http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) for `aria-labelledby` and `aria-describedby` (screen reader accessibility).

```jsx
let footerButtons = [
  <UIButton onClick={this.handleConfirm}>Confirm</UIButton>,
  <UIButton onClick={this.handleCancel}>Cancel</UIButton>
];

return (
    <UIDialog header='My Dialog'
              body='Testing 123'
              footer={footerButtons}
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

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Render** | `N/A` | focus on dialog
**Event** | window `focus` | should be cancelled if moving inside -> outside dialog (relatedTarget + explicitOriginalTarget)
**Keyboard** | `Esc` | should trigger `props.onClose` if `closeOnEscKey === true`
**Mouse** | `Click` outside of dialog | should trigger `props.onClose` if `closeOnOutsideClick === true`

<br />
##### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the `.ui-dialog` node

- **body** `any renderable content`
  text, ReactElements, etc. comprising the main area of the dialog, e.g. forms, information, warnings

- **bodyAttributes** `Object`
    - **bodyAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-body` node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **closeOnEscKey** `Boolean`
  enable detection of "Escape" keypresses to trigger `props.onClose`

- **closeOnOutsideClick** `Boolean`
  enable detection of clicks outside the dialog area to trigger `props.onClose`

- **footer** `any renderable content`
  text, ReactElements, etc. comprising the "footer" area of the dialog, e.g. confirm/cancel buttons

- **footerAttributes** `Object`
    - **footerAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-footer` node

- **header** `any renderable content`
  text, ReactElements, etc. to represent the "title bar" area of the dialog

- **headerAttributes** `Object`
    - **headerAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-header` node

- **onClose** `Function`
  a handler called if `closeOnEscKey` or `closeOnOutsideClick` is passed as `true`


<sub>A view must be functionally-accessible and whole by props alone.</sub>
