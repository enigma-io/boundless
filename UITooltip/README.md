### `UIKit/UITooltip`
#### A simple wrapper that displays provided text on mouseover.

Nest any React-renderable content inside the `UITooltip` wrapper as you would a simple `<div>`.

```jsx
return (
    <UITooltip text='100% relevance'>
        Margaret Drabble (8 May 2014). "Submarine dreams: Jules Verne's Twenty Thousand Leagues Under the Seas". New Statesman. Retrieved 2014-05-09.
    </UITooltip>
);
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

<br />
##### Available `props`

- __attrs__ `Object`
    - __attrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tooltip` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-tooltip` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-tooltip` node

- __style__ `Object`
  inline styles to be applied to the `.ui-tooltip` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference

- __text__ `String`
  the content to be shown in the tooltip
