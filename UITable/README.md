### `UIKit/UITable`
#### A high-performance, infinite table view.

Styling of the element will be provided via the CSS hooks:

- `.ui-table`
- `.ui-table-wrapper`
- `.ui-table-body`
- `.ui-table-row`
- `.ui-table-row-even`
- `.ui-table-row-odd`
- `.ui-table-row-loading`
- `.ui-table-cell`
- `.ui-table-header-cell`
- `.ui-table-header-cell-resize-handle`
- `.ui-table-x-scroller`
- `.ui-table-x-scroller-nub`
- `.ui-table-y-scroller`
- `.ui-table-y-scroller-nub`

<br />
##### Expected Interactions

First and foremost, it must be able to display content and remain fully interactive at 50+ FPS.

Type | Context | Expectation
---- | ------- | -----------
__scroll__ | any | move the viewfinder (should handle diagonals)

__click__ | row | call `onRowInteract` with the row object reference
__keydown__ `[Enter]` | row | call `onRowInteract` with the row object reference
__touchend__ (delta X/Y change <= 10) | row | call `onRowInteract` with the row object reference

__click__ | table cell | call `onCellInteract` with the row object reference and cell property name
__keydown__ `[Enter]` | table cell | call `onCellInteract` with the row object reference and cell property name
__touchend__ (delta X/Y change <= 10) | table cell | call `onCellInteract` with the row object reference and cell property name

__keydown__ `[Up, Down]` | table cell | move focus and apply `active` class to row

__contextmenu__ | table cell | block browser menu, launch custom menu

__dblclick__ | column header cell drag handle | recalculate column width with currently visible values & apply new sizing
__dragEnd__ | column header cell drag handle | recalculate column width with end X value & apply new sizing
__touchEnd__ | column header cell drag handle | recalculate column width with end X value & apply new sizing

<br />
##### Available `props`
- __attrs__ `Object`
    - __attrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-table-wrapper` node

- __className__ `[Array<String>|String]`
  additional CSS class(es) to be added to the rendered `.ui-table-wrapper` element

- __columns__ `Array<Object>`
    - __columns[].mapping__ `String`
      the exact name of the corresponding property in each row object

    - __columns[].resizable__ `Boolean`
      (default `true`) enables/disables drag-to-resize on the column header cell edges

    - __columns[].title__ `String`
      the label to be displayed in the cell

    - __columns[].width__ `Number`
      (default `null`) a defined initial width for all cells associated with the column

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-table-wrapper` node

- __onCellInteract__ `Function`
  invoked when a cell is interacted with

- __onRowInteract__ `Function`
  invoked when a cell in a row is interacted with

- __style__ `Object`
  inline styles to be applied to the `.ui-table-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference
