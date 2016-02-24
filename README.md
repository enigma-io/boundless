# Enigma Platform Team
## UIKit

---

UIKit is a problem-solving [React JS](https://facebook.github.io/react/) component pack, meant to provide implementations for common UI needs that need normalized behavior and are difficult and/or unreasonable to write anew for every project. Each component is designed with maximum extensibility in mind, with _at least_ basic screen-reader & ARIA support.

During the beta releases, UIKit will not come with a compiled CSS "skin". Each component in the Github repository does have styles that can be copied and used in your project, though.

__UIKit requires an [ES5-compatible browser](http://kangax.github.io/compat-table/es5/) (IE9+). You will also need to provide a `window.Promise` polyfill if your browser support matrix includes IE (non-Edge) and/or some mobile browsers: http://caniuse.com/#search=Promise.__

---

1. [Installation](#installation)
    1. [via a bundling system like Browserify or Webpack](#via-a-bundling-system-like-browserify-or-webpack)
    1. [without a bundling system](#without-a-bundling-system)
1. [Usage](#usage)
    1. [ES6 (bundled with Babel, etc.)](#es6-bundled-with-babel-etc)
    1. [ES5 (bundled)](#es5-bundled)
    1. [ES5 (unbundled) + in-browser JSX compiler](#es5-distuikitminjs-dropped-into-the-page--inbrowser-jsx-compilerhttpbabeljsiodocsusagebrowser)
    1. [ES5 (unbundled)](#es5-distuikitminjs-dropped-into-the-page)
1. [Website, Component Demos and Reference Styles](#website-component-demos-and-reference-styles)
    1. [Running the Website Locally](#running-the-website-locally)

---

### Installation

There are a number of ways you can consume UIKit in your project.

#### via a bundling system like Browserify or Webpack

Simply add UIKit as a dependency to your package.json file (and run `npm install`):

```json
"dependencies": {
    "enigma-uikit": "bibliotech/uikit"
}
```

> Due to the fact that we are not currently releasing UIKit via NPM, the common semver protections are not automatically available. It is highly recommended to scope your usage of UIKit to a specific version tag to avoid any breaking changes that may result from an update, e.g. `bibliotech/uikit#1.0.0-beta-12`.

#### without a bundling system

You can simply copy the [dist/uikit.min.js](https://github.com/bibliotech/uikit/blob/master/dist/uikit.min.js) file to your project if desired. The components are automatically exported to `window.UIKit.<moduleName>`. They assume the presence of `window.React` and `window.ReactDOM`.

In this case, your HTML page would probably resemble the following:
```html
<html>
    <head>
        <title>...</title>
    </head>
    <body>
        <!-- some content or a root container -->

        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min.js"></script>
        <script src="//cdn.jsdelivr.net/polyfills/polyfill.js+promise"></script>
        <script src="js/uikit.min.js"></script>
        <script src="js/myapp.js"></script><!-- Your code that uses window.UIKit.<moduleName> goes last. -->
    </body>
</html>
```

[back to top](#uikit)

---

### Usage
#### ES6 (bundled with Babel, etc.)

```js
import React from 'react';
import {render} from 'react-dom';
import {UIButton} from 'enigma-uikit';

function MyUI() {
    return (
        <UIButton onPressed={doSomething}>Click me!</UIButton>
    );
}

render(<MyUI />, document.body);
```

#### ES5 (bundled)

```js
var React = require('react');
var ReactDOM = require('react-dom');
var UIButton = require('enigma-uikit').UIButton;

function MyUI() {
    return (
        <UIButton onPressed={doSomething}>Click me!</UIButton>
    );
}

ReactDOM.render(<MyUI />, document.body);
```

#### ES5 (`dist/uikit.min.js` dropped into the page) + [in-browser JSX compiler](http://babeljs.io/docs/usage/browser/)
```js
var React = window.React;
var ReactDOM = window.ReactDOM;
var UIButton = window.UIKit.UIButton;

function MyUI() {
    return (
        <UIButton onPressed={doSomething}>Click me!</UIButton>
    );
}

ReactDOM.render(<MyUI />, document.body);
```

#### ES5 (`dist/uikit.min.js` dropped into the page)
```js
var React = window.React;
var ReactDOM = window.ReactDOM;
var UIButton = window.UIKit.UIButton;

function MyUI() {
    return React.createElement(UIButton, {onPressed: doSomething}, 'Click me!');
}

ReactDOM.render(MyUI(), document.body);
```

An unminified version with bundled sourcemapping for easy debugging during the development process is available: [dist/uikit.js](dist/uikit.js)

[back to top](#uikit)

---

### Website, Component Demos and Reference Styles

Clone the repository to your local machine:

```bash
git clone git@github.com:bibliotech/uikit.git
```

Each component folder includes a functional demo and some reference styles in `style.styl`. These styles are all rolled up into `dist/skin.min.css` that you can drop into your project. ___NOTE: these are not official Enigma styles, expect them to change in a later release.___

#### Running the Website Locally

Run the following commands inside the cloned UIKit repository (assumes Node 4+ is installed):

```bash
npm install
npm start
```

[back to top](#uikit)
