## Enigma Platform Team
### `UIKit/UIImage`

An image block with placeholder support for loading and fallback scenarios.

#### Usage

```jsx
return (
    <UIImage
        href='http://i.imgur.com/BymoMze.jpg'
        alt='A Corgi wielding Google Glass.' />
);
```

Renders:

```html
<div class="ui-image-wrapper">
    <img class="ui-image" href="http://i.imgur.com/BymoMze.jpg" alt="A Corgi wielding Google Glass." />
    <div class="ui-image-loaded" role="presentation"></div>
</div>
```

Styling of the element will be provided via the class hooks:

- `.ui-image`
- `.ui-image-wrapper`
- `.ui-image-loading`
- `.ui-image-loaded`
- `.ui-image-error`


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` | should trigger the onClick handler
**Mouse** | `click` | should trigger the onClick handler


#### Optional Customization (via `props`)

Any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element, e.g.

- name
- disabled
- type
- ...

They are applied automatically to the rendered `<img />` tag.

These core functionality `props` are handled separately and typechecked:

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **displayAsBackgroundImage** `Boolean`
  emits the image as a `<div>` with `background-image` css property set instead of `<img>`

- **onClick** `Function`
  called when the element is single-clicked

- **onError** `Function`
  called if the image fails to load


<sub>A view must be functionally-accessible and whole by props alone.</sub>
