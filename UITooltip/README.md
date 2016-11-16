# UITooltip
__A simple wrapper that displays provided text on mouseover.__

Nest any React-renderable content inside the `UITooltip` wrapper as you would a simple `<div>`.

---

### Available `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-tooltip` node

- __position__ `UITooltip.position['ABOVE'|'BELOW'|'BEFORE'|'AFTER']` _default: `'ABOVE'`_
  determines the correct class to apply to position the tooltip

- __text__ `String`
  the content to be shown in the tooltip
