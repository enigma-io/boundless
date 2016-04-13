# UITextualInput
__A textual input control with placeholder emulation for non-supporting platforms.__

---

UITextualInput abstracts away the cross-platform differences of placeholder styling and behaviors, for example: Internet Explorer dismisses native placeholders on input focus and other platforms do not. This component ensures that text input controls will feel and behave similarly on more devices.

---

### Example Usage

```js
import {UITextualInput} from 'enigma-uikit';

render() {
    return (
        <UITextualInput
            name='search-box'
            aria-label='Type a keyword and press Enter to perform a search.'
            placeholder='Search here...'
            type='search' />
    );
}
```

Renders:

```html
<div class="ui-textual-input-wrapper">
    <div class="ui-textual-input-placeholder">Search here...</div>
    <input class="ui-textual-input" name="search-box" type="search" aria-label="Type a keyword and press Enter to perform a search." />
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-textual-input`
- `.ui-textual-input-wrapper`
- `.ui-textual-input-placeholder`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | text entry on the input | should clear out the placeholder text
__Focus__ | on the input | should clear out the placeholder text in expectation of typing (if `props.hidePlaceholderOnFocus` is `true`)
__Blur__ | on the input | should restore the placeholder text if the input is empty at the time of focus moving away (if `props.hidePlaceholderOnFocus` is `true`)

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-textual-input-wrapper` node

- __defaultValue__ `String`
  passed through to the main input node, `.ui-textual-input` -- may alternatively be set in `props.inputProps` if desired

- __hidePlaceholderOnFocus__ `Boolean`
  triggers the placeholder to disappear when the input field is focused, reappears when the user has tabbed away or focus is moved

- __inputProps__ `Object`
  props to be passed through to the input node, `.ui-textual-input`

- __name__ `String`
  passed through to the main input node, `.ui-textual-input` -- may alternatively be set in `props.inputProps` if desired

- __placeholder__ `String`
  `.ui-textual-input-placeholder` with the appropriate placeholder text will be rendered and inherit the styles of `.ui-textual-input`; native `placeholder` is not used for this component due to x-platform behavioral differences

- __type__ `String`
  passed through to the main input node, `.ui-textual-input` -- may alternatively be set in `props.inputProps` if desired

- __value__ `String`
  passed through to the main input node, `.ui-textual-input` -- may alternatively be set in `props.inputProps` if desired; turns `UITextualInput` into a ["controlled input"](https://facebook.github.io/react/docs/forms.html#controlled-components) and the relevant updating rules apply
