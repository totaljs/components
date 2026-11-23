---
name: useravatar
description: Deterministic SVG avatar generated in the browser from a name, an email, an ID or an object, in six styles and with the colour of the app
author: Gera G. Güiles
version: 1
darkmode: true
license: MIT
created: 2026-11-22 21:19
updated: 2026-11-22 21:19
jcomponent: v20
---

# Useravatar

An avatar drawn as SVG from a value: the same value always gives the same avatar. It is an adaptation of [Boring Avatars](https://github.com/boringdesigners/boring-avatars) without React, images, canvas or requests: the name or email never leaves the browser.

The model is a `String` (a name, an email, an ID) or an `Object`. From an object the component reads `email`, `name` or `id`, in this order, or the property in `key`. An empty value uses `value`, and without it `Total.js`.

- The seed is not case sensitive: `Ada@Example.com` and `ada@example.com` are the same avatar.
- Six styles: `marble`, `beam`, `pixel`, `sunset`, `ring` and `bauhaus`. Without `variant`, the style is chosen from the value, so it is stable too.
- Without `color` and `colors`, the palette is made from the primary colour of the app (`--color`, `--primary`, `--primary-color` or `--color-primary` of the element). Without any of them, the original palette of Boring Avatars is used.
- The avatar is decorative by default (`aria-hidden`), because it is usually next to the name. With `title:true` it is an image with the name as its accessible label and tooltip.
- In dark mode the avatar keeps its colours and gets a thin ring.

__Configuration__:

- `size {Number}` width and height in pixels (default: `40`)
- `variant {String}` a fixed style: `marble`, `beam`, `pixel`, `sunset`, `ring` or `bauhaus`; empty chooses it from the value (default: `''`)
- `color {String}` a hex colour for a palette of five shades of it; `random` uses the original palette of Boring Avatars (default: `''`)
- `colors {String}` a custom palette, hex colours separated with commas, example: `#FF6B6B,#FFD93D,#6BCB77`; it wins over `color` (default: `''`)
- `square {Boolean}` a square avatar instead of a circle (default: `false`)
- `title {Boolean}` the avatar is an image named by the value, with a tooltip (default: `false`)
- `key {String}` the property of the object that is the seed, example: `login` (default: `''`)
- `value {String}` the seed when the model is empty (default: `''`)

__Runtime__: jComponent v20, no dependencies.

## Attribution

The algorithms and SVG compositions of the avatars come from Boring Avatars:

```
Boring Avatars
Copyright (c) 2021 boringdesigners

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
