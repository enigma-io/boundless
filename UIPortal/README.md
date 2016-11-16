# UIPortal
__A higher-order component for the rendering of components outside the normal React tree.__

`UIPortal` is used in other components such as `UIPopover` to render content to places like the HTML `<body>` tag, avoiding style leakage and parent layout contexts.

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); these props are added to the `span[data-portal-id]`  element rendered at the portal origin

- __children__ `*`
  any normal React child, but must be singular; multiple sibling children must have a common wrapper, such as a "layout" `<div>`

  ✅ OK:

  ```jsx
  <UIPortal>
    foo
  </UIPortal>

  <UIPortal>
    <div>foo</div>
  </UIPortal>

  <UIPortal>
    <div>
        <div>foo</div>
        <div>bar</div>
    </div>
  </UIPortal>
  ```

  ⛔️ NOT OK:

  ```jsx
  <UIPortal>
    <div>foo</div>
    <div>bar</div>
  </UIPortal>
  ```

- __destination__ `HTMLElement`
  (default `document.body`) the location to append the generated portal and child elements

- __portalId__ `string`
  (default `UIUtils.uuid()`) the ID used to link the portal origin to the destination; added to generated `<div>` appended to the destination HTML node
