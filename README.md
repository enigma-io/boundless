# Boundless

[![Build Status](https://travis-ci.com/enigma-io/boundless.svg?token=hxqSwGHKT9sQ6YJSerRg&branch=master)](https://travis-ci.com/enigma-io/boundless) [![codecov](https://codecov.io/gh/enigma-io/boundless/branch/master/graph/badge.svg?token=p755jHqDqi)](https://codecov.io/gh/enigma-io/boundless)


## Installation

```bash
npm i boundless@beta
```

## Reference styles

A precompiled base "skin" is available to use as a base when customizing Boundless for your own project. Some of the components do rely on the reference layout in their styles to function properly. It is designed to be very unopinionated.

You can find the compiled CSS at `/public/skin.css`. There is a minified version available as well: `/public/skin.min.css`.

The Boundless website is based on this skin with branding colors, etc.

## Branding Boundless

Thanks to the modular nature of [Stylus](http://stylus-lang.com/), injecting your own customization to things like accent color(s) is extremely simple.

In your own project's `.styl` file, define any variable overrides (see [style.styl](https://github.com/enigma-io/boundless/blob/master/style.styl) for what variables can be overridden), then import Boundless's master styl file:

```stylus
color-accent = red;

@import "node_modules/boundless/style";
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
