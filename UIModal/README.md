# UIModal
__A blocking, focus-stealing container.__

A modal is an enhancement upon a [dialog](../UIDialog/README.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

> The Platform team recommends reviewing the [Alerts](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/WindowAlerts.html#//apple_ref/doc/uid/20000957-CH44-SW1) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIModal` in your project.

---

### Example Usage

```js
import {UIButton, UIModal} from 'enigma-uikit';

// ...

render() {
    return (
        <UIModal header='My Dialog'
                 footer={[
                    <UIButton onPressed={this.handleConfirm}>Confirm</UIButton>,
                    <UIButton onPressed={this.handleCancel}>Cancel</UIButton>,
                 ]}>
            Testing 123
        </UIModal>
    );
}
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

---

### Expected Interactions

Refer to [UIDialog](../UIDialog/README.md)

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-wrapper` node

- all supported [UIDialog props](../UIDialog/README.md#available-props)

- __maskProps__ `Object`
    - __maskProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-mask` node

- __modalProps__ `Object`
    - __modalProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal` node
