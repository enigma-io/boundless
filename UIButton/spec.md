## Enigma Platform Team
### `UIKit/UIButton`

#### Usage

Accepts a number of customizations via `props`.

```jsx
let clickFunc = (event) => {
    alert('HONK!');
};

return (
    <UIButton className='car-horn-button' onClick={clickFunc}>
        Honk
    </UIButton>
);

// -> <button class="ui-button car-horn-button">Honk</button>
```

Styling of the element will be provided via the class hook: `.ui-button`


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` | should trigger the onClick handler
**Mouse** | `click` | should trigger the onClick handler
**Mouse** | `dblclick` | should trigger the onDoubleClick handler


#### Optional Customization (via `props`)

Any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element, e.g.

- name
- disabled
- type
- ...

These core functionality `props` are handled separately and typechecked:

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **autofocus** `Boolean`
  programmatically focuses the element on first render (does not require HTML5 support)

- **onClick** `Function`
  called when the element is single-clicked

- **onDoubleClick** `Function`
  called when the element is double-clicked; usage introduces a 300ms wait before `onClick` is released to detect if another click arrives to complete the `dblclick`


<sub>A view must be functionally-accessible and whole by props alone.</sub>
