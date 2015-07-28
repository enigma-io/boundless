### `UIKit/UIModal`
#### A blocking, focus-stealing container.
<br />

A modal is an enhancement upon a [dialog](../UIDialog/spec.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

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

Styling of the element will be provided via the class hooks:

- `.ui-modal`
- `.ui-modal-mask`
- `.ui-modal-wrapper`

<br />
##### Expected Interactions

Refer to [UIDialog](../UIDialog/spec.md)

<br />
##### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal` node

- all supported [UIDialog props](../UIDialog/spec.md)

- **maskAttributes** `Object`
    - **maskAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-mask` node

- **wrapperAttributes** `Object`
    - **wrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-wrapper` node


<sub>A view must be functionally-accessible and whole by props alone.</sub>
