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
**Keyboard** |`[Tab]` | should move focus to the next child, exit `UIList` tabbing context if at the last child
**Keyboard** |`[Shift+Tab]` | should move focus to the previous child, exit `UIList` tabbing context if at the first child
**Keyboard** |`['Left', 'Right']` | should move focus to previous/next child if `props.type` is not set; should loop
**Keyboard** (*RTL*) | `['Left', 'Right']` | should move focus to next/previous child if `props.type` is not set; should loop
**Keyboard** |`['Top', 'Bottom']` | should move focus to previous/next child if `props.type` is set; should loop

<br />
##### Available `props`

- **items** `Array`
  the content to be rendered inside the list

- **type** `['bullet', 'number']`
  (default `null`, meaning `<div>`) change the container element type to activate browser native styles
