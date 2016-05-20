# UIProgress
__An unopinionated progress implementation that allows for a variety of shapes and effects.__

> The UIKit Team recommends reviewing the [Progress Indicator](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsIndicators.html#//apple_ref/doc/uid/20000957-CH50-SW2) and [User Feedback](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/Feedback.html#//apple_ref/doc/uid/20000957-CH9-SW1) sections of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIProgress` in your project.

---

### Example Usage

```js
import {UIProgress} from 'enigma-uikit';

// ...

render() {
    return (
        <UIProgress progress='45'
                    onCancel={cancelFunc} />
    );
}
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

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | no `progress` passed | should have the indeterminate class
__Keyboard__ | `[Enter, Space]` on cancel element | should trigger the onCancel handler
__Mouse__ | `click` on cancel element | should trigger the onCancel handler

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-wrapper` node

- __cancelProps__ `Object`
    - __cancelProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-cancel` node

- __label__ `Boolean`
  the value to show as a label of the progress, e.g. "50%"

- __labelProps__ `Object`
    - __labelProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress-label` node

- __onCancel__ `Function`
  if supplied, adds a cancel element and calls this function when that element is clicked

- __progress__ `[String|Number]`
  the integer (and unit, if applicable) of the current progress state, e.g. 0.01 (opacity)

- __progressProps__ `Object`
    - __progressProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-progress` node

- __tweenProperty__ `String`
  the CSS property to tween (must accept percentages) - defaults to "width"
