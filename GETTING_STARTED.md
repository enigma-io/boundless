# Getting started with UIKit
__A guide to creating a UIKit-ready React web app__

---

### Use our webapp generator!

Enigma's [React webapp generator for Yeoman](https://github.com/enigma-io/generator-enigma) is a nifty tool that allows you to generate a boilerplate React web app built to official Enigma standards (more detailed usage instructions are available in that repo).

##### Install via `npm`

```bash
npm install -g generator-enigma
```

---

### Generate a boilerplate React web app

Create a new folder to contain your project. Run the generator inside the new folder:

```bash
yo enigma
```

After answering some very basic questions, your new React web app will begin its install and build process. This can take a few minutes.

```bash
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |      It's app time!      |
   `---------´   |                          |
    ( _´U`_ )    |  You're 4 questions from |
    /___A___\    | a fully-functional React |
     |  ~  |     |      app, built with     |
   __'.___.'__   |   enigma.io standards.   |
 ´   `  |° ´ Y ` '--------------------------'
 ```

---

### Install UIKit

The boilerplate React web app does not include UIKit by default.

```bash
npm install --save enigma-uikit@bibliotech/uikit#1.0.0-beta-12
```

The `--save` option updates `package.json` automatically.

> Because UIKit is not currently available via `npm`, the common semver protections are not automatically available. It is highly recommended to scope your usage of UIKit to a specific version tag to avoid any breaking changes that may result from an update (e.g. `bibliotech/uikit#1.0.0-beta-13`).

#### Add the UIKit CSS skin

UIKit has a default style skin which can be imported via Stylus. Add the following line to `your-app/style.styl`:

```css
@import "node_modules/enigma-uikit/dist/skin.min.css"
```

---

### Try it out

`npm start` builds and launches the app. Any changes you make while the app is running are automatically applied and cause the app to rebuild on the fly.

Let's add a UIKit component to the app by modifying `your-app/example/index.js`. First, import [`UITooltip`](http://uikit.platform.enigma/UITooltip):

```js
import React from 'react';
import {UITooltip} from 'enigma-uikit';
// ...
```

Enclose a `p` tag within a `UITooltip`:

```js
// ...
renderDescription() {
    if (this.props.description) {
        return (
            <UITooltip text='Hello again!'>
                <p ref='description' className='ui-example-desc'>{this.props.description}</p>
            </UITooltip>
        );
    }
}
// ...
```

A `UITooltip` should now render when you hover over the paragraph text.

---

### Further reference

For a complete list of UIKit components, as well as documentation and usage examples, refer to the __[UIKit demos and documentation](http://uikit.platform.enigma/)__ (VPN).
