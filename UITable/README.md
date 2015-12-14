# UITable
__A high-performance, infinite table view.__

> The Platform team recommends reviewing the [Table View](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsView.html#//apple_ref/doc/uid/20000957-CH52-SW4) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `UITable` in your project.

---

### Example Usage

```js
import {UITable} from 'enigma-uikit';

const rows = [
    {first_name: 'Alex', last_name: 'Zimmerman', phone: '555-555-5555'},
];

const columns = [
    {title: 'First Name', mapping: 'first_name': resizable: true},
    {title: 'Last Name', mapping: 'last_name': resizable: true},
    {title: 'Primary Phone #', mapping: 'phone': resizable: false},
];

const rowGetter = index => rows[index];

// ...

render() {
    return (
        <UITable getRow={rowGetter}
                 totalRows={rows.length}
                 columns={columns} />
    );
}
```
renders:
```html
<div class="ui-table-wrapper" tabindex="0">
    <div class="ui-table">
        <div class="ui-table-header">
            <div class="ui-table-row ui-table-header-row">
                <div class="ui-table-cell ui-table-header-cell" style="width:75px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">First Name</span>
                    </div>
                    <div class="ui-table-header-cell-resize-handle" data-column-index="0"></div>
                </div>
                <div class="ui-table-cell ui-table-header-cell" style="width:100px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">Last Name</span>
                    </div>
                    <div class="ui-table-header-cell-resize-handle" data-column-index="1"></div>
                </div>
                <div class="ui-table-cell ui-table-header-cell" style="width:143px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">Primary Phone #</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-table-body">
            <div class="ui-table-row ui-table-row-even" style="transform:translate3d(0px, 0px, 0px);">
                <div class="ui-table-cell" title="Louise" style="width: 75px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">Alex</span>
                    </div>
                </div>
                <div class="ui-table-cell" title="Fernandez" style="width: 100px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">Zimmerman</span>
                    </div>
                </div>
                <div class="ui-table-cell" title="6-(697)972-8601" style="width: 143px;">
                    <div class="ui-table-cell-inner">
                        <span class="ui-table-cell-inner-text">555-555-5555</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-offscreen" aria-live="polite"></div>
    <div>
        <div class="ui-table-x-scroller">
            <div class="ui-table-x-scroller-nub" style="width: 947px;"></div>
        </div>
        <div class="ui-table-y-scroller">
            <div class="ui-table-y-scroller-nub" style="height: 12px;"></div>
        </div>
    </div>
</div>
```

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

---

### Expected Interactions

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

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-table-wrapper` node

- __columns__ `Array<Object>`
    - __columns[].mapping__ `String`
      the exact name of the corresponding property in each row object

    - __columns[].resizable__ `Boolean`
      (default `true`) enables/disables drag-to-resize on the column header cell edges

    - __columns[].title__ `String`
      the label to be displayed in the cell

    - __columns[].width__ `Number`
      (default `null`) a defined initial width for all cells associated with the column

- __getRow__ `Function`
  called with a desired item index when that row number will come into view, accepts a `Promise` if you need to fetch the row asynchronously

- __offscreenClass__ `String`
  (default `.ui-offscreen`) provide a custom class for hiding elements if desired (must not use `display: none`)

- __onCellInteract__ `Function`
  invoked when a cell is interacted with

- __onRowInteract__ `Function`
  invoked when a cell in a row is interacted with

- __name__ `String`
  a unique name for the dataset being consumed; pass a different name to cause the table to fully reset and pull brand new data

- __totalRows__ `Number`
  the total length of the data set, necessary for smart scrollbar calculations

---

### Note

A few events like `onWheel`, `onMouseMove` and `onMouseUp` are very performance intensive for this component and are _not_ proxied for external use. It's recommended to not listen for your own events at all for UITable and instead rely on the callback function interfaces provided via `props`.
