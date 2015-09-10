### `UIKit/UIProgressiveDisclosure`
#### Hide content until it's needed.

```jsx
return (
    <div>
        Save?

        <UIProgressiveDisclosure teaser='Advanced Options'>
            <label htmlFor='filename-field'>Save as a different name?</label>
            <input id='filename-field' name='filename' type='text' placeholder='untitled.txt' />
        </UIProgressiveDisclosure>

        <UIButton onClick={doSave}>Yes</UIButton>
        <UIButton onClick={doCancel}>No</UIButton>
    </div>
);
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

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
**Mouse** | `click` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`
**Keyboard** | `[Enter]` on toggle | expand/contract the disclosure content, trigger the appropriate callback: `on(Expand|Hide)`

<br />
##### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-disclosure` node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered `.ui-disclosure` node

- **expanded** `Boolean`
  allows the disclosure to be rendered expanded by default

- **onExpand** `Boolean`
  called when the content is shown; not called on initial render

- **onHide** `Function`
  called when the content is hidden; not called on initial render

- **teaser** `Node`
  content to be shown next to the expansion toggle, e.g. "Advanced Options"
