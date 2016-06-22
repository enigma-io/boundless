# UITooltip
__A simple wrapper that displays provided text on mouseover.__

Nest any React-renderable content inside the `UITooltip` wrapper as you would a simple `<div>`.

---

### Example Usage

```jsx
import {UITooltip} from 'enigma-uikit';

// ...

render() {
    return (
        <UITooltip text='100% relevance'>
            Margaret Drabble (8 May 2014). "Submarine dreams: Jules Verne's Twenty Thousand Leagues Under the Seas". New Statesman. Retrieved 2014-05-09.
        </UITooltip>
    );
}
```

Renders:

```html
<div class="ui-tooltip ui-tooltip-above">
    Margaret Drabble (8 May 2014). "Submarine dreams: Jules Verne's Twenty Thousand Leagues Under the Seas". New Statesman. Retrieved 2014-05-09.
</div>
```

Styling of the element will be provided via the CSS hooks:

- `.ui-tooltip`

Below are helper classes for each possible position:

- `.ui-tooltip-position-above`
- `.ui-tooltip-position-below`
- `.ui-tooltip-position-before`
- `.ui-tooltip-position-after`

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tooltip` node

- __position__ `UITooltip.position['ABOVE'|'BELOW'|'BEFORE'|'AFTER']` _default: `'ABOVE'`_
  determines the correct class to apply to position the tooltip

- __text__ `String`
  the content to be shown in the tooltip
