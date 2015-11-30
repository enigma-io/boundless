# UIButton

__A clickable control with "pressed" state support.__

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

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (unpressed) | trigger the `onPressed` handler
__Keyboard__ | `[Enter, Space]` (pressed) | trigger the `onUnpressed` handler
__Mouse__ | `click` | trigger the `onClicked` handler
__Mouse__ | `click` (unpressed) | trigger the `onPressed` handler
__Mouse__ | `click` (pressed) | trigger the `onUnpressed` handler

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-button` node

- __onClick__ `Function`
  called when the element receives a mouse click

- __onPressed__ `Function`
  called when the element becomes "pressed"; backing data must be updated to persist the state change

- __onUnpressed__ `Function`
  called when the element becomes "unpressed"; backing data must be updated to persist the state change

- __pressed__ `Boolean`
  enables "pressed" support and adds the `aria-pressed` attribute to the `.ui-button` node
