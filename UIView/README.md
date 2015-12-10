# UIView
__A wrapper around `React.Component` with useful functionality.__

---

UIView is meant to be used in place of `React.Component` when creating new ES6 React components. Instead of this:

```js
import React from 'react';

class MyComponent extends React.Component {}
```

you would do this:

```js
import React from 'react';
import {UIView} from 'enigma-uikit';

class MyComponent extends UIView {}
```

From extending `UIView`, you get a few compelling benefits:

- automatic inclusion of shallow-equal checking via `shouldComponentUpdate()` (similar to the ES5
  [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)) - if you provide your own `shouldComponentUpdate` in the extended component, it will supercede the UIView-supplied version

  __To put it simply, if your props and state don't change, your component will not re-render. It helps support an [immutable data workflow](https://www.youtube.com/watch?v=I7IdS-PbEgI) (highly recommended) and can drastically improve the performance of your application.__

- `initialState()` - a much simpler way of providing a starting `this.state` object than going through the hassle of
  providing a `constructor()` function and calling `super()` with the arguments; identical to the ES5 React [`getInitialState`](https://facebook.github.io/react/docs/component-specs.html#getinitialstate) API

- `uuid()` - a convenience function for autogenerating HTML-compatible unique IDs; used in a few UIKit components to
  link up `<input>` and `<label>` elements in such a way that it is practically impossible that the ID will conflict with any used in your project
