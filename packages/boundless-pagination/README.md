# Pagination
__View and navigate heterogenious content one page at a time.__

Pagination is implemented as an encapsulated view system, accepting an array of items as input.

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

When using `Pagination` in your project, you may call the following methods on a rendered instance of the component. Use [`refs`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to get the instance.

- __currentPage()__
  returns the ___one___-indexed page number currently in view

- __pageToIndex(`Number`)__
  renders the page that contains the ___zero___-indexed item
