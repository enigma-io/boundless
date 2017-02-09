# Boundless

[![NPM version](https://img.shields.io/npm/v/boundless.svg)](https://www.npmjs.com/package/boundless) [![Build Status](https://api.travis-ci.com/enigma-io/boundless.svg?token=hxqSwGHKT9sQ6YJSerRg&branch=master)](https://travis-ci.com/enigma-io/boundless) [![codecov](https://codecov.io/gh/enigma-io/boundless/branch/master/graph/badge.svg?token=p755jHqDqi)](https://codecov.io/gh/enigma-io/boundless)


## Installation

```bash
# the whole library
npm i boundless --save

# or just a part of it
npm i boundless-button --save
```

Boundless currently supports IE10+ (needs a [Promise polyfill](https://cdnjs.com/libraries/es6-promise)) and all other modern browsers.

## Philosophy

Boundless is a UI toolkit that was conceived to abstract away difficult interface patterns. It follows three main guidelines:

1. Performance is mandatory, not a nice-to-have.
2. Components should be as customizable as possible.
3. Components should be as accessible as possible (falling back to WAI-ARIA attributes when necessary.)

The general idea of this library is to provide ready-to-go solutions for things you really wouldn't want to build yourself, not because they're hard... but because they're hard to design _right_. We are always open to suggestions and strive to keep Boundless as concise and useful as possible.

## Reference styles

A precompiled base "skin" is available to use as a base when customizing Boundless for your own project. Some of the components do rely on the reference layout in their styles to function properly. It is designed to be very unopinionated.

You can find the compiled CSS at `/public/skin.css`. There is a minified version available as well: `/public/skin.min.css`.

The Boundless website is based on this skin with branding colors, etc.

## Branding Boundless

Thanks to the modular nature of [Stylus](http://stylus-lang.com/), injecting your own customization to things like accent color(s) is extremely simple.

In your own project's `.styl` file, define any variable overrides (see [variables.styl](https://github.com/enigma-io/boundless/blob/master/variables.styl) for what variables can be overridden), then import Boundless's master styl file:

```stylus
// first, pull in the variables
@require "node_modules/boundless/variables";

// do overrides as desired...
color-accent = red;

// then pull in the rest of the styles
@require "node_modules/boundless/style";
```

Next time your project's CSS is built, Boundless's CSS will automatically be compiled with the appropriate changes and included in your stylesheet.

## Developing Boundless

```bash
git clone git@github.com:enigma-io/boundless.git boundless
cd boundless

npm i
npm start # runs the development server so you can make changes live ✨
```

<sub>[MIT License](https://github.com/enigma-io/boundless/blob/master/LICENSE)</sub>
