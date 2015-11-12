### `UIKit/UIDialog`
#### A non-blocking, focus-stealing container.

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

Styling of the element will be provided via the CSS hooks:

- `.ui-dialog`
- `.ui-dialog-header`
- `.ui-dialog-body`
- `.ui-dialog-footer`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | `N/A` | focus on dialog
__Event__ | window `focus` | should be cancelled if moving inside -> outside dialog if `props.captureFocus` is `true`
__Keyboard__ | `Esc` | should trigger `props.onClose` if `closeOnEscKey === true`
__Mouse__ | `Click` outside of dialog | should trigger `props.onClose` if `closeOnOutsideClick === true`

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog` node

- __body__ `any renderable content`
  text, ReactElements, etc. comprising the main area of the dialog, e.g. forms, information, warnings

- __bodyAttrs__ `Object`
    - __bodyAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-body` node

- __captureFocus__ `Boolean` (default `true`)
  determines if focus is allowed to move away from the dialog

- __className__ `[String|Array<String>]`
  additional CSS class(es) to be added to the rendered `.ui-dialog` node

- __closeOnEscKey__ `Boolean`
  enable detection of "Escape" keypresses to trigger `props.onClose`

- __closeOnOutsideClick__ `Boolean`
  enable detection of clicks outside the dialog area to trigger `props.onClose`

- __footer__ `any renderable content`
  text, ReactElements, etc. comprising the "footer" area of the dialog, e.g. confirm/cancel buttons

- __footerAttrs__ `Object`
    - __footerAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-footer` node

- __header__ `any renderable content`
  text, ReactElements, etc. to represent the "title bar" area of the dialog

- __headerAttrs__ `Object`
    - __headerAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-header` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-dialog` node

- __onClose__ `Function`
  a handler called if `closeOnEscKey` or `closeOnOutsideClick` is passed as `true`

- __style__ `Object`
  inline styles to be applied to the `.ui-dialog` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference
