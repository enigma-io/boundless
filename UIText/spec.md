## Enigma Platform Team
### `UIKit/UIText`

Fits given text inside a parent container, obeying given constraints.

#### Usage

The most common use case for this class is fitting single-line text of unknown/variable length into a button or heading with finite boundaries.

```jsx
return (
    <UIButton onClick={someFunc} style={{width: '400px'}}>
        <UIText>Testing 123</UIText>
    </UIButton>
);
```

Renders:

```html
<button class="ui-button" style="width: 400px;">
    <span class="ui-text" style="font-size: {scalingRatio * 400}px;">Testing 123</span>
</button>
```

Styling of the element will be provided via the class hook: `.ui-text`


#### Expected Interactions

There are no expected user interactions. The component emits normal text and merely changes the presentation, so accessibility is not obstructed.


#### Optional Customization (via `props`)

These core functionality `props` are handled separately and typechecked:

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element, the core hook is not replaced

- **maxFontSize** `Number`
  an upper-boundary for how large the UI text is allowed to grow


<sub>A view must be functionally-accessible and whole by props alone.</sub>
