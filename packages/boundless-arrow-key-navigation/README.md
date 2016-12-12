# ArrowKeyNavigation
__A higher-order component for arrow key navigation on a grouping of children.__

ArrowKeyNavigation is designed not to care about the component types it is wrapping. Due to this, you can pass whatever HTML tag you like into `props.component` or even a React component you've made elsewhere. Additional props passed to `<ArrowKeyNavigation ...>` will be forwarded on to the component or HTML tag name you've supplied.

The children, similarly, can be any type of component.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | ⬅️ `Left` | move focus to previous child if `props.mode` is `ArrowKeyNavigation.mode.HORIZONTAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ➡️ `Right` | move focus to next child if `props.mode` is `ArrowKeyNavigation.mode.HORIZONTAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ⬆️ `Up` | move focus to previous child if `props.mode` is `ArrowKeyNavigation.mode.VERTICAL` or `ArrowKeyNavigation.mode.BOTH`
__Keyboard__ | ⬇️ `Down` | move focus to next child if `props.mode` is `ArrowKeyNavigation.mode.VERTICAL` or `ArrowKeyNavigation.mode.BOTH`

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; forwarded
  to `props.component`

- __component__ `string|function`
  any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`

- __defaultActiveChildIndex__ `number`
  (default `0`) allows for a particular child to be initially reachable via tabbing

- __mode__ `ArrowKeyNavigation.mode[VERTICAL|HORIZONTAL|BOTH]`
  (default `ArrowKeyNavigation.mode.BOTH`) controls when arrow key presses will be caught by component and result in the active item being incremented or decremented
