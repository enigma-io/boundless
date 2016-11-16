# UIModal
__A blocking, focus-stealing container.__

UIModal is an enhancement upon [UIDialog](../UIDialog/README.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

> The UIKit Team recommends reviewing the [Alerts](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/WindowAlerts.html#//apple_ref/doc/uid/20000957-CH44-SW1) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIModal` in your project.

---

### Interactions

Refer to [UIDialog](../UIDialog/README.md)

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-wrapper` node

- all supported [UIDialog props](../UIDialog/README.md#available-props); applied to the `.ui-modal` node

- __maskProps__ `Object`
    - __maskProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal-mask` node

- __modalProps__ `Object`
    - __modalProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-modal` node

- __portalProps__ `object`
  (default `{}`) any/all supported [UIPortal props](../UIPortal/README.md)
