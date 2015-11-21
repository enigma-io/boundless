# UIList
__A generic list view, supporting unstyled, bulleted and numbered output.__

```js
import {UIList} from 'enigma-uikit';

// ...

render() {
    return (
        <UIList type='bullet' items={['apple', 'orange', 'lemon']} />
    );
}
```

Renders:

```html
<ul class="ui-list ui-list-bulleted">
    <li class="ui-list-item" tabindex="0">apple</li>
    <li class="ui-list-item" tabindex="0">orange</li>
    <li class="ui-list-item" tabindex="0">lemon</li>
</ul>
```

Styling of the list will be provided via CSS hooks:

- `.ui-list`
- `.ui-list-bulleted`
- `.ui-list-numbered`
- `.ui-list-plain`
- `.ui-list-item`

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ |`[Tab]` | should move focus to the next child, exit `UIList` tabbing context if at the last child
__Keyboard__ |`[Shift+Tab]` | should move focus to the previous child, exit `UIList` tabbing context if at the first child
__Keyboard__ |`['Left', 'Right']` | should move focus to previous/next child if `props.type` is not set; should loop
__Keyboard__ |`['Top', 'Bottom']` | should move focus to previous/next child if `props.type` is set; should loop

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-list` node

- __items__ `Array`
  the content to be rendered inside the list

- __type__ `['bullet', 'number']`
  (default `null`, meaning `<div>`) change the container element type to activate browser native styles
