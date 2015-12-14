# Enigma Platform Team
## UIKit Changelog

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


### 1.0.0-beta-3 (12/10/2015)

- UITable: Fix first row disappearing on scroll (d010001ea7865c51d0a072114f7bc26a118b0bb4)
- UITable: composite table rows to fix WebKit rendering bug (97d3536138d41e2ebc43a335c9064e61f1a28312); click
  and drag a column to the right would sometimes cause a rendering bug where the background was partially invisible
- UITable: fix dragStart being triggered occasionally (f08df04af37bd737cc00853e6aa236663b3d203f); only affected
  click & drag on the column resize handles
- UITable: clean up unused prop types, add missing information to README (910cca8d9857d2ad7c47f4e3f152c79a33ea4e8b)
- UIView: add README and site page (4e650cd2ed3a900e4ba5babb015df782fdd316eb)

### 1.0.0-beta-2 (12/9/2015)

- Added support for [default tokens in UITokenizedInput](3b2e48144f15b62121ccab1c7d5e6bf92f6f005a)
- Added programmatic [`addToken()` and `removeToken()` functionality](https://github.com/bibliotech/uikit/tree/master/UITokenizedInput#available-methods) to UITokenizedInput
- Updated the READMEs for UITokenizedInput and UITypeaheadInput - the prop name for `hint` was incorrect in the usage
  examples (previously was `provideHint`)

### 1.0.0-beta (12/4/2015)

Hey, it's our initial company-wide release!
