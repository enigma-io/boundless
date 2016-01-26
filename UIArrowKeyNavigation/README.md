# UIArrowKeyNavigation
__A higher-order component that adds arrow key navigation to a grouping of children.__

---

### Example Usage

UIArrowKeyNavigation is designed not to care about the component types it is wrapping. Due to this, you can pass whatever HTML tag you like into `props.component` or even a React component you've made elsewhere.

The children, similarly, can be any type of component.

```js
import {UIArrowKeyNavigation} from 'enigma-uikit';

const list = ['apple', 'orange', 'lemon'];

// ...

render() {
    return (
        <UIArrowKeyNavigation component='ul' className='my-list' aria-label='Press an arrow key to cycle through the list.'>
            {list.map(item => <li key={item}>{item}</li>)}
        </UIArrowKeyNavigation>
    );
}
```

Renders:

```html
<ul class="my-list" aria-label="Press an arrow key to cycle through the list.">
    <li tabindex="0">apple</li>
    <li tabindex="0">orange</li>
    <li tabindex="0">lemon</li>
</ul>
```

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ |`['Left', 'Up']` | move focus to previous child
__Keyboard__ |`['Right', 'Down']` | move focus to next child

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element

- __component__ `String|Constructor`
  any valid HTML tag name or a React component factory; basically anything that can be passed as the first argument to `React.createElement`
