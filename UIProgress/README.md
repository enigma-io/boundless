### `UIKit/UIProgress`
#### An unopinionated progress implementation that allows for a variety of shapes and effects.

```jsx
let cancelFunc = () => { endProcess(); };

return (
    <UIProgressBar progress='45'
                   onCancel={cancelFunc} />
);
```

Renders:

```html
<div class="ui-progress-wrapper">
    <div class="ui-progress" style="width: 45%;"></div>
    <div class="ui-progress-cancel"></div>
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-progress`
- `.ui-progress-cancel`
- `.ui-progress-indeterminate`
- `.ui-progress-label`
- `.ui-progress-wrapper`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | no `progress` passed | should have the indeterminate class
__Keyboard__ | `[Enter, Space]` on cancel element | should trigger the onCancel handler
__Mouse__ | `click` on cancel element | should trigger the onCancel handler

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-wrapper` node

- __cancelAttrs__ `Object`
    - __cancelAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-cancel` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-progress-wrapper` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-progress-wrapper` node

- __label__ `Boolean`
  the value to show as a label of the progress, e.g. "50%"

- __labelAttrs__ `Object`
    - __labelAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-label` node

- __onCancel__ `Function`
  if supplied, adds a cancel element and calls this function when that element is clicked

- __progress__ `[String|Number]`
  the integer (and unit, if applicable) of the current progress state, e.g. 0.01 (opacity)

- __progressAttrs__ `Object`
    - __progressAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress` node

- __style__ `Object`
  inline styles to be applied to the `.ui-progress-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference

- __tweenProperty__ `String`
  the CSS property to tween (must accept percentages) - defaults to "width"
