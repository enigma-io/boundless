### `UIKit/UIList`
#### A generic list view, supporting unstyled, bulleted and numbered output.

```jsx
let list = ['apple', 'orange', 'lemon'];

return (
    <UIList items={list} />
);
```

Styling of the list will be provided via CSS hooks:

- `.ui-list`
- `.ui-list-bulleted`
- `.ui-list-numbered`
- `.ui-list-plain`
- `.ui-list-item`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ |`[Tab]` | should move focus to the next child, exit `UIList` tabbing context if at the last child
__Keyboard__ |`[Shift+Tab]` | should move focus to the previous child, exit `UIList` tabbing context if at the first child
__Keyboard__ |`['Left', 'Right']` | should move focus to previous/next child if `props.type` is not set; should loop
__Keyboard__ (*RTL*) | `['Left', 'Right']` | should move focus to next/previous child if `props.type` is not set; should loop
__Keyboard__ |`['Top', 'Bottom']` | should move focus to previous/next child if `props.type` is set; should loop

<br />
##### Available `props`
- __attrs__ {Object}
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-list` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-list` node

- __items__ `Array`
  the content to be rendered inside the list

- __type__ `['bullet', 'number']`
  (default `null`, meaning `<div>`) change the container element type to activate browser native styles
