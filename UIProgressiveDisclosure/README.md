# UIProgressiveDisclosure
__Hide content until it's needed.__

> The Platform team recommends reviewing the [Disclosure](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW12) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIProgressiveDisclosure` in your project.

---

### Example Usage

```js
import {UIButton, UIProgressiveDisclosure} from 'enigma-uikit';

// ...

render() {
    return (
        <div>
            Save?

            <UIProgressiveDisclosure teaser='Advanced Options'>
                <label htmlFor='filename-field'>Save as a different name?</label>
                <input id='filename-field' name='filename' type='text' placeholder='untitled.txt' />
            </UIProgressiveDisclosure>

            <UIButton onPressed={doSave}>Yes</UIButton>
            <UIButton onPressed={doCancel}>No</UIButton>
        </div>
    );
}
```
Renders:
```html
<div>
    Save?
    <div class="ui-disclosure">
        <div class="ui-disclosure-toggle">Advanced Options</div>
        <div class="ui-disclosure-content">
            <label for="filename-field">Save as a different name?</label>
            <input id="filename-field" name="filename" type="text" placeholder="untitled.txt" />
        </div>
    </div>
    <button class="ui-button">Yes</button>
    <button class="ui-button">No</button>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-disclosure`
- `.ui-disclosure-toggle`
- `.ui-disclosure-content`
- `.ui-disclosure-expanded`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`
__Keyboard__ | `[Enter]` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-disclosure` node

- __expanded__ `Boolean`
  allows the disclosure to be rendered expanded by default

- __onExpand__ `Boolean`
  called when the content is shown; not called on initial render

- __onHide__ `Function`
  called when the content is hidden; not called on initial render

- __teaser__ `Node`
  content to be shown next to the expansion toggle, e.g. "Advanced Options"

- __teaserExpanded__ `Node`
  content to be shown next to the expansion toggle when the disclosure is in "expanded" state, e.g. "Hide Advanced Options"

- __toggleProps__ `Object`
  __toggleProps.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-disclosure-toggle` node
