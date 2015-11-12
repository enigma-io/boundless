### `UIKit/UIFittedText`
#### Fit given text inside a parent container, obeying implict and explicit constraints.

The most common use case for this class is fitting single-line text of unknown/variable length into a button or heading with finite boundaries.

```jsx
return (
    <UIButton onClick={someFunc} attrs={{style: {width: '400px'}}}>
        <UIFittedText>Testing 123</UIFittedText>
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

<br />
##### Expected Interactions

There are no expected user interactions. The component emits normal text and merely changes the presentation; accessibility is not obstructed.

<br />
##### Available `props`

- __attrs__ `Object`
  __attrs.*__
  any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-text` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-text` element

- __maxFontSize__ `Number`
  an upper-boundary for how large the UI text is allowed to grow
