### `UIKit/UIProgress`
#### An unopinionated progress implementation that allows for a variety of shapes and effects.
<br />

```jsx
let cancelFunc = () => { endProcess(); };

return (
    <UIProgressBar
        progress='45'
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

Styling of the element will be provided via the class hooks:

- `.ui-progress`
- `.ui-progress-cancel`
- `.ui-progress-label`
- `.ui-progress-wrapper`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` on cancel element | should trigger the onCancel handler
**Mouse** | `click` on cancel element | should trigger the onCancel handler

<br />
##### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress` node

- **cancelAttributes** `Object`
    - **cancelAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-cancel` node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **label** `Boolean`
  the value to show as a label of the progress, e.g. "50%"

- **labelAttributes** `Object`
    - **labelAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-label` node

- **onCancel** `Function`
  if supplied, adds a cancel element and calls this function when that element is clicked

- **progress** `[String|Number]`
  the integer (and unit, if applicable) of the current progress state, e.g. 0.01 (opacity)

- **tweenProperty** `String`
  the CSS property to tween (must accept percentages) - defaults to "width"

- **wrapperAttributes** `Object`
    - **wrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-wrapper` node


<sub>A view must be functionally-accessible and whole by props alone.</sub>
