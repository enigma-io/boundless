## Enigma Platform Team
### `UIKit/UIList`

A generic list view, supporting unstyled, bulleted and numbered output.

#### Usage

Accepts an array of renderable objects (`props.items`).

```jsx
let list = ['apple', 'orange', 'lemon'];

return (
    <UIList items={list} />
);
```

Styling of the list will be provided via class hooks:

- `.ui-list`
- `.ui-list-item`


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** |`[Tab]` | should move focus to the next child, exit `UIList` tabbing context if at the last child
**Keyboard** |`[Shift+Tab]` | should move focus to the previous child, exit `UIList` tabbing context if at the first child
**Keyboard** |`['Left', 'Right']` | should move focus to previous/next child if `props.type` is not set; should loop
**Keyboard** (*RTL*) | `['Left', 'Right']` | should move focus to next/previous child if `props.type` is not set; should loop
**Keyboard** |`['Top', 'Bottom']` | should move focus to previous/next child if `props.type` is set; should loop


#### Customization (via `props`)

- **type** `['bullet', 'number']`
  change the container element type to activate browser native styles (defaults to `div`)


<sub>A view must be functionally-accessible and whole by props alone.</sub>
