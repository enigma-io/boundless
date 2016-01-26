# Enigma Platform Team
## UIKit Changelog

---

### 1.0.0-beta-10 (1/26/2016)
#### New Component(s)

1. __UIArrowKeyNavigation__

   A higher-order component that adds arrow key navigation to a grouping of children. Learn more in the [UIArrowKeyNavigation docs](./UIArrowKeyNavigation/README.md)!

#### Breaking Changes

1. __UIList has been removed in favor of UIArrowKeyNavigation.__

   With the keyboard functionality isolated into a separate component, UIList was no longer bringing anything unique to the table and has subsequently been removed.

   UIPaginatedView was modified to directly use UIArrowKeyNavigation, as it previously used UIList internally. The `.ui-list`, `.ui-list-item`, etc classes are removed, so please modify your code to use the appropriate [UIPaginatedView class](./UIPaginatedView/README.md#example-usage) if you haven't already.

#### Commits

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

#### Misc

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

### 1.0.0-beta-9 (1/8/2016)
#### Deprecations

1. __UITypeaheadInput methods `focusInput` and `setValue` were renamed to `focus` and `value`.__

   Console warnings are in place and the old method will be removed at a later date. It will continue to work in the meantime.

#### Commits

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

#### Demos

- UIProgess demo: add aria labels to each bar (3247788)
- UIPopover demo: make the triggers focusable and handle Enter presses (83ed15a)

#### Misc

- move history dep back to caret selector (2978c4c) - Fixes the npm warning
- Move .ui-offscreen class into the compiled skin (34ecfe3) - Also switched the target for pleeease-cli to a new branch.

- Chore: compile skin CSS to dist/ (c1affaf) - It's happening! Keep in mind these are not final styles.

---

### 1.0.0-beta-8 (1/5/2016)

- UITokenizedInput: focus a token when it becomes selected, tests (68ecf18)
- UITokenizedInput: clear input when tokens are added (2298596)

#### Misc

- Site: prepare markdown modifications at build time (cdee94e)
- [Site] Auto-link detected commit SHAs back to github (fb579b9)
- Fix changelog links (6905c97)
- Fix changelog formatting (3646590)
- Fix typo in the site search bar functionality (4dcbf3d)

[back to top](#uikit-changelog)

---

### 1.0.0-beta-7 (1/4/2016)
#### Breaking Changes

1. __UITokenizedInput is now operated as a "controlled" component.__

   This essentially means that the component no longer manages its own state and relies on the consuming developer to provide what tokens to render and their selection state. When a user interacts with UITokenizedInput, certain functions will be triggered to notify the stateful wrapper that it should add/remove token(s) or move the selection.

   Learn more in the [UITokenizedInput documentation](./UITokenizedInput/README.md)!

1. __UINotification -> UIUtils/notify__

   We recently discovered that the lifecycle functionality of web notifications is completely unreliable, so the "manager" aspect of this component was removed and the whole thing has been converted into a utility, rather than a React component.

#### Relevant Commits

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

### 1.0.0-beta-6 (12/17/2015)
#### Breaking Change

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

#### Relevant Commits

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

### 1.0.0-beta-5 (12/16/2015)

- UITable: add tests, fix an x-scroll track NaN condition (75e5828)
- UISegmentedControl: add "content" to prop list, fix alignment (84015d3)
- UITable: rework internals to only use React for the container (ec1bc4c)

[back to top](#uikit-changelog)

---

### 1.0.0-beta-4 (12/14/2015)

- UITable: fix x-axis translation boundary not updating after column resizing (199b7ff)
- UITable: handle window resize (6bbdb38)
- UITable: catch external mouseup events to end dragging sequences (12eec53)
- UITable: blank out a line if there's no data to put in it (1618a1c)
- UITable: fix last row sometimes not being displayed (ee22eb5)
- UITable: add new prop 'name' (fd4fc32)
- UITable: prevent creation of more rows than data is available (e224425); transitioning from a large set to a small one
- UITable: fix x-axis sizing for very wide datasets (2f6bd9d)
- UITable: try out some bleeding-edge CSS stuff to test perf (f20ec6a); `will-change` property

#### Misc
- [Chore] Minify generated ES5 files (419a0ee)

[back to top](#uikit-changelog)

---

### 1.0.0-beta-3 (12/10/2015)

- UITable: Fix first row disappearing on scroll (d010001ea7865c51d0a072114f7bc26a118b0bb4)
- UITable: composite table rows to fix WebKit rendering bug (97d3536138d41e2ebc43a335c9064e61f1a28312); click
  and drag a column to the right would sometimes cause a rendering bug where the background was partially invisible
- UITable: fix dragStart being triggered occasionally (f08df04af37bd737cc00853e6aa236663b3d203f); only affected
  click & drag on the column resize handles
- UITable: clean up unused prop types, add missing information to README (910cca8d9857d2ad7c47f4e3f152c79a33ea4e8b)
- UIView: add README and site page (4e650cd2ed3a900e4ba5babb015df782fdd316eb)

[back to top](#uikit-changelog)

---

### 1.0.0-beta-2 (12/9/2015)

- Added support for [default tokens in UITokenizedInput](3b2e48144f15b62121ccab1c7d5e6bf92f6f005a)
- Added programmatic [`addToken()` and `removeToken()` functionality](https://github.com/bibliotech/uikit/tree/master/UITokenizedInput#available-methods) to UITokenizedInput
- Updated the READMEs for UITokenizedInput and UITypeaheadInput - the prop name for `hint` was incorrect in the usage
  examples (previously was `provideHint`)

[back to top](#uikit-changelog)

---

### 1.0.0-beta (12/4/2015)

Hey, it's our initial company-wide release!

[back to top](#uikit-changelog)
