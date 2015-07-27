# `UIKit/UIButton`
## A clickable control with "pressed" state support.

```jsx
let BOLD_LABEL = 'Press to activate bolding on the selected text and new input.';

// ...

return (
    <UIButton aria-label={BOLD_LABEL}
              className='text-bolder'
              onPressed={this.activateBolding}
              onUnpressed={this.deactivateBolding}
              pressed={this.isBold}>
        <i className='icon-bold' />
    </UIButton>
);
```
Renders:
```html
<button class="ui-button text-bolder" aria-label="Press to activate bolding on the selected text and new input." aria-pressed="true">
    <i class="icon-bold"></i>
</button>
```

Styling of the element will be provided via the class hooks:

- `.ui-button`
- `.ui-button-pressable`
- `.ui-button-pressed`


### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Keyboard** | `[Enter, Space]` (unpressed) | trigger the `onPressed` handler
**Keyboard** | `[Enter, Space]` (pressed) | trigger the `onUnpressed` handler
**Mouse** | `click` | trigger the `onClicked` handler
**Mouse** | `click` (unpressed) | trigger the `onPressed` handler
**Mouse** | `click` (pressed) | trigger the `onUnpressed` handler


### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-button` node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element

- **onClick** `Function`
  called when the element receives a mouse click

- **onPressed** `Function`
  called when the element becomes "pressed"; backing data must be updated to persist the state change

- **onUnpressed** `Function`
  called when the element becomes "unpressed"; backing data must be updated to persist the state change

- **pressed** `Boolean`
  enables "pressed" support and adds the `aria-pressed` attribute to the rendered element


<sub>A view must be functionally-accessible and whole by props alone.</sub>
