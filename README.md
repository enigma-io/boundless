# Enigma Platform Team
### UIKit

**Intuitive, accessible solutions for common UI needs in React.**

UIKit is a problem-solving component pack, meant to provide implementations for common UI needs that would generally be considered annoying to implement yourself. Each component is designed with maximum extensibility in mind, with _at least_ basic screen-reader / ARIA support.

The library intentionally does not come with styles to remain lightweight, but see the `demo/` folder of each component for reference and inspiration when writing your own.

#### Usage

Each component is importable with a standard bundling system like Browserify + Babel:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {UIList} from 'enigma-uikit';

function MyUI() {
    return (
        <UIList items={['red', 'green', 'blue']} />
    );
}

ReactDOM.render(<MyUI />, document.body);
```

Or alternatively, each component is also exported to window like so: `window.UIKit.UIButton`. Note that you need `React` globally exposed for the window method to work correctly.


#### "Kitchen Sink" & Demos

To access the full set of demos, you'll need to clone the repo locally to your favored projects folder:

```
git clone git@github.com:enigma-platform/uikit.git
```

Then `cd` into it and run the following commands:

```bash
npm install
npm run demo
```
