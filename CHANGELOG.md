# Enigma Platform Team
## UIKit Changelog

---

### 1.0.0-beta-6 (12/17/2015)

#### Breaking Change

__UITypeaheadInput's algorithm handling has been changed.__

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

Other algorithm options include "starts-with" (`UITypeaheadInput.mode.STARTS_WITH`) and "fuzzy" (`UITypeaheadInput.mode.FUZZY`). See the [UITypeaheadInput readme](UITypeaheadInput/README.md) for more information.

#### Commits

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
