# UITextualInput
__A textual input control with placeholder emulation for non-supporting platforms.__

---

UITextualInput abstracts away the cross-platform differences of placeholder styling and behaviors, for example: Internet Explorer dismisses native placeholders on input focus and other platforms do not. This component ensures that text input controls will feel and behave similarly on more devices.

---

### Example Usage

```jsx
import {UITextualInput} from 'enigma-uikit';

render() {
    return (
        <UITextualInput
            hidePlaceholderOnFocus={true}
            inputProps={{
                'aria-label': 'Type a keyword and press Enter to perform a search.',
                name: 'search-box',
                placeholder: 'Search here...',
                type: 'search',
            }} />
    );
}
```

Renders:

```html
<div class="ui-textual-input-wrapper">
    <div class="ui-textual-input-placeholder ui-textual-input">Search here...</div>
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

### Available instance methods

- __getValue()__
  returns the current value of the input field

- __setValue(string)__
  programmatically set the input value; useful for clearing out the input in "uncontrolled" mode -- note that digging into the internals and setting the `refs.field.value = ''` directly will not trigger events and messes up the internal state of the component

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-textual-input-wrapper` node

- __hidePlaceholderOnFocus__ `Boolean`
  (default: true) triggers the placeholder to disappear when the input field is focused, reappears when the user has tabbed away or focus is moved

- __inputProps__ `Object`
  props to be passed through to the input node, `.ui-textual-input`; this includes the standard set of React input props like `defaultValue`, `value`, `name`, `placeholder`, `autoFocus`, etc.

  - __inputProps.type__ `String`
    (default: "text")
