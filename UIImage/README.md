### `UIKit/UIImage`
#### An image block with placeholder support for loading and fallback scenarios.

```jsx
return (
    <UIImage src='http://i.imgur.com/BymoMze.jpg'
             alt='A Corgi wielding Google Glass.' />
);
```

Renders:

```html
<div class="ui-image-wrapper">
    <img class="ui-image" src="http://i.imgur.com/BymoMze.jpg" alt="A Corgi wielding Google Glass." />
    <div class="ui-image-loaded" role="presentation"></div>
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-image`
- `.ui-image-wrapper`
- `.ui-image-status`
- `.ui-image-loading`
- `.ui-image-loaded`
- `.ui-image-error`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` | should trigger the onClick handler
__Mouse__ | `click` | should trigger the onClick handler

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-image` node

- __alt__ `String`
  a written description of the image for search engines, hovertext and those using accessibility technologies; applied to the `.ui-image` as the HTML attributes `alt` or `title`, depending on the type of rendered node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-image` element

- __displayAsBackgroundImage__ `Boolean`
  emits the image as a `<div>` with `background-image` css property set instead of `<img>`

- __onClick__ `Function`
  called when the element is single-clicked

- __onError__ `Function`
  called if the image fails to load

- __src__ `String`
  a valid path to the desired image

- __statusAttrs__ `Object`
    - __statusAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-image-status` node

- __wrapperAttrs__ `Object`
    - __wrapperAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-image-wrapper` node
