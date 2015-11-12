### `UIKit/UIModal`
#### A blocking, focus-stealing container.

A modal is an enhancement upon a [dialog](../UIDialog/README.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

```jsx
let footerButtons = [
  <UIButton onClick={this.handleConfirm}>Confirm</UIButton>,
  <UIButton onClick={this.handleCancel}>Cancel</UIButton>
];

return (
    <UIModal header='My Dialog'
             body='Testing 123'
             footer={footerButtons} />
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

Styling of the element will be provided via the CSS hooks:

- `.ui-modal`
- `.ui-modal-mask`
- `.ui-modal-wrapper`

<br />
##### Expected Interactions

Refer to [UIDialog](../UIDialog/README.md)

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-wrapper` node

- all supported [UIDialog props](../UIDialog/README.md)

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-modal-wrapper` node

- __maskAttrs__ `Object`
    - __maskAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-mask` node

- __modalAttrs__ `Object`
    - __modalAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal` node

- __style__ `Object`
  inline styles to be applied to the `.ui-modal-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference
