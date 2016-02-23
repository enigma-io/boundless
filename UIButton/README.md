# UIButton
__A control with "pressed" state support.__

> The Platform team recommends reviewing the [Button](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsButtons.html#//apple_ref/doc/uid/20000957-CH48-SW2) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UIButton` in your project.

UIButton can be used like a normal HTML `<button>`, or when provided `props.pressed`, can become stateful. Think of a stateful button as more of a "toggle", like turning on bold-mode in a rich text editor.

---

### Example Usage

```js
import {UIButton} from 'enigma-uikit';

// ...

render() {
    return (
        <UIButton aria-label='Press to activate bolding on the selected text and new input.'
                  className='text-bolder'
                  onPressed={this.activateBolding}
                  onUnpressed={this.deactivateBolding}
                  pressed={this.isBold}>
            <i className='icon-bold' />
        </UIButton>
    );
}
```
Renders:
```html
<button class="ui-button text-bolder" aria-label="Press to activate bolding on the selected text and new input." aria-pressed="true">
    <i class="icon-bold"></i>
</button>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-button`
- `.ui-button-pressable`
- `.ui-button-pressed`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (unpressed) | trigger the `onPressed` handler
__Keyboard__ | `[Enter, Space]` (pressed) | trigger the `onUnpressed` handler
__Mouse__ | `click` (unpressed) | trigger the `onPressed` handler
__Mouse__ | `click` (pressed) | trigger the `onUnpressed` handler

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-button` node

- __onPressed(event)__ `Function`
  called when the element becomes "pressed" or triggered by the user (mouse or keyboard); backing data must be updated to persist the state change; this function will still be called if `props.pressed` is not passed

- __onUnpressed(event)__ `Function`
  called when the element becomes "unpressed"; backing data must be updated to persist the state change

- __pressed__ `Boolean`
  enables "pressed" support and adds the `aria-pressed` attribute to the `.ui-button` node; essentially a "stateful" button (see the "unpressed/pressed" example demo above)
