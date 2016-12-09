# UIPagination
__View and navigate content one page at a time.__

UIPagination is implemented as an encapsulated view system, accepting an array of items as input.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` (not selected) | should trigger `onClick` on clicked control
__Keyboard__ | page toggles `['Left', 'Right']` | should move focus to next/previous toggle; should loop
__Keyboard__ | list items `['Up', 'Down']` | should move focus to next/previous toggle; should loop
__Keyboard__ | `['Enter']` | should trigger `onClick`/`onOptionSelected` for focused toggle

---

### Component Instance Methods

When using `UIPagination` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __currentPage()__
  returns the ___one___-indexed page number currently in view

- __pageToIndex(`Number`)__
  renders the page that contains the ___zero___-indexed item

---

### Props

- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-pagination` node

- __after__ `*`
  (default `null`) arbitrary content to be rendered after the items in the DOM

- __before__ `*`
  (default `null`) arbitrary content to be rendered before the items in the DOM

- __customControlContent__ `*`
  (default `undefined`) allows for arbitrary content to be rendered into the control area

- __getItem__ `Function`
  called with a desired item index when that item comes into view; accepts a `Promise` if you need to fetch the row asynchronously

- __hidePagerIfNotNeeded__ `Boolean`
  (default `false`) does not render the paging controls if the number of items supplied to the view is less-than-or-equal-to the number of items to show per page via `props.numItemsPerPage`

- __identifier__ `String`
  a unique name for the dataset being consumed; pass a different name to cause the view to fully reset and pull brand new data

- __initialPage__ `Number`
  (default `1`) the (_one-indexed_) number of the page that should be initially displayed; must be a positive integer less than or equal to the total number of pages

- __itemLoadingContent__ `*`
  (default `undefined`) allows for arbitrary content to be rendered into pagination items as they're loading if the backing data is a `Promise`

- __itemToJSXConverterFunc__ `Function(item: object, index: number)`
  (default `item => item`) an optional function to specify how an item should be converted to JSX, if it is not already renderable by React

- __jumpToFirstControlContent__ `Node (any React-renderable content)`
  (default `'« First'`) content to be displayed inside of the "First page" control button

- __jumpToLastControlContent__ `Node (any React-renderable content)`
  (default `'Last »'`) content to be displayed inside of the "Last page" control button

- __listWrapperProps__ `Object`
    - __listWrapperProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-pagination-item-list` node

- __nextPageControlContent__ `Node (any React-renderable content)`
  (default `'Next ›'`) content to be displayed inside of the "Next page" control button

- __numItemsPerPage__ `Number`
  (default `10`) the maximum number of items to be displayed on each page; must be greater than zero

- __position__ `UIPagination.positions['ABOVE'|'BELOW'|'BOTH']`
  (default: `'ABOVE'`) determines whether the pagination controls are displayed above, below, or both above and below the content

- __previousPageControlContent__ `Node (any React-renderable content)`
  (default `'‹ Previous'`) content to be displayed inside of the "Previous page" control button

- __showJumpToFirst__ `Boolean`
  (default `true`) whether the "First page" control button should be displayed

- __showJumpToLast__ `Boolean`
  (default `true`) whether the "Last page" control button should be displayed

- __showPaginationState__ `Boolean|Function`
  (default `false`) renders an element called `.ui-pagination-control-state` that contains the current state of the pagination like "1 of 10"; alternatively, this prop also accepts a function that it will call with the currentPage and totalPages for you to format:

  ```jsx
  showPaginatedState={(currentPage, totalPages) => <div className='foo'>You're on page {currentPage} of {totalPages} pages!</div>}
  ```

- __totalItems__ `Number`
  the total number of items to be displayed in the view

- __numPageToggles__ `Number`
  (default `5`) the maximum number of pages to be displayed in the control bar at one time

- __toggleWrapperProps__ `Object`
    - __toggleWrapperProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the UISegmentedControl node(s), `.ui-pagination-controls`
