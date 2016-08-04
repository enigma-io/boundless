# UIPagination
__View and navigate content one page at a time.__

UIPagination is implemented as an encapsulated view system, accepting an array of items as input.

---

### Example Usage

```jsx
import {
    UIPagination,
    UIView,
} from 'enigma-uikit';

class MyPaginatedView extends UIView {
    state = {
        items: [
            'Alice',
            'Bob',
            'Charlie',
            'Dale',
            'Erica',
            'Frank',
            'Gary',
            'Harold',
            'Isabelle',
        ],
    }

    handleItemRequest = index => this.state.items[index]

    render() {
        return (
            <UIPagination
                getItem={this.handleItemRequest}
                identifier='names'
                numItemsPerPage={3}
                numPageToggles={3}
                totalItems={this.state.items.length} />
        );
    }
}
```

Renders:

```html
<div class="ui-pagination-wrapper">
    <div class="ui-pagination">
        <div class="ui-segmented-control ui-pagination-controls ui-pagination-controls-above" aria-role="radiogroup">
            <button class="ui-button ui-segmented-control-option ui-pagination-control ui-pagination-control-first" tabindex="-1">First</button>
            <button class="ui-button ui-segmented-control-option ui-pagination-control ui-pagination-control-previous" tabindex="-1">Previous</button>
            <button role="radio" aria-checked="true" class="ui-button ui-segmented-control-option ui-pagination-control" tabindex="-1" data-page-number="1">1</button>
            <button role="radio" aria-checked="false" class="ui-button ui-segmented-control-option ui-pagination-control" tabindex="-1" data-page-number="2">2</button>
            <button role="radio" aria-checked="false" class="ui-button ui-segmented-control-option ui-pagination-control" tabindex="-1" data-page-number="3">3</button>
            <button class="ui-button ui-segmented-control-option ui-pagination-control ui-pagination-control-next" tabindex="-1">Next</button>
            <button class="ui-button ui-segmented-control-option ui-pagination-control ui-pagination-control-last" tabindex="-1">Last</button>
        </div>
        <div class="ui-pagination-items">
            <div class="ui-pagination-item ui-pagination-item-even">Alice</div>
            <div class="ui-pagination-item ui-pagination-item-odd">Bob</div>
            <div class="ui-pagination-item ui-pagination-item-even">Charlie</div>
        </div>
    </div>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-pagination`
- `.ui-pagination-items`
- `.ui-pagination-item`
- `.ui-pagination-item-even`
- `.ui-pagination-item-loading`
- `.ui-pagination-item-odd`
- `.ui-pagination-controls`
- `.ui-pagination-controls-above`
- `.ui-pagination-controls-below`
- `.ui-pagination-control`
- `.ui-pagination-control-custom`
- `.ui-pagination-control-first`
- `.ui-pagination-control-previous`
- `.ui-pagination-control-next`
- `.ui-pagination-control-last`
- `.ui-pagination-control-state`
- `.ui-pagination-wrapper`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` (not selected) | should trigger `onClick` on clicked control
__Keyboard__ | page toggles `['Left', 'Right']` | should move focus to next/previous toggle; should loop
__Keyboard__ | list items `['Up', 'Down']` | should move focus to next/previous toggle; should loop
__Keyboard__ | `['Enter']` | should trigger `onClick`/`onOptionSelected` for focused toggle

---

### Available instance methods

- __currentPage()__
  returns the ___one___-indexed page number currently in view

- __pageToIndex(`Number`)__
  renders the page that contains the ___zero___-indexed item

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-pagination` node

- __customControlContent__ `*`
  (default `undefined`) allows for arbitrary content to be rendered into the control area

- __getItem__ `Function`
  called with a desired item index when that item comes into view; accepts a `Promise` if you need to fetch the row asynchronously

- __hidePagerIfNotNeeded__ `Boolean`
  (default `false`) does not render the paging controls if the number of items supplied to the view is less-than-or-equal-to the number of items to show per page via `props.numItemsPerPage`

- __identifier__ `String`
  a unique name for the dataset being consumed; pass a different name to cause the view to fully reset and pull brand new data

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

- __pagerPosition__ `Number`
  (default `1`) the (_one-indexed_) number of the page that should be initially displayed; must be a positive integer less than or equal to the total number of pages

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
