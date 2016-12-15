# boundless-table

__A high-performance, infinite table view.__


1. [installation](#installation)
1. [non-react usage](#non-react-usage)
    1. [imperative methods](#imperative-methods)
1. [react usage](#react-usage)
    1. [example](#example)
    1. [interactions](#interactions)
    1. [calling `Table` imperative methods](#calling-underlying-table-methods)
    1. [developer note](#developer-note)


## installation

`boundless-table` can be used directly by including it as a dependency in your JS project:

```bash
npm i --save boundless-table
```

## non-react usage

1. Create the necessary HTML in your base page. `Table` requires the following DOM structure:

    ```html
    <div class="ui-table-wrapper" tabindex="0">
        <div class="ui-table-header"></div>
        <div class="ui-table-body"></div>
        <div class="ui-table-x-scroll-track">
            <div class="ui-table-x-scroll-handle"></div>
        </div>
        <div class="ui-table-y-scroll-track">
            <div class="ui-table-y-scroll-handle"></div>
        </div>
        <div class="ui-offscreen" aria-live="polite" />
    </div>
    ```

1. Require `Table` in your JS file:
    ```js
    import Table from 'boundless-table';
    ```

1. Devise a method of supplying individual rows to `Table` via a callback function. Here's an extremely simple example:
    ```js
    const rows = require('./row-fixture.json');
    const getRow = (index) => rows[index];
    ```

1. Create column definition objects describing the shape of the row data.

    The definitions should adhere to this typed shape:
    ```js
    {
        cellChangeFunc: function,               // called with the signature (element, value) after the cell
                                                   content is changed
        title: string,                          // the text to be shown in the header cell
        mapping: string,                        // if rows are given in object form, the key to match a column against
        resizable: boolean,                     // is the user allowed to drag the header cell to resize it?
        width: number?,                         // (optional) should the column default to a certain size?
        children: object?|string?|object[]?,    // (optional) would you like to inject extra HTML into the header cell?
    }
    ```

    If `children` is passed an object or array of objects, each one must conform to the following shape:

    ```js
    {
        tag: string,                            // the type of element tag to generate (e.g. 'div')
        attributes: object?,                    // (optional) anything settable by `element.setAttribute()` (e.g. data attributes)
        children: string?|object?|object[]?,    // (optional) deeper children
        *: any?,                                // (optional) any other DOM element properties settable by direct allocation
                                                              (e.g. events like onclick = fn(), className = 'foo', style)
    }
    ```

    Here is a fully-formed example, showing some of the possible configurations:

    ```js
    const columns = [{
        children: [{
            tag: 'div',
            attributes: {'data-foo': 'bar'},
            className: 'extra-spooky-column',
            onclick: (e) => {
                e.stopImmediatePropagation();
                alert('boo!');
            },
            children: '👻',
        }, {
            tag: 'div',
            attributes: {'data-foo': 'baz'},
            className: 'extra-unusual-column',
            onclick: (e) => {
                e.stopImmediatePropagation();
                alert('squark!');
            },
            children: '👽',
        }],
        title: 'ID',
        mapping: 'id',
        resizable: true,
    }, {
        title: 'First Name',
        mapping: 'first_name',
        resizable: true,
    }, {
        title: 'Last Name',
        mapping: 'last_name',
        resizable: true,
    }, {
        title: 'Job Title',
        mapping: 'job_title',
        resizable: true,
    }, {
        title: 'Phone',
        mapping: 'phone',
        resizable: false,
    }, {
        title: 'Email Address',
        mapping: 'email',
        resizable: true,
    }, {
        title: 'Street Address',
        mapping: 'address1',
        resizable: true,
    }, {
        title: 'City',
        mapping: 'city',
        resizable: true,
    }, {
        title: 'Country',
        mapping: 'country',
        resizable: true,
    }, {
        title: 'Country Code',
        mapping: 'country_code',
        resizable: true,
    }];
    ```

1. Feed the above items into the `Table` constructor, along with any additional configuration options.

    **Required configuration properties:**

    - __columns__ `Array<Object>`<br />
      (see spec above)

    - __getRow__ `Function`<br />
      called with a desired item index when that row number will come into view, accepts a `Promise` if you need to fetch the row asynchronously

    - __totalRows__ `Number`<br />
      the total length of the data set, necessary for smart scrollbar calculations

    - __aria__: `HTMLElement`
    - __body__: `HTMLElement`
    - __header__: `HTMLElement`
    - __wrapper__: `HTMLElement`
    - __x-scroll-handle__: `HTMLElement`
    - __x-scroll-track__: `HTMLElement`
    - __y-scroll-handle__: `HTMLElement`
    - __y-scroll-track__: `HTMLElement`

    **Optional configuration properties:**

    - __allowScrollPropagation__ `Boolean`<br />
      (default `false`) allows wheel events captured by the table component to propagate into scroll events and potentially move the page around it; this could be disorienting, use with caution

    - __fitColumnsToTableWidth__ `Boolean`<br />
      (default `false`) automatically try to exactly fit the columns to the available space, respecting detected min/max column widths

    - __offscreenClass__ `String`<br />
      (default `ui-offscreen`) provide a custom class for hiding elements if desired (must not use `display: none`)

    - __preserveScrollState__ `Boolean`<br />
      (default `true`) prompts the table view to remember the row numbers, X and Y coordinates when regenerating and attempt to restore them

    - __throttleInterval__ `Number`<br />
      (default `300`) the time in milliseconds to pause row fetching during a fast drag operation on the scroll handles

    **Available event callbacks:**

    - __activeRowChangedFunc__ `Function(activeRowIndex: number|undefined)`<br />
      invoked when the table's active row is changed via arrow key, programmatically, etc.

    - __cellClickFunc__ `Function(event: object, rowIndex: number, columnMapping: string)`<br />
      invoked when a cell is interacted with

    - __columnResizeFunc__ `Function(columnMapping: string, width: number)`<br />
      invoked when a column has been resized by the user

    - __headerColumnClickFunc__ `Function(event: object, columnMapping: string)`<br />
      invoked when a column header cell has been clicked

    - __rowChangeFunc__ `Function(element: HTMLElement, value: object|array)`<br />
      invoked after a row's content has changed; extra customizations can be performed to the row, but be forewarned that it can have performance
      implications

    - __rowClickFunc__ `Function(event: object, index: number)`<br />
      invoked when a cell in a row is clicked


    **Example:**

    ```js
    const table = new Table({
        getRow,
        columns,
        preserveScrollState: true,
        throttleInterval: 200,
        totalRows: rows.length,

        wrapper: document.querySelector('.ui-table-wrapper'),
        header: document.querySelector('.ui-table-header'),
        body: document.querySelector('.ui-table-body'),
        aria: document.querySelector('.ui-offscreen'),
        'x-scroll-track': document.querySelector('.ui-table-x-scroll-track'),
        'y-scroll-track': document.querySelector('.ui-table-y-scroll-track'),
        'x-scroll-handle': document.querySelector('.ui-table-x-scroll-handle'),
        'y-scroll-handle': document.querySelector('.ui-table-y-scroll-handle'),
    });
    ```

A fully-loaded example of the above can be found in the [demo JS file](./src/demo/index.js) and [demo HTML page](./src/static/index.html).


### imperative methods

A formal API for the non-React table base class has not yet been established, but if you want to take advantage of some lightly-documented functionality, here are some things you can programmatically do:

- `table.jumpToRowIndex(number)` - programmatically scrolls the table to the appropriate row index

- `table.regenerate()` - full rebuild of the table, useful if you suspect there's old data lingering around for debugging purposes

- `table.resetActiveRow()` - clears active status on all rows


## react usage

`ReactTable` is a simple wrapper around `Table` that performs diffing logic when props change to avoid unnecessary "regeneration" cycles. Note that a regeneration cycle
actually blows away all the rows and recreates them, so it's a fairly heavy operation -- hence the desire to minimize it.

Some configuration props (options) are renamed in `ReactTable` to better fit with React community idioms.

> Enigma recommends reviewing the [Table View](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsView.html#//apple_ref/doc/uid/20000957-CH52-SW4) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `ReactTable` in your project.


### example

```jsx
import ReactTable from 'boundless-table/es5/react';

const rows = [{
    first_name: 'Alex',
    last_name: 'Zimmerman',
    phone: '555-555-5555',
}];

const columns = [
    {title: 'First Name', mapping: 'first_name': resizable: true},
    {title: 'Last Name', mapping: 'last_name': resizable: true},
    {title: 'Primary Phone #', mapping: 'phone': resizable: false},
];

const rowGetter = (index) => rows[index];

// ...

render() {
    return (
        <ReactTable
            identifier='foo'
            getRow={rowGetter}
            totalRows={rows.length}
            columns={columns} />
    );
}
```

renders:

```html
<div class="ui-table-wrapper" tabindex="0" data-set-identifier="foo">
    <div class="ui-table-header">
        <div class="ui-table-row ui-table-header-row">
            <div class="ui-table-cell ui-table-cell-even ui-table-header-cell" title="First Name" style="width:75px;">
                <div class="ui-table-cell-inner">First Name</div>
                <div class="ui-table-header-cell-resize-handle" data-column-index="0"></div>
            </div>
            <div class="ui-table-cell ui-table-cell-odd ui-table-header-cell" title="Last Name" style="width:100px;">
                <div class="ui-table-cell-inner">Last Name</div>
                <div class="ui-table-header-cell-resize-handle" data-column-index="1"></div>
            </div>
            <div class="ui-table-cell ui-table-cell-even ui-table-header-cell" title="Primary Phone #" style="width:143px;">
                <div class="ui-table-cell-inner">Primary Phone #</div>
            </div>
        </div>
    </div>
    <div class="ui-table-body">
        <div class="ui-table-row ui-table-row-even" style="transform:translate3d(0px, 0px, 0px);">
            <div class="ui-table-cell ui-table-cell-even" style="width: 75px;">
                <div class="ui-table-cell-inner">Alex</div>
            </div>
            <div class="ui-table-cell ui-table-cell-odd" style="width: 100px;">
                <div class="ui-table-cell-inner">Zimmerman</div>
            </div>
            <div class="ui-table-cell ui-table-cell-even" style="width: 143px;">
                <div class="ui-table-cell-inner">555-555-5555</div>
            </div>
        </div>
    </div>
    <div class="ui-offscreen" aria-live="polite"></div>
    <div>
        <div class="ui-table-x-scroll-track">
            <div class="ui-table-x-scroll-handle" style="width: 947px;"></div>
        </div>
        <div class="ui-table-y-scroll-track">
            <div class="ui-table-y-scroll-handle" style="height: 12px;"></div>
        </div>
    </div>
</div>
```

__NOTE: ReactTable also accepts rows in pure array form, without the mappings. However, take care to ensure that the row fields will come in the exact order of how the columns are ordered to avoid mismatching.__

```js
const rows = [
    ['Alex', 'Zimmerman', '555-555-5555'],
    ['Simone', 'Broadwell', '444-444-4444'],
];
```

Styling of the element will be provided via the CSS hooks:

- `.ui-table-wrapper`
- `.ui-table-body`
- `.ui-table-row`
- `.ui-table-row-even`
- `.ui-table-row-odd`
- `.ui-table-row-loading`
- `.ui-table-cell`
- `.ui-table-cell-even`
- `.ui-table-cell-odd`
- `.ui-table-header-cell`
- `.ui-table-header-cell-resize-handle`
- `.ui-table-x-scroll-track`
- `.ui-table-x-scroll-handle`
- `.ui-table-y-scroll-track`
- `.ui-table-y-scroll-handle`


### interactions

First and foremost, it must be able to display content and remain fully interactive at 50+ FPS.

Type | Context | Expectation- | ------- | -----------
__scroll__ | any | move the viewfinder (should handle diagonals)
__click__ | row | call `onRowInteract` with the row object reference
__keydown__ `[Enter]` | row | call `onRowInteract` with the row object reference
__click__ | table cell | call `onCellInteract` with the row object reference and cell property name
__keydown__ `[Enter]` | table cell | call `onCellInteract` with the row object reference and cell property name
__keydown__ `[Up, Down]` | table cell | move focus and apply `active` class to row
__drag__ | column header cell resize handle | recalculate column width with end X value & apply new sizing
__dblclick__ | column header cell resize handle | automatically resize the column cells to fit the longest rendered content
__resize__ | window | recompute scrollbar sizing; if the height of the table changes, rebuild it


### available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-table-wrapper` node

- __allowScrollPropagation__ `Boolean`<br />
  (default `false`) allows wheel events captured by the table component to propagate into scroll events and potentially move the page around it; this could be disorienting, use with caution

- __columns__ `Array<Object>`<br />
    - __columns[].cellChangeFunc__ `Function(cellElement: HTMLElement, content: string)`<br />
      invoked when a cell has been set with new content

    - __columns[].children__ `*`<br />
      content to be generated and injected alongside the column title; if you wish to inject customized DOM content, provide an object or array of objects conforming to the following spec:

      ```js
      {
        // (any valid DOM `tagName` that could be used in `document.createElement`, e.g. `'div'`)
        tag: string,

        // (optional) HTML attributes to be set via `HTMLElement.setAttribute`
        attributes: object,

        // (optional) more children conforming to the same spec
        children: *,

        // (optional) properties that are settable by simple allocation,
        // e.g. `className: 'foo'` or `onclick: function(e) { console.log('clicked!') }`
        [anyValidPropertyName]: *,
      }
      ```

      Where `tag` is any valid DOM `tagName` that could be used in `document.createElement`

    - __columns[].mapping__ `String`<br />
      the exact name of the corresponding property in each row object

    - __columns[].resizable__ `Boolean`<br />
      (default `true`) enables/disables drag-to-resize on the column header cell edges

    - __columns[].title__ `String`<br />
      the label to be displayed in the cell

    - __columns[].width__ `Number`<br />
      (default `null`) a defined initial width for all cells associated with the column

- __fitColumnsToTableWidth__ `Boolean`<br />
  (default `false`) automatically try to exactly fit the columns to the available space, respecting detected min/max column widths

- __getRow__ `Function`<br />
  called with a desired item index when that row number will come into view, accepts a `Promise` if you need to fetch the row asynchronously

- __identifier__ `String`<br />
  a unique name for the dataset being consumed; pass a different name to cause the table to fully reset and pull brand new data

- __jumpToRowIndex__ `Number`<br />
  fast-forwards scrolling within the table to the specified row index (zero-based) and sets it as the active row

- __offscreenClass__ `String`<br />
  (default `.ui-offscreen`) provide a custom class for hiding elements if desired (must not use `display: none`)

- __onActiveRowChanged__ `Function(activeRowIndex: number|undefined)`<br />
  invoked when the table's active row is changed via arrow key, programmatically, etc.

- __onCellInteract__ `Function(event: object, rowIndex: number, columnMapping: string)`<br />
  invoked when a cell is interacted with

- __onColumnResize__ `Function(columnMapping: string, width: number)`<br />
  invoked when a column has been resized by the user

- __onHeaderCellInteract__ `Function(event: object, columnMapping: string)`<br />
  invoked when a column header cell has been clicked

- __onRowChanged__ `Function(rowElement: HTMLElement, row: array|object)`<br />
  invoked when a row has been set with new data; if the new data is an unresolved promise, this callback is deferred until the promise resolves

- __onRowInteract__ `Function(event: object, index: number)`<br />
  invoked when a cell in a row is clicked

- __preserveScrollState__ `Boolean`<br />
  (default `true`) prompts the table view to remember the row numbers, X and Y coordinates when regenerating and attempt to restore them

- __throttleInterval__ `Number`<br />
  (default `300`) the time in milliseconds to pause row fetching during a fast drag operation on the scroll handles

- __totalRows__ `Number`<br />
  the total length of the data set, necessary for smart scrollbar calculations


### calling `Table` imperative methods

Every imperative method that is available under the *general usage* section above is also accessible in the React wrapper via `ref`.

```jsx
class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.refs.tableview.table.resetActiveRow()}>
                    Click me to clear the active row!
                </button>

                <ReactTable ref='tableview' /* required props */ />
            </div>
        );
    }
}
```


### developer note

A few events like `onWheel`, `onMouseMove` and `onMouseUp` are very performance intensive for this component and are _not_ proxied for external use. It's recommended to not listen for your own events at all for ReactTable and instead rely on the callback function interfaces provided via `props`.


### TODO

Rewrite ReactTable demo not to require UIKit.
