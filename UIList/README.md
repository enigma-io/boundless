# UIList
__A generic list view, supporting unstyled, bulleted and numbered output.__

---

UIList makes use of [UIArrowKeyNavigation](../UIArrowKeyNavigation/README.md).

### Example Usage

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

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ |`['Left', 'Top']` | move focus to previous child; will loop
__Keyboard__ |`['Right', 'Bottom']` | move focus to next child; will loop

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-list` node

- __items__ `Array`
  the content to be rendered inside the list

- __type__ `['bullet', 'number']`
  (default `null`, meaning `<div>`) change the container element type to activate browser native styles
