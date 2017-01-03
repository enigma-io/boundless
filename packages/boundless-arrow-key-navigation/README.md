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
