## Enigma Platform Team
### `UIKit/UIProgress`

An unopinionated progress implementation that allows for a variety of shapes and effects.

#### Usage

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


#### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` on cancel element | should trigger the onCancel handler
**Mouse** | `click` on cancel element | should trigger the onCancel handler


#### Customization (via `props`)

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **progress** `Number`
  updates the progress bar's current width (may be animated via CSS at the developer's discretion)

- **progressProperty** `String`
  the CSS property to tween (must accept percentages) - defaults to "width"

- **showProgressLabel** `Boolean`
  add an additional element with the text value of the current progress

- **onCancel** `Function`
  if supplied, adds a cancel element and calls this function when that element is clicked


<sub>A view must be functionally-accessible and whole by props alone.</sub>
