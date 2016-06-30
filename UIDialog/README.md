# UIDialog
__A non-blocking, focus-stealing container.__

A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page) and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

Specific areas (header, body, footer) are defined to provide easy conformance to the [WAI-ARIA spec](http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) for `aria-labelledby` and `aria-describedby` (screen reader accessibility). Their use is optional, but encouraged.

---

### Example Usage

```jsx
import {UIDialog} from 'enigma-uikit';

// ...

render() {
    return (
        <UIDialog
            header='My Dialog'
            footer={[
                <UIButton onPressed={this.handleConfirm.bind(this)}>Confirm</UIButton>,
                <UIButton onPressed={this.handleCancel.bind(this)}>Cancel</UIButton>,
            ]}
            closeOnEscKey={true}
            closeOnOutsideClick={true}
            onClose={this.handleCancel}>
            Testing 123
        </UIDialog>
    );
}
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

Styling of the element will be provided via the CSS hook(s):

- `.ui-dialog`
- `.ui-dialog-header`
- `.ui-dialog-body`
- `.ui-dialog-footer`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | `N/A` | focus on dialog
__Event__ | window `focus` | should be cancelled if moving inside -> outside dialog if `props.captureFocus` is `true`
__Keyboard__ | `Esc` | should trigger `props.onClose` if `closeOnEscKey === true`
__Mouse__ | `Click` outside of dialog | should trigger `props.onClose` if `closeOnOutsideClick === true`

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog` node

- __bodyProps__ `Object`
    - __bodyProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-body` node

- __captureFocus__ `Boolean`
  (default `true`) determines if focus is allowed to move away from the dialog

- __closeOnEscKey__ `Boolean`
  (default `false`) enable detection of "Escape" keypresses to trigger `props.onClose`

- __closeOnOutsideClick__ `Boolean`
  (default `false`) enable detection of clicks outside the dialog area to trigger `props.onClose`

- __closeOnOutsideFocus__ `Boolean`
  (default `false`) enable detection of focus outside the dialog area to trigger `props.onClose`

- __closeOnOutsideScroll__ `Boolean`
  (default `false`) enable detection of scroll and mousewheel events outside the dialog area to trigger `props.onClose`

- __footer__ `any renderable content`
  text, ReactElements, etc. comprising the "footer" area of the dialog, e.g. confirm/cancel buttons

- __footerProps__ `Object`
    - __footerProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-footer` node

- __header__ `any renderable content`
  text, ReactElements, etc. to represent the "title bar" area of the dialog

- __headerProps__ `Object`
    - __headerProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-header` node

- __onClose__ `Function`
  a custom event handler that is called to indicate that the dialog should be unrendered by its parent; the event occurs if one or more of the `closeOn` props (`closeOnEscKey`, `closeOnOutsideClick`, etc.) are passed as `true` and the dismissal criteria are satisfied
