# `UIKit/UIImage`
## An image block with placeholder support for loading and fallback scenarios.

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

Styling of the element will be provided via the class hooks:

- `.ui-image`
- `.ui-image-wrapper`
- `.ui-image-status`
- `.ui-image-loading`
- `.ui-image-loaded`
- `.ui-image-error`


### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` | should trigger the onClick handler
**Mouse** | `click` | should trigger the onClick handler


### Required `props`

- **src** `String`
  a valid path to the desired image


### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-image` node

- **alt** `String`
  a written description of the image for search engines, hovertext and those using accessibility technologies; applied to the `.ui-image` as the HTML attributes `alt` or `title`, depending on the type of rendered node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **displayAsBackgroundImage** `Boolean`
  emits the image as a `<div>` with `background-image` css property set instead of `<img>`

- **onClick** `Function`
  called when the element is single-clicked

- **onError** `Function`
  called if the image fails to load

- **statusAttributes** `Object`
    - **statusAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-image-status` node

- **wrapperAttributes** `Object`
    - **wrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-image-wrapper` node


<sub>A view must be functionally-accessible and whole by props alone.</sub>
