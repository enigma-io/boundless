# UIFittedText
__Fit given text inside a parent container, obeying implict and explicit constraints.__

The most common use case for this class is fitting single-line text of unknown/variable length into a button or heading with finite boundaries.

```js
import {UIButton, UIFittedText} from 'enigma-uikit';

// ...

render() {
    return (
        <UIButton onClick={someFunc} style={{width: '400px'}}>
            <UIFittedText>Testing 123</UIFittedText>
        </UIButton>
    );
}
```

Renders:

```html
<button class="ui-button" style="width: 400px;">
    <span class="ui-text" style="font-size: {scalingRatio * 400}px;">Testing 123</span>
</button>
```

Styling of the element will be provided via the CSS hook:

- `.ui-text`

### Expected Interactions

There are no expected user interactions. The component emits normal text and merely changes the presentation; accessibility is not obstructed.

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-text` node

- __maxFontSize__ `Number`
  an upper-boundary for how large the UI text is allowed to grow
