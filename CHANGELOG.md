# UIKit Changelog

---

## 1.0.1 (9/1/2016)

- (c546014) Update Jest to 15.x
- (412eda8) UIDialog: don't call props.onClose if unmounted
- (e5664be) UIPopover: fix className being added in the wrong spot

---

## 1.0.0 (8/29/2016)

### Breaking Changes

__React >= 15.3 is now a requirement.__

There are a lot of goodies in the more recent React versions, including `React.PureComponent` (we're using it heavily for optimization purposes).


__UIView is no more.__

In short, it serves no purpose with the advent of `React.PureComponent`. We get the same shallow checking for free within React and it happens in a more performant way.


__UIPagination prop change: `pagerPosition` -> `initialPage`__

There used to be a "controlled-mode" to this component, but that was removed due to being unintuitive. `initialPage` now functions more akin to `defaultValue`. Switching the page programmatically is possible via the method `pageToIndex(number)`.


__UITokenizedInput prop change: `showTokenClose` -> `tokenCloseVisible`__

Stylistic change to better group all the related token props visually and thematically.



### What's new?


__UIPopover is now simpler to use, with a more intelligent caret.__

There are a variety of changes in here that all contribute to a more stable positioning algorithm.

1. There are now 4 simple presets that cover the most common popover use cases (ABOVE, BELOW, LEFT, RIGHT).

2. The positioning classes are now appended to the dialog wrapper

3. `.ui-popover` is now applied to the dialog wrapper instead of the dialog itself

4. Using an SVG caret with individually-themeable stroke and fill colors to make it easier to match themes. Can also swap it out
   with a different component if desired.

5. The caret now is centered on the anchor, rather than being arbitrarily placed via CSS


__Several UITextualInput / UITypeaheadInput controlled-mode bugfixes.__

That annoying warning about `setValue()` is also gone now.


__`enigma-table` is now at version 1.4.__

You can see the release notes for [version 1.2](https://github.com/bibliotech/table/releases/tag/1.2.0), [version 1.3](https://github.com/bibliotech/table/releases/tag/1.3.0) and [version 1.4](https://github.com/bibliotech/table/releases/tag/1.4.0). The biggest sexy change is that table will automatically scale up column widths if extra room is detected so there isn't dead space on the right side of the screen for very narrow tables.


__We're no longer auto-persisting React events.__

This means our components are now more performant by default due to not keeping event objects around longer than they need to be (React auto-reuses them.) You can still call `event.persist()` to keep them around for your needs, we just aren't doing it for you anymore.


__You can customize the close button in UITokenizedInput tokens now.__

Via the new `tokenCloseComponent` prop.


__UIPagination bugfixes and new props.__

1. the component is now much smarter about keeping the "significant index" in view when re-rendering due to layout changes; the
   "significant index" is either the last one paged-to via `pageToIndex(number)` or the first visible item after pressing a forward/back control

2. `itemLoadingContent` was introduced for customizing the content shown while waiting for an item promise to resolve

3. `index` is now provided as a second argument to `itemToJSXConverterFunc`

4. `customControlContent` was introduced to allow for arbitrary content to be injected into the pagination control area

5. `showPaginationState` was introduced to toggle rendering of a new addition to the pagination control area: the pagination state
   (in "1 of 10" format); a callback function can also be passed to allow for custom text or math


### Relevant commits

- (ae3e5e0) Refactor UIPopover's caret mechanism, add simple presets (#289)
- (0c19117) RF: fix the same change handler going to both demo examples
- (b4071ee) Light refactor on UITextualInput
- (9cf5a2b) UITextualInput: trigger change event for programmatic value setting
- (ac4473c) UITypeaheadInput: fix more controlled bugs & add regression tests
- (9ee4de6) UITypeaheadInput: fix match computation in controlled mode
- (310d73c) UITable: onHeaderCellInteract, custom injected header cell content support
- (b5c605a) [Breaking Change] UIView removed, bump min React version, general cleanup (#286)
- (3684938) Revert UITable test change to set a baseline width for everything
- (22cbe56) UITable: fix column width comparison for initially undefined values
- (3c518ec) Update to enigma-table 1.3
- (2c6c492) Stop ignoring files for now
- (565d824) Don't ignore the main exports file for ES6 mode
- (e62fad5) Add more string fallbacks where input could end up undefined
- (f39f8bd) UITypeaheadInput: Add a fallback empty string for setValue (#282)
- (8416eae) [Behavioral Change] Stop persisting events, pass the onComplete event as second arg (#281)
- (7e25861) Add `module` package.json property
- (0dab49e) [Breaking Change] UITokenizedInput prop changes
- (98dd9c3) UIPagination: switch cWRP to use transactional setState()
- (7f06bd7) [Breaking Change] Rename pagerPosition -> initialPage, refactor UIPagination algo
- (8212fbd) Update React deps
- (46ba309) UIPagination: attempt to keep leading index in view
- (7e4bc21) UIPagination item: re-render more eagerly, new prop
- (70640ae) Fix tests after Jest 14 changes
- (e9f05f8) UIPagination:itemToJSXConverterFunc: inject index as the second argument
- (1cdeb9c) UITable: fix a bug in the column change detection logic
- (a6e3e0d) UIPagination: new prop customControlContent
- (1d0920b) UIPagination: new prop showPaginationState
- (4942555) Fix linting issue
- (74a684f) Update docs
- (3ba1cd0) Update tests
- (28fa046) Add pageToIndex method to jump to page of specific item
- (dab092d) Make component minimally stateful Allows for more granular layout and control changes via props
- (98fd21f) Ensure separate stubs are calledOnce
- (f2c2113) Remove whitespace
- (caad4bd) Update tests
- (91a6686) Update docs
- (d7dab33) [Breaking Change] Allow paging controls to accept any renderable content, rename props
- (2032bc8) Ensure no children render before parent mounts
- (636057a) Separate implicit JSX conversion in getItem into own prop
- (d07f99d) Fix to uuid util func
- (7ca8afa) Round alignment coordinates to prevent WebKit blurring issue
- (16f33b5) Update to enigma-table 1.2.0
- (67bafc4) Expose extractChildProps as a UIKit utility
- (1c65b8e) Isolate uuid() into its own utility
- (2142e51) UITypeaheadInput: controlled change should not cause a setState
- (f170bcc) UITextualInput: controlled onChange should not update `state.input`
- (c9f7ebd) UITextualInput: add "controlled" demo, remove onInput sampling
- (0049053) UITokenizedInput: clear token selection when clicking on the input
- (73c5ba7) UITokenizedInput: stop click bubbling for the close button


---

## 1.0.0-beta-18 (7/7/2016)
### Breaking Changes

__`UICheckbox` and `UICheckboxGroup`'s select all input now require use of `inputProps`__

Previously `UICheckbox` allowed various things like `value` and `name` to be passed at the top level, but this has been removed in favor of always passing input-specific props via `props.inputProps`.

This follows the change [introduced in beta 15](https://github.com/bibliotech/uikit/releases/tag/1.0.0-beta-15) for `UITextualInput`.

### Relevant commits

- __Modify components to not apply custom props to JSX elements__ (4c2dd69)

  This piggybacks off a change in React 15.2, where they now warn if garbage is being fed into JSX elements (what will become actual DOM) that doesn't correlate with a real DOM attribute.

  The eventual React plan is to allow everything through to the DOM without maintaining a map of which attributes are legal for each DOM node type, so this is an interim measure to catch and fix those occurrences.

- __UITable: remove static mode__ (1421169) It was [removed in bibliotech/table in 1.1.0](https://github.com/bibliotech/table/commit/45c7a7e346bcc0b19a2f4d2e46f718a1fab8d761)

- __[Breaking Change] UICheckboxGroup selectAllLabel -> selectAllProps.label__ (039d5e2)
- __[Breaking Change] UICheckbox refactor to remove top-level props__ (79003b4)

  Similar to what was done with `UITextualInput` in a previous beta, input-specific props must now be passed through `inputProps` or they will not be recognized.

  Also now watching for `disabled` to prevent the event handlers from firing when inappropriate.

  Applied the changes to the other places it's used.

- __UIButton: don't fire onPressed if the button is disabled__ (33b67f0) Closes #256

### Misc

- __Clean up UICheckboxGroup test language__ (bf12458)
- __Bump the version (oops)__ (93b9e56)
- __Revise UIButton test language__ (3af6bbc)
- __Update to enigma-table 1.1.0, remove layout boundaries in UITable__ (9bf2a15)
- __Tweak site styling__ (a63049c)


---

## 1.0.0-beta-17 (7/5/2016)

- __Update to `enigma-table@1.0.4`__ -- no actual changes, just a PATCH version bump to pull in a missed commit that didn't make it into `enigma-table@1.0.3` but appeared in the CHANGELOG

---

## 1.0.0-beta-16 (6/30/2016)

- __UIDialog: make focus boundaries hidden to screen readers__ (4a4691d)
- __UIDialog: implement props.closeOnOutsideScroll (#254)__ (5df8d90)

  This is mostly aimed at UIPopover and contexts where scrolling may move a fixed or absolutely-positioned element away from its anchor in an undesirable way.

  * UIPopover: dismiss by default on outside scroll
  * UIDialog: add defaults to boolean props, handle focus boundaries

    Pulled the boundaries out of UIModal, because that component isn't who actually manages the functionality of `props.captureFocus`. Also
    cleaned up the UIDialog tests.


- __Refactor UIPopover's internal caching mechanism__ (96e754c)
- __UIModal: inject into `<body>` rather than locally__ (6e2b6dd) This follows the same pattern as UIPopover, such that a modal can truly sit atop all other content.
- __Refactor conformance checker to not use refs__ (f5e6213)
- __Remove the auth token to pull down enigma-table__ (2fa4df5) Our CI now has the proper keys to not require this.
- __Remove things that should be gitignored__ (2509a7c)
- __Update README__ (76add2b)

---

## 1.0.0-beta-15 (6/23/2016)

### Breaking Changes

__Prop interface adjustments to `UITextualInput`, `UITypeaheadInput`, and `UITokenizedInput`.__

It used to be that you could optionally pass certain props to `UITextualInput` and compositions above it like `value`, `name`, etc, but this ended up being confusing. Now the only place to pass props to the text input at the root of all these components is `inputProps`.

For instance:

```jsx
<UITextualInput
    inputProps={{
        defaultValue: 'foo',
        placeholder: 'bar',
    }} />
```

__Prop interface change to `algorithm` in `UITypeaheadInput`__

`algorithm.matchFunc` -> `algorithm.matcher`
`algorithm.markFunc` -> `algorithm.marker`

Previously, if you wanted to implement only one piece of the matching & marking algorithm, you'd have to copy over or reimplement the complementing function to complete the functionality. For example, if you passed:

```jsx
<UITypeaheadInput
    algorithm={{
        matcher: myMatchingFunction,
    }}
```

...and omitted the `marker`, the component would opaquely use the stored default `marker` function and not allow any further tweaking. This is no longer the case, and now `matcher` and `marker` also accept the typeahead operation modes `UITypeahead.mode.STARTS_WITH` and `UITypeahead.mode.FUZZY` to be able to pick a desired built-in function.

```jsx
<UITypeaheadInput
    algorithm={{
        matcher: myMatchingFunction,
        marker: UITypeahead.mode.STARTS_WITH,
    }}
```

__UIPaginatedView was renamed to `UIPagination`.__

This revised name better fits with the other components. The CSS class hooks were adjusted to `.ui-pagination-*` and the stylus variables changed, too.



### Highlights

__"Fuzzy" mode is now the default in `UITypeaheadInput`.__

Starts-with matching is too simple for most use cases, so it was decided that fuzzy matching & marking of entities would be the default going forward. If you've already specified a `props.algorithm` in your usage of the component, no change is required.


__`hidePlaceholderOnFocus` is now turned on by default in `UITextualInput`.__

This behavior change smooths-over the differences between browsers when clicking a text input field and starting to type; there's a discrepancy between Internet Explorer and other browsers for at what point the placeholder is meant to disappear. Now the placeholder will always be dismissed as soon as a user click into the field in every browser.


### Relevant Commits

- __Rename styl variables missed in the UIPagination renaming commit__ (ad4c21b)

- __[Breaking Change] UITypeaheadInput: FUZZY now default, prop changes__ (740d79a)

  The `props.algorithm` interface changed slightly, from markFunc -> marker and matchFunc -> matcher. You can also now provide a constant for the object property you're not overriding to avoid having to copy over a function from the original implementation.

  So now you can do something like this:

  ```
  algorithm={{
    marker: myMarkerFunction,
    matcher: UITypeaheadInput.mode.FUZZY,
  }}
  ```

- __[Breaking Change] UIPaginatedView -> UIPagination, new prop, misc fixes (#250)__ (41a057c)
  + the CSS classes have been changed to reflect the new component naming (.ui-paginated-view-* -> .ui-pagination-*)

  + added [data-page-number] to the pager controls
  + added [data-index] to the paginated items

  + fixed half the loader being missing

  + UISegmentedControl: fix prop leak onto the DOM nodes, aria attribute

  * UIPagination: implement `props.hidePagerIfNotNeeded`

  Does not render the paging controls if the number of items
  supplied to the view is less-than-or-equal-to the number of items
  to show per page via `props.numItemsPerPage`.

  * UIPagination: allow a higher numItemsPerPage than totalItems

  This can come up when switching out the underlying data source,
  but wanting to maintain consistency in the number of items
  displayed without thrashing the view.

- __UITokenizedInput: fix README example to be more complete__ (1378820)

- __[Breaking Change] Refactor prop interface to follow UITypeaheadInput__ (15a84da)

  Also made dedicated aliases to UITypeaheadInput instance methods to eliminate the need to dive through the ref tree and do dirty work.

  Added documentation & cleaned up the tests.

- __[Breaking Change] Refactor prop interface to follow UITextualInput__ (0874c8c)

  See 05ccfffb38f55c76d0df570d9cbd5ce8c504991d for more information.

  Also documented a few instance methods for programmatic manipulation of `UITypeaheadInput` and cleaned up the tests.

- __[Breaking Change] Revise UITextualInput prop interface__ (3f05d74)

  Previously you could pass in certain input props as naked props, e.g. `type` but passing them in as `inputProps.type` was also supported--in retrospect, that's super confusing.


### Misc

- __Fix gitignore__ (cae10e8)
- __Fix syntax highlighting of JSX in the READMEs__ (1647893)
- __Remove Travis CI-related things (#247)__ (1ad62a9)
- __Add oauth token__ (89641a3)
- __Caught a few more instances of dist/__ (4f48ec5)
- __Rename dist -> public, rebuild targets__ (eeefb1a)
- __Update enigma-table to 1.0.3 (#243)__ (ea09392) See https://github.com/bibliotech/table/releases/tag/1.0.3 for more info.

---

## 1.0.0-beta-14 (6/9/2016)

No breaking changes.

### Highlights

__Co-branding__

It's now possible to modify the UIKit styles without writing CSS overrides. [Check out the README](https://github.com/bibliotech/uikit#branding-uikit) to learn how this works.

__UITable improvements / migration__

Performance is up across the board and a few new [programmatic methods](./UITable#underlying-table-methods-caution-thar-be-dragons) have been added. The base table implementation has been moved into [its own repository](https://github.com/bibliotech/table) for faster development and more experimentation without affecting UIKit.

__UITextualInput__

A new component with polyfilled, configurable placeholder support. It has taken the place of text inputs in other components, like UITypeaheadInput.

### On the horizon...

Work has been started to do a fairly substantial rewrite of the base table implementation, using native scrollable DOM zones. This is important because it gives kinetic scrolling on touch devices for free and generally will be much more performant. The tradeoff is the synthetic scrollbars go away, so we lose the ability to style them in non-Webkit browsers.

UIKit will also be getting an infusion of new layout components when the Tolleson branding exercise is complete. They will directly align with Design's "sticker sheet" and make it extremely simple to have your entire webapp be Enigma-branded, with appropriate styling. UIKit will, in effect, be the living Enigma visual style guide. We will also provide reference HTML & styles for layout components if your project isn't thick enough to need React.

### Relevant Commits

- __UITextualInput placeholder adjustments (#235)__ (1f7f5d9) Otherwise it will leak out of the input area and obviously not look like a true placeholder.
- __UIDialog: rewrite the `onClose` prop description (#237)__ (60cfd82) The intended purpose was not clearly - articulated.
- __UITable: remove perspective CSS property (#232)__ (6a7e353) It causes all the text to become blurred in Safari.
- __UITable: fix x-axis scrolling issue when cached pageX is not set (#229)__ (9e00254) When fully scrolled to the right and resizing the screen (making the table larger) the viewport should now automatically keep pace with the right edge so it doesn't break the scrolling.
- __UITable: row deselection support, down arrow behaviorial change__ (fa31483) The table will now automatically - attempt to make the topmost visible row the active row if no row has been previously made active.
    - added a blurb to the README on some programmatic, but unstable methods that can be used for Tableview
- __UITable: add odd and even classes to the cells__ (94ef9e2) This should improve scrolling performance, as using :nth-child() selectors on things that change often is hideously expensive. Also removed some unnecessary styles.
- __UITable: don't render cell title (perf), remove unnecessary div__ (96cb6f7) The .ui-table div isn't needed, and - I don't recall why it was added. Removing it had no noticeable effect.
- __UITable: support array-form rows__ (8e833ab) This has the advantage of a more compact payload, but extra care must be taken to ensure the column ordering exactly mirrors that of the rows.
- __Various component behaviorial changes (#212)__ (1d7ea10) * UIPopover: close on esc key and outside click by default
- __UITable: persist the column width changes to the backing data (#211)__ (b92dd56) Now that our external wrapper is smarter, the columns don't get passed down for a regeneration cycle, so the TableView needs to update itself.
- __UITable: add static mode__ (488a976) This is purposely not going to be advertised in the docs, but exists to support the table preview functionality in the current Explore query search.
- __UITable: implement column resize callback, improve regen logic__ (76bab70)
- __UITable: preserve active row selection__ (14d0414) It will no longer reset on window resize or between dataset source changes unless the previous active index now exceeds the new total amount of available rows.
- __UITable: implement .ui-table-row[data-index]__ (0b58970) To allow granular styling for specific rows, since DOM - order can't be guaranteed.
- __UITypeaheadInput: support "controlled" inputs__ (dd53a1e)
- __UITextualInput: value(string) method__ (f4b4d94) For programmatic setting of the input field value. This needs to exist because directly setting `refs.field.value = string` does not trigger the necessary event flow to update the component's internal state and the placeholder doesn't appear/disappear correctly.
- __UITable: jumpToRowIndex (#196)__ (6b01aa6) Programmatically advance the table to a specific row \# within the current data set.
- __UITable: scroll state preservation (optional, defaulting to on) (#194)__ (accbaf6)
- __Revise the Getting Started import instructions (#190)__ (09940f6) And add a note about custom theming, similar to the README. Now includes all the style assets in the downloaded NPM module.
- __UITextualInput (#186)__ (202de00) A new composition component that abstracts away some x-platform differences in how placeholders are displayed and their interaction behaviors.
- __UITable: fix column resize behavior__ (8a1c799) Previously any shrinkage of a column would cause a left scroll, now we only scroll left if the negative delta would cause the a whitespace gap on the right edge.
- __UIArrowKeyNavigation: stop focus & blur bubbling__ (1a55887) If multiple instances of this component are nested, - the child events bubble up and trigger handlers on the parents, which isn't desired as it can move the page around and be disorienting.
- __Add co-branding instructions to README__ (cc7efaa)
- __Move global style variables to central style.styl__ (8576d30) Now it is possible for a third party to import the - main style.styl and inject their own values for the variables to change colors, etc as needed. More work needs to be done to make more of the styles configurable.

### Misc

- __UIDialog: remove unused/unrepresented styles (#241)__ (4b5f8d7)
- __Generalize passing of props from parent to child in composite components (#240)__ (0fc77ff)
- __Use the separated enigma-table module in UITable (#238)__ (84a7d28) The base table class will be used in places other than UIKit, so it makes sense to separate it into its own repository for cleaner issue management and development.
- __Revise ansible deployment stuff, add README entry about it__ (b801eec)
- __Move const declaration__ (a188727)
- __UIFittedText: use a shared window resize listener__ (7646210) Takes the number of window resize listeners from O(- n) to O(1) for any number of UIFittedText instances on a page.
- __Travis CI integration & remove Platform team branding (#227)__ (89e52f4)
- __UIProgressiveDisclosure: expand horizontally as able__ (90b42eb)
- __UITable: introduce a layout boundary for the cell text__ (758080f) Theoretically, this should reduce the amount - of work the browser has to do when updating a cell's content and give some perf improvement.
- __Update to Jest 12.x__ (32e28c9) Supposedly there are some perf improvements.
- __UITable: static mode no longer requires elements for the scroll bars__ (ca37519)
- __UIModal: tweak base styling__ (9e9e009) It's a bit more flexible now.
- __UITextualInput: further tweaking for controlled input support__ (4e61cf1)
- __UITypeaheadInput: remove deprecated methods__ (ce13625)
- __UITypeaheadInput: also watch for inputProps.defaultValue (#200)__ (ac1e855)
- __UITextualInput: hide placeholder when a defaultValue is given (#199)__ (2da2d1b)
- __UISegmentedControl: pointer cursor only for the toggles (#198)__ (95f177d) Previously the entire thing (including any padding) had the cursor, which is setting the wrong expectation if a user tries to click in the padding area outside a toggle.
- __UITable: CSS tuning for table view perf (#197)__ (d5d3252) Minor changes, but I saw about a 10% improvement in ms timings.
- __Abstract color scheme options to global vars__ (5b52076)
- __Fix a few failing tests, enable checkbox + label test__ (a4dbd7f)
- __Update to React 15, fix a documentation site react-router issue__ (9ee90b8) Everything appears to just work. <- U+1F389>
- __Rewrite es5 compilation step & add a watch mode__ (9c165c1)
- __Re-shrinkwrap with new dep versions__ (2c10619)
- __Upgrade React-Router to 2.x__ (325f9f5) Also had to remove the use of ES6 defaults in site/prepare.js because the functionality isn't enabled in Node yet.
- __eslintify -> eslint__ (767d968) We don't need the transform version. Fixed a few linting issues.
- __UIPopover: add a few more style combinations for placements__ (2907518)
- __UIDialog: closeOnOutsideClick right-click support__ (f77d8d6)
- __UIPopover: fix X-overflow alignment__ (5cc00c6)
- __UIButton: fix style not being enforced for disabled buttons__ (e071145) They shouldn't respond to hover, etc.
- __Update babel-jest and babel-eslint__ (b388045)
- __Update jest and npm test commands__ (0f72238) Does not collect coverage by default now, since it's slow and the - bug was fixed in 0.9.x so we don't have to specify files anymore.
- __UITable/TableView: Add test to verify table cells receive [data-column]__ (4985d18)
- __UITypeaheadInput: prevent double onInput events__ (947d54a)

---

## 1.0.0-beta-13 (3/8/2016)

__UITable/TableView major refactor__

A huge amount of bugs were squashed in this release relating to row translation, handling of the scrollbars, and overall performance. No outward changes.

__UIButton#onPressed now called for all single-hit interactions__

Think of it as a shortcut to knowing if the button has been interacted with, regardless of the source of the event (click, keyboard enter, etc.). If you decide to pass `props.pressed`, the button will become stateful as expected. You can still set explicit `onClick` and `onKeyDown` events if you wish.

### Breaking Changes

__Removed `props.body` from UIDialog (+ UIModal, UIPopover)__

Simply nest the body content inside the component like you would a normal HTML tag. Simpler, right? See any of their docs for an example.

__UITypeaheadInput#algorithm#markFunc's argument list was adjusted to better match UITypeaheadInput#algorithm#matchFunc__

See the docs for `UITypeaheadInput`, should be as simple as switching the position of your arguments if you are providing a custom `markFunc`.

### Important

- __Expose UIUtils/transformProperty__ (119aab1) A convenience module for getting the vendor-prefixed JS-based transform property for inline styles, if needed.
- __Added `Getting Started` page to UIKit site__ (3418560)
- __UISegmentedControl: Fixed component not resetting when backing changes. Introduced new identifier prop. Fixed logic in lifecycle methods. Updated - docs.__ (ed157ab)
- __UIDialog, UIModal, UIPopover: light refactor, remove `body` prop__ (805bb3e) In favor of just passing body items as nested - children. Just makes more sense in use.
- __UICheckbox: fix proxying of inputProps.onChange/onClick__ (399e5af)
- __UIArrowKeyNavigation: forward child focus/blur events if given__ (3a82185)
- __UIButton: refactor, onPressed now fired regardless of `props.pressed`__ (f80d6fa) Semantically, it didn't make sense for a - keydown event to trigger a click handler, so the behavior and recommendation has been revised such that you should listen for `onPressed` instead of `onClick` or `onKeyDown` to catch when the user interacts with the button.
  If you really only want to listen for clicks, then providing an `onClick` prop will still work as expected.
- __UITable: Fix viewport becoming unstuck__ (5ed8b3b) Due to a few math errors:
  1) row_end_index was off by one (not accounting for zero-based indexes)
  2) shift delta not being applied consistently during the reset timer
- __UITable: Properly rachet the Y scroll handle by the current top visible row index__ (de7204c)
- __UITable: Fix jumpiness for short tables__ (2e594c2)
- __UITable: fix cut off last row__ (08d2c74)
- __UITable: auto-hiding scrollbars__ (1f3efef) On the Y axis, the scrollbar will hide if there aren't enough rows to fill the table. On the X axis, it will hide if there aren't enough columns. Resizing the columns to fill the screen will bring it back.
- __UITable: add double-click to fit column__ (6149ea2) Similar to Excel functionality. Double-clicking the drag handle for a column will now automatically inspect all rendered content for that column, find the longest item and apply a new width to not truncate it.
- __UITable: throttle getRow calls if dragging the scroll nub fast__ (73f51f6)
- __UITable: clicking on the scrollbar track will now autoscroll__ (e1ad55c)
- __UITypeaheadInput: algorithm.markFunc argument change__ (d7a088c) Now aligns with algorithm.matchFunc and gives better access to - all the data that may go into a rendering decision for entity marking.

### Misc

- __Use class properties transform__ (6916d86)
- __Use Babel "loose" mode__ (898f74b) Allows for some speed improvements and potentially code size reduction. Also pinning us at 6.5.1, as there were some code changes in 6.6.0 that broke UITable/TableView due to a new transform in the es2015 preset.
- __eslintify 1.x -> 2.x__ (1fe5529)
- __Use my updated copy of Jest__ (6eb1ae7) Allows for setting a specific version of JSDOM so we can stay up to date.
- __Add bundle-collapser plugin to reduce byte size of dist builds__ (23e9ebc) Instead of require('xyz') it now optimizes to an - integer and saves space.
- __Chore: add jsnext:main field for ES6-aware bundlers__ (ef029e0)
- __Chore: add note about polyfilling Promise as needed__ (f4e8953)

---

## 1.0.0-beta-12 (1/26/2016)

- __UITable: changed the row loading animation__ (43349a1) Since the line length can vary considerably, it's now using a more horizontally-oblivious animation.

- __UITable: don't run calculateYBound() on resize__ (cb26a6f) If the height of the table changes, the whole thing has to be rebuilt anyway because the number of rotated rows may change, so running the `calculateYBound()` function will mess up the rotation if only X-size was modified.

---

## 1.0.0-beta-11 (1/26/2016)

- __UITable: recompute translation boundaries on window resize__ (93d2773) Otherwise the scroll tracks will not properly resize themselves.

---

## 1.0.0-beta-10 (1/26/2016)
### New Component(s)

1. __UIArrowKeyNavigation__

   A higher-order component that adds arrow key navigation to a grouping of children. Learn more in the [UIArrowKeyNavigation docs](./UIArrowKeyNavigation/README.md)!

### Breaking Changes

1. __UIList has been removed in favor of UIArrowKeyNavigation.__

   With the keyboard functionality isolated into a separate component, UIList was no longer bringing anything unique to the table and has subsequently been removed.

   UIPaginatedView was modified to directly use UIArrowKeyNavigation, as it previously used UIList internally. The `.ui-list`, `.ui-list-item`, etc classes are removed, so please modify your code to use the appropriate [UIPaginatedView class](./UIPaginatedView/README.md#example-usage) if you haven't already.

### Commits

- UITypeaheadInput: reduce frequency of console warnings (791d100) - They will now be emitted once each per component instance.
- Remove UIList; migrate other components to use UIArrowKeyNavigation (29b1489)
- UIList: switch internals to use UIArrowKeyNavigation (acd4f8e)
- Add UIArrowKeyNavigation (ac496e1) - This could probably replace UIList in the long run. It's a more general implementation that allows for any base component / child structure.
- UITable: Removed double click note (3569e76)
- UITable: recompute scrollbar concerns on window resize (aaf51b6) - This fixes the X/Y scrollbar being out of sync. If the height of the table changes, we need to do a full regeneration.
- UITypeaheadInput: revert programmatic Backspace input clearing (83d0c7c) - It was overaggressive and broke some use cases.
- UIUtils/notify: ignore untestable line (c9f5048)
- UIView: directly import Component from React (a1854e8) - Allows for better tree-shaking when the module bundlers get there.
- Add UIUtils/findWhere (7d0da1b) - Isolated from its original implementation in UITable.
- UIRadio: improve code coverage (e3d86b6)
- UIProgressiveDisclosure: improve test coverage, fixed bug in onClick proxy (fbaf974)
- UISegmentedControl: improve code coverage, fix a bug related to onBlur (ad32887)

### Misc

- Chore: site styling adjustments (9b57216)
- Chore: add sourcemaps to es5/ files and don't minify them (0685453) - Allows for easier development and the end user can minify them as desired. The release builds are still available in dist/ for a completely ready and minified solution.
- Chore: update dep, collect coverage for exports.js (baec1e9)
- Chore: update README language regarding reference styles (68f3357) - scss -> styl and the name of the file
- Chore: autocreate directories needed for site compilation (e10f036)
- Chore: adjust README (dc63720) - Closes #109
- Chore: add missing autoprefixer plugin to website builder (4a02f1e) - Tis why some things looked odd on `npm start`.
- Disable eslint consistent-return rule (91bb4e8) - Unnecessary.
- Fix changelog policy template example (0c5942b)
- Update budo to 8.x (6b14f0c)
- Update to "forever" license (315f053)

---

## 1.0.0-beta-9 (1/8/2016)
### Deprecations

1. __UITypeaheadInput methods `focusInput` and `setValue` were renamed to `focus` and `value`.__

   Console warnings are in place and the old method will be removed at a later date. It will continue to work in the meantime.

### Commits

- UITokenizedInput: cmd + a support to select all tokens (f0afa0d) - Also selects input text if the focus is on
  the input at that time.

- UITypeaheadInput: prevent selection of entity on ArrowRight + Shift (c430e40)
- UITypeaheadInput: clear the input on Backspace (37d4fcc) - This behavior is used in conjunction with Cmd + A to select all text and tokens and use one Backspace to remove the lot.

- UITokenizedTypeahead: correctly handle token focus changes on selection (76688cb)
- UITokenizedInput, UITypeaheadInput: rewrite CSS for better focus support (2ecf4c6)
- UITypeaheadInput: focusInput -> focus, setValue -> value (65c81cd) - The old methods now have a deprecation warning.

- UIDialog: add prop "closeOnOutsideFocus" (b7c7b68) - In a `captureFocus: false` scenario, this prop can prevent multiple popovers from existing at the same time. Up to the consuming developer's discretion.
- UIDialog: focus ring (6d3203d)
- UIProgressiveDisclosure: bring back focus ring (78fc25c)
- UIButton: remove default margin (comes from user-agent) (5590353) - A related visual bug was reported that is a combo of this happening and some other unrelated styles interacting.

- UITable: fix column header cell dimensions not being acquired (62f7f3a) - If you use `getComputedStyle` on an unmounted node, it will not have any information on it. TIL!

- Focus-related fixes for a few components, smoothing an x-browser issue (52d3f51)
    - 1. Bring back focus rings on UIButtons
    - 2. Fix Firefox not focusing checkboxes on click (no hard & fast rules about it)
    - 3. Fix tabIndex assignment for UISegmentedView

- UIFittedText: prevent fontSize from being set to zero (2605faf) - If this happens, rescaling back up will not work since the calculation will try to multiply by zero.

### Demos

- UIProgess demo: add aria labels to each bar (3247788)
- UIPopover demo: make the triggers focusable and handle Enter presses (83ed15a)

### Misc

- move history dep back to caret selector (2978c4c) - Fixes the npm warning
- Move .ui-offscreen class into the compiled skin (34ecfe3) - Also switched the target for pleeease-cli to a new branch.

- Chore: compile skin CSS to dist/ (c1affaf) - It's happening! Keep in mind these are not final styles.

---

## 1.0.0-beta-8 (1/5/2016)

- UITokenizedInput: focus a token when it becomes selected, tests (68ecf18)
- UITokenizedInput: clear input when tokens are added (2298596)

### Misc

- Site: prepare markdown modifications at build time (cdee94e)
- [Site] Auto-link detected commit SHAs back to github (fb579b9)
- Fix changelog links (6905c97)
- Fix changelog formatting (3646590)
- Fix typo in the site search bar functionality (4dcbf3d)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-7 (1/4/2016)
### Breaking Changes

1. __UITokenizedInput is now operated as a "controlled" component.__

   This essentially means that the component no longer manages its own state and relies on the consuming developer to provide what tokens to render and their selection state. When a user interacts with UITokenizedInput, certain functions will be triggered to notify the stateful wrapper that it should add/remove token(s) or move the selection.

   Learn more in the [UITokenizedInput documentation](./UITokenizedInput/README.md)!

1. __UINotification -> UIUtils/notify__

   We recently discovered that the lifecycle functionality of web notifications is completely unreliable, so the "manager" aspect of this component was removed and the whole thing has been converted into a utility, rather than a React component.

### Relevant Commits

- UITokenizedInput: Refactor to a "controlled" system (130b328)
- Fix links to UITypeaheadInput from UITokenizedInput (d1c408f)
- Add tests to verify the contents of exports.js (1d780ac)
- Add missing export line for UIPaginatedView (f07e4bb)
- UITable: baseline touch support (c28b45a)
- UINotification -> UIUtils/notify (5cf5f0c)
- Site: mobile styles (d5c92f5)
- UITable: classList -> className (IE9 support) (b98ad3f)
- UITable: fix y-axis scroll handle sensitivity (77f8098)
- UITable: preserve active row when scrolled out of view (3c34961)
- UITable: lock row + cell to the same height (e48124a)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-6 (12/17/2015)
### Breaking Change

1. __UITypeaheadInput's algorithm handling has been changed.__

   Previously you could directly supply `props.matchFunc` and `props.markFunc` to do custom handling of your entity matching and display. This was revised to happen inside a new `props.algorithm` object, due to the addition of a new built-in algorithm: "fuzzy".

   So to do custom matching etc. again you'd pass the following instead:

   ```js
   // beta-5
   <UITypeaheadInput
       matchFunc={{yourMatchFunc}}
       markFunc={{yourMatchFunc}} />

   // beta-6
   <UITypeaheadInput
       algorithm={{
           matchFunc: yourMatchFunc,
           markFunc: yourMarkFunc,
       }} />
   ```

   Other algorithm options include "starts-with" (`UITypeaheadInput.mode.STARTS_WITH`) and "fuzzy" (`UITypeaheadInput.mode.FUZZY`). See the [   UITypeaheadInput readme](./UITypeaheadInput/README.md) for more information.

### Relevant Commits

- UITable: classList -> className (IE9 support) (b98ad3f)
- UITable: fix y-axis scroll handle sensitivity (77f8098)
- UITable: preserve active row when scrolled out of view (3c34961)
- UITable: add loading graphic for async rows (8945d9d)
- Site: reword the master README slightly, break up the changelog visually (82e3610)
- Site: Improve table look for better readability (1287997)
- UITypeaheadInput: algorithm modes + fuzzy option built-in (ec3fb86)
- UIProgressiveDisclosure: add optional `teaserExpanded` prop (74b1dce)
- UITypeaheadInput: fix moving selected match out of the field of view (a976dff)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-5 (12/16/2015)

- UITable: add tests, fix an x-scroll track NaN condition (75e5828)
- UISegmentedControl: add "content" to prop list, fix alignment (84015d3)
- UITable: rework internals to only use React for the container (ec1bc4c)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-4 (12/14/2015)

- UITable: fix x-axis translation boundary not updating after column resizing (199b7ff)
- UITable: handle window resize (6bbdb38)
- UITable: catch external mouseup events to end dragging sequences (12eec53)
- UITable: blank out a line if there's no data to put in it (1618a1c)
- UITable: fix last row sometimes not being displayed (ee22eb5)
- UITable: add new prop 'name' (fd4fc32)
- UITable: prevent creation of more rows than data is available (e224425); transitioning from a large set to a small one
- UITable: fix x-axis sizing for very wide datasets (2f6bd9d)
- UITable: try out some bleeding-edge CSS stuff to test perf (f20ec6a); `will-change` property

### Misc
- [Chore] Minify generated ES5 files (419a0ee)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-3 (12/10/2015)

- UITable: Fix first row disappearing on scroll (d010001ea7865c51d0a072114f7bc26a118b0bb4)
- UITable: composite table rows to fix WebKit rendering bug (97d3536138d41e2ebc43a335c9064e61f1a28312); click
  and drag a column to the right would sometimes cause a rendering bug where the background was partially invisible
- UITable: fix dragStart being triggered occasionally (f08df04af37bd737cc00853e6aa236663b3d203f); only affected
  click & drag on the column resize handles
- UITable: clean up unused prop types, add missing information to README (910cca8d9857d2ad7c47f4e3f152c79a33ea4e8b)
- UIView: add README and site page (4e650cd2ed3a900e4ba5babb015df782fdd316eb)

[back to top](#uikit-changelog)

---

## 1.0.0-beta-2 (12/9/2015)

- Added support for [default tokens in UITokenizedInput](3b2e48144f15b62121ccab1c7d5e6bf92f6f005a)
- Added programmatic [`addToken()` and `removeToken()` functionality](https://github.com/bibliotech/uikit/tree/master/UITokenizedInput#available-methods) to UITokenizedInput
- Updated the READMEs for UITokenizedInput and UITypeaheadInput - the prop name for `hint` was incorrect in the usage
  examples (previously was `provideHint`)

[back to top](#uikit-changelog)

---

## 1.0.0-beta (12/4/2015)

Hey, it's our initial company-wide release!

[back to top](#uikit-changelog)
