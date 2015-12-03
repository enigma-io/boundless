# Enigma Platform Team
## UIKit

_Intuitive, accessible solutions for common UI needs in React._

UIKit is a problem-solving component pack, meant to provide implementations for common UI needs that would generally be considered annoying to implement yourself. Each component is designed with maximum extensibility in mind, with _at least_ basic screen-reader / ARIA support.

The library intentionally does not come with styles to remain lightweight, but see the `demo/` folder of each component for reference and inspiration when writing your own.

UIKit requires an [ES5-compatible browser](http://kangax.github.io/compat-table/es5/) (IE9+).

1. [Installation](#installation)
2. [Usage](#usage)
3. ["Kitchen Sink" & Demos](#kitchen-sink--demos)

---

### Installation

There are a number of ways you can consume UIKit in your project.

#### via a bundling system like Browserify or Webpack

1. Install UIKit as a dependency:

   ```bash
   npm i --save enigma-uikit@git+git@github.com:enigma-platform/uikit.git
   ```


#### without a bundling system

You can simply include the `dist/uikit-standalone.min.js` file in your project if desired. The components are automatically exported to `window.UIKit.<moduleName>`. They assume the presence of `window.React` and `window.ReactDOM`.

In this case, your HTML page would probably resemble the following:
```html
<html>
    <head>
        <title>...</title>
    </head>
    <body>
        <!-- some content or a root container -->

        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.min.js"></script>
        <script src="js/uikit-standalone.min.js"></script>
        <script src="js/myapp.js"></script><!-- Your code that uses window.UIKit.<moduleName> goes last. -->
    </body>
</html>
```

---

### Usage
#### ES6 (bundled with Babel, etc.)

```js
import React from 'react';
import {render} from 'react-dom';
import {UIList} from 'enigma-uikit';

function MyUI() {
    return (
        <UIList items={['red', 'green', 'blue']} />
    );
}

render(<MyUI />, document.body);
```

#### ES5 (bundled)

```js
var React = require('react');
var ReactDOM = require('react-dom');
var UIList = require('enigma-uikit').UIList;

function MyUI() {
    return (
        <UIList items={['red', 'green', 'blue']} />
    );
}

ReactDOM.render(<MyUI />, document.body);
```

#### ES5 (`dist/uikit-standalone.min.js` dropped into the page) + [in-browser JSX compiler](http://babeljs.io/docs/usage/browser/)
```js
var React = window.React;
var ReactDOM = window.ReactDOM;
var UIList = window.UIKit.UIList;

function MyUI() {
    return (
        <UIList items={['red', 'green', 'blue']} />
    );
}

ReactDOM.render(<MyUI />, document.body);
```

#### ES5 (`dist/uikit-standalone.min.js` dropped into the page)
```js
var React = window.React;
var ReactDOM = window.ReactDOM;
var UIList = window.UIKit.UIList;

function MyUI() {
    return React.createElement(UIList, {
        items: ['red', 'green', 'blue']
    });
}

ReactDOM.render(<MyUI />, document.body);
```

An unminified version with bundled sourcemapping for easy debugging during the development process is available: [dist/uikit-standalone.js](dist/uikit-standalone.js)

---

### Website, Component Demos and Reference Styles

Clone the repository to your local machine:

```bash
git clone git@github.com:enigma-platform/uikit.git
```

Each component folder includes a functional demo and some reference styles in `style.scss`. UIKit will ship with a recommended (fully-compiled) CSS skin file for the full `1.0.0` release, but `1.0.0-beta` comes unskinned.

#### Running the Website Locally

Run the following commands inside the cloned UIKit repository (assumes Node 4+ is installed):

```bash
npm install
npm run site
```
