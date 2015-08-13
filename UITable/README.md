### `UIKit/UITable`
#### A high-performance, infinite table view.
<br />

Styling of the element will be provided via the class hooks:

- `.ui-table`
- `.ui-table-wrapper`
- `.ui-table-row`
- `.ui-table-row-even`
- `.ui-table-row-odd`
- `.ui-table-row-loading`
- `.ui-table-cell`
- `.ui-table-header-cell`
- `.ui-table-header-cell-resize-handle`

<br />
##### Expected Interactions

First and foremost, it must be able to display content and remain fully interactive at 50+ FPS.

Type | Context | Expectation
---- | ------- | -----------
**scroll** | any | move the viewfinder (should handle diagonals)

**click** | row | call `onRowInteract` with the row object reference
**keydown** `[Enter]` | row | call `onRowInteract` with the row object reference
**touchend** (delta X/Y change <= 10) | row | call `onRowInteract` with the row object reference

**click** | table cell | call `onCellInteract` with the row object reference and cell property name
**keydown** `[Enter]` | table cell | call `onCellInteract` with the row object reference and cell property name
**touchend** (delta X/Y change <= 10) | table cell | call `onCellInteract` with the row object reference and cell property name

**keydown** `[Left, Right, Up, Down]` | table cell | move focus and apply `active` class to row & cell

**contextmenu** | table cell | block browser menu, launch custom menu

**dblclick** | column header cell drag handle | recalculate column width with currently visible values & apply new sizing
**dragEnd** | column header cell drag handle | recalculate column width with end X value & apply new sizing
**touchEnd** | column header cell drag handle | recalculate column width with end X value & apply new sizing

<br />
##### Required `props`

- **columns** `Array<Object>`
    - **columns[].mapping** `String`
      the exact name of the corresponding property in each row object

    - **columns[].resizable** `Boolean`
      (default `true`) enables/disables drag-to-resize on the column header cell edges

    - **columns[].title** `String`
      the label to be displayed in the cell

    - **columns[].width** `Number`
      (default `null`) a defined initial width for all cells associated with the column

<br />
##### Optional `props`

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-table` node

- **className** `[String|Array<String>]`
  additional CSS classes to be added to the rendered element

- **onCellInteract** `Function`
  invoked when a cell is interacted with

- **onRowInteract** `Function`
  invoked when a cell in a row is interacted with


<sub>A view must be functionally-accessible and whole by props alone.</sub>
