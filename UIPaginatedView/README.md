# UIPaginatedView
__View and navigate content one page at a time.__

UIPaginatedView is implemented as an encapsulated view system, accepting an array of items as input.

---

### Example Usage

```js
import {UISegmentedControl} from 'enigma-uikit';

// ...

initialState() {
    return {items: ['Alice', 'Bob', 'Charlie', 'Dale', 'Erica', 'Frank', 'Gary', 'Harold', 'Isabelle']};
}

handleItemRequest(index) {
    return this.state.items[index];
}

render() {
    if (this.state.items.length) {
        return (
            <div>
                <UIPaginatedView
                    getItem={this.handleItemRequest.bind(this)}
                    numItemsPerPage={3}
                    numPageToggles={3}
                    totalItems={this.state.items.length} />
            </div>
        );
    }
}
```
Renders:
```html
<div class="ui-paginated-view-wrapper">
  <div class="ui-paginated-view">
    <div class="ui-segmented-control ui-paginated-view-controls ui-paginated-view-controls-above">
      <button class="ui-button ui-segmented-control-option ui-paginated-view-controls-first">First</button>
      <button class="ui-button ui-segmented-control-option ui-paginated-view-controls-previous">Previous</button>
      <button selected content="1" value="1" role="radio" class="ui-button ui-segmented-control-option" >1</button>
      <button content="2" value="2" role="radio" class="ui-button ui-segmented-control-option" >2</button>
      <button content="3" value="3" role="radio" class="ui-button ui-segmented-control-option" >3</button>
      <button class="ui-button ui-segmented-control-option ui-paginated-view-controls-next">Next</button>
      <button class="ui-button ui-segmented-control-option ui-paginated-view-controls-last">Last</button>
    </div>
    <div class="ui-paginated-view-item-list">
        <div class="ui-paginated-view-item ui-paginated-view-item-even">Alice</div>
        <div class="ui-paginated-view-item ui-paginated-view-item-odd">Bob</div>
        <div class="ui-paginated-view-item ui-paginated-view-item-even">Charlie</div>
    </div>
  </div>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-paginated-view`
- `.ui-paginated-view-item-list`
- `.ui-paginated-view-item`
- `.ui-paginated-view-item-even`
- `.ui-paginated-view-item-loading`
- `.ui-paginated-view-item-odd`
- `.ui-paginated-view-controls`
- `.ui-paginated-view-controls-above`
- `.ui-paginated-view-controls-below`
- `.ui-paginated-view-controls-first`
- `.ui-paginated-view-controls-previous`
- `.ui-paginated-view-controls-next`
- `.ui-paginated-view-controls-last`
- `.ui-paginated-view-wrapper`

---

### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Mouse__ | `click` (not selected) | should trigger `onClick` on clicked control
__Keyboard__ | page toggles `['Left', 'Right']` | should move focus to next/previous toggle; should loop
__Keyboard__ | list items `['Up', 'Down']` | should move focus to next/previous toggle; should loop
__Keyboard__ | `['Enter']` | should trigger `onClick`/`onOptionSelected` for focused toggle

---

### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) is a valid prop for this element; applied to the rendered `.ui-paginated-view` node

- __jumpToFirstControlText__ `String`
  (default `'« First'`) text to be displayed inside of the "First page" control button

- __jumpToLastControlText__ `String`
  (default `'Last »'`) text to be displayed inside of the "Last page" control button

- __listWrapperProps__ `Object`
    - __listWrapperProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-paginated-view-item-list` node

- __nextPageControlText__ `String`
  (default `'Next ›'`) text to be displayed inside of the "Next page" control button

- __numItemsPerPage__ `Number`
  (default `10`) the maximum number of items to be displayed on each page

  1. `numItemsPerPage` must be a positive integer less than or equal to `totalItems`

- __pagerPosition__ `Number`
  (default `1`) the (_one-indexed_) number of the page that should be initially displayed

  1. `pagerPosition` must be a positive integer less than or equal to the total number of pages

- __position__ `UIPaginatedView.position['ABOVE'|'BELOW'|'BOTH']`
  (default: `'ABOVE'`) determines whether the pagination controls are displayed above, below, or both above and below the content

- __previousPageControlText__ `String`
  (default `'‹ Previous'`) text to be displayed inside of the "Previous page" control button

- __showJumpToFirst__ `Boolean`
  (default `true`) whether the "First page" control button should be displayed

- __showJumpToLast__ `Boolean`
  (default `true`) whether the "Last page" control button should be displayed

- __totalItems__ `Number`
  the total number of items to be displayed in the view

- __numPageToggles__ `Number`
  (default `5`) the maximum number of pages to be displayed in the control bar at one time

- __toggleWrapperProps__ `Object`
    - __toggleWrapperProps.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the UISegmentedControl node(s), `.ui-paginated-view-controls`
