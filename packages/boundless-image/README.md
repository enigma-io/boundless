# Image
__An image block with placeholder support for loading and fallback scenarios.__

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.b-image-wrapper` node

- __alt__ `String`
  a written description of the image for search engines, hovertext and those using accessibility technologies; applied to the `.b-image` as the HTML attributes `alt` or `title`, depending on the type of rendered node

- __displayAsBackgroundImage__ `Boolean`
  emits the image as a `<div>` with `background-image` css property set instead of `<img>`

- __onError__ `Function`
  called if the image fails to load

- __src__ `String`
  a valid path to the desired image

- __statusProps__ `Object`
    - __statusProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-image-status` node

- __imageProps__ `Object`
    - __imageProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-image` node
