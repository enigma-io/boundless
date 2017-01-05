# boundless

## installation (coming soon)

```bash
npm i boundless         # the whole library, or...
npm i boundless-button  # a specific part of the library
```

## developing boundless

```bash
npm i -g lerna@prerelease # install lerna (handles the monorepo, currently in beta for the 2.x branch)

git clone git@github.com:bibliotech/uikit.git boundless
cd boundless

npm i  # installs the dependencies and also performs the lerna "bootstrap" to get everything symlinked
```

# Getting started with Boundless
__A guide to creating a Boundless-ready React web app__

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

### Install Boundless

The boilerplate React web app does not include Boundless by default.

```bash
npm install --save boundless
```

The `--save` option updates `package.json` automatically.

#### Add the Boundless CSS skin

Boundless has a default style skin which can be imported via Stylus. Add the following line to `your-app/style.styl`:

```styl
@import "node_modules/boundless/style.styl"
```

If you want to do any custom theming, feel free to redeclare any variables present in [Boundless's style.styl](./style.styl) above where you are importing it, like:

```styl
color-accent = royalblue

@import "node_modules/boundless/style.styl"
```

---

### Try it out

`npm start` builds and launches the app. Any changes you make while the app is running are automatically applied and cause the app to rebuild on the fly.

Let's add a Boundless component to the app by modifying `your-app/example/index.js`. First, import [`Tooltip`](./packages/boundless-tooltip):

```js
import React from 'react';
import Tooltip from 'boundless-tooltip';
// ...
```

Enclose a `p` tag within a `Tooltip`:

```jsx
// ...
renderDescription() {
    if (this.props.description) {
        return (
            <Tooltip component='p' text='Hello again!'>
                <p>{this.props.description}</p>
            </Tooltip>
        );
    }
}
// ...
```

A `Tooltip` should now render when you hover over the paragraph text.

---

### Further reference

For a complete list of Boundless components, as well as documentation and usage examples, refer to the __[Boundless demos and documentation](http://uikit.platform.enigma/)__ (VPN).


<sub>MIT License</sub>
