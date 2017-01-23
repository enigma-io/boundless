# Getting started with Boundless
__A guide to creating a Boundless-ready React web app__

> __Starting from scratch?__
> Enigma's [React webapp generator for Yeoman](https://github.com/enigma-io/generator-enigma) is a nifty tool that allows you to generate a boilerplate React web app built to official Enigma standards (more detailed usage instructions are available in that repo).

## Install Boundless

Since Boundless is modular, you can use as little or as much of the library as you desire. We recommend starting out with all the components:

```bash
npm install --save boundless
```

The `--save` option updates `package.json` automatically.

Later on if you wish to only use a few specific components, they can easily be installed separately:

```bash
npm install --save boundless-button boundless-popover
```

## Add the Boundless CSS skin

Boundless has default styles which can be imported into your CSS build tool of choice (we recommend [Stylus](http://stylus-lang.com/).)

### If you're using Stylus

```stylus
// inside your main style.styl
@import "node_modules/boundless/style.styl"
```

If you want to do any custom theming, feel free to redeclare variables present in [style.styl](https://github.com/enigma-io/boundless/blob/master/style.styl) above where you are importing it, like:

```stylus
color-accent = royalblue

@import "node_modules/boundless/style.styl"
```

The above will automatically recolor the component styles to match your app's accent color.

### If you're not using Stylus

A precompiled version of the default styles is available at `node_modules/boundless/public/skin.css` or `node_modules/boundless/public/skin.css` (minified) for easy drop-in to your project.

## Try it out

Here's an example of using the Boundless "Button" component. First, import [Button](/Button) into your desired React file:

```js
import {Button} from 'boundless';
```

Based on the [Button props](/Button#props), we know we can give it children of our choice and hook into the "pressed" event by supplied an `onPressed` callback. Here's a minimal functional example:

```jsx
import React from 'react';
import {Button} from 'boundless';

export default () => (
    <Button onPressed={() => alert('BORK! 🐶')}>
        Learn to Bork
    </Button>
)
```
