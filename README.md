# Enigma Platform Team
### UIKit

**Intuitive, accessible solutions for common UI needs in React.**

UIKit is a problem-solving component pack, meant to provide implementations for common UI needs that would generally be considered annoying to implement yourself. Each component is designed with maximum extensibility in mind, with _at least_ basic screen-reader / ARIA support.

The library intentionally does not come with styles to remain lightweight, but see the `demo/` folder of each component for reference and inspiration when writing your own.

UIKit requires an [ES5-compatible browser](http://kangax.github.io/compat-table/es5/) (IE9+).


#### Installation

There are a number of ways you can consume UIKit in your project.

##### via a bundling system like Browserify or Webpack

1. Install UIKit as a dependency:
   `npm i --save enigma-uikit@git@github.com:enigma-platform/uikit.gitgit@github.com:enigma-platform/uikit.git`

1. Install Babel if you do not already have it, and follow the setup instructions*
    - browserify: [babelify](https://github.com/babel/babelify)
    `npm i --save-dev babelify`
    - webpack: [babel-loader](https://github.com/babel/babel-loader)
    `npm i --save-dev babel-loader`

##### without a bundling system

You can simply include the `dist/uikit-standalone.js` file in your project if desired. The components are automatically exported to `window.UIKit.<moduleName>`. They assume the presence of `window.React` and `window.ReactDOM`.

###### If you don't want to use Babel

You can set up an alias for `enigma-uikit` to the `dist/uikit.js` file, which is already transpiled and ready for ES5 use.

__Browserify (via [aliasify](https://github.com/benbria/aliasify)):__

```js
// package.json
{
    browserify: {
        aliasify: {
            "enigma-uikit": "./node_modules/enigma-uikit/uikit.js"
        }
    }
}
```

__Webpack:__

```js
// in webpack.config.js
{
    resolve: {
        alias: {
            'enigma-uikit': './node_modules/enigma-uikit/uikit.js'
        }
    }
}
```


#### Usage
##### ES6 (bundled with Babel, etc.)

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

##### ES5 (bundled)

```jsx
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

##### ES5 (`dist/uikit-standalone.js` dropped into the page) + [in-browser JSX compiler](http://babeljs.io/docs/usage/browser/)
```jsx
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

##### ES5 (`dist/uikit-standalone.js` dropped into the page)
```jsx
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


#### "Kitchen Sink" & Demos

To access the full set of demos, you'll need to clone the repo to your local projects folder:

```
git clone git@github.com:enigma-platform/uikit.git
```

Then `cd` into it and run the following commands:

```bash
npm install
npm run demo
```
