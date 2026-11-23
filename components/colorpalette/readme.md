---
name: ColorPalette
description: Singleton colour picker next to an element or a point, with shades, the colours in use, any colour and the format of the value kept
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-21 08:06
updated: 2026-11-23 13:07
jcomponent: v20
---

# ColorPalette

A small panel to choose a colour. It opens next to an element (or a point of the window) with a sample (black and white text on the colour), a field that takes any CSS colour, the colour picker of the browser, a copy button, a palette of 12 hues in 6 shades and 12 greys, and the colours already in use.

The chosen colour comes back **written like the current one**: `#f97316` stays a lower case hex, `rgb(...)` stays `rgb(...)`, `hsla(...)` stays `hsla(...)`, and the alpha of the current colour stays when the new one has none. Without a current value it is an upper case hex (`#F97316`).

- A click on a swatch, `Enter` in the field or the apply button returns the colour.
- Keyboard: arrows move through the swatches, `Escape` closes. The focus goes back where it was.
- It closes with a click outside, `Escape` or a resize of the window.

__Configuration__:

- `label {String}` accessible name of the colour field (default: `Colour`)
- `custom {String}` title of the button with the colour picker of the browser (default: `Any colour`)
- `copy {String}` title of the copy button (default: `Copy`)
- `apply {String}` text of the apply button (default: `Apply`)
- `used {String}` title of the colours in use, see `opt.colors` (default: `Used colours`)

## Usage

```javascript
var opt = {};

// opt.element {Element}   : the panel opens under it (above it when there is no room); a second show for the same element closes it
// or a point of the window:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position
// opt.height {Number}     : height of the place at the point, e.g. a line of text, to open above it when there is no room below
// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.value {String}      : the current colour, any CSS colour; the result keeps its format
// opt.colors {String[]}   : colours already in use, shown under the palette (at most 24, without repeats)

opt.element = YOUR_ELEMENT;

opt.callback = function(color) {
	console.log(color); // "rgb(37, 99, 235)" when opt.value was an rgb() colour
};

SETTER('colorpalette/show', opt);
```

__Methods__:

- `SETTER('colorpalette/show', opt)` opens the picker
- `SETTER('colorpalette/hide')` closes it

__Good to know__:

- Singleton: one `<ui-component name="colorpalette"></ui-component>` on the page serves every opener.
- The colour of the apply button and of the focus is the colour of the library (`--color`).
- The component supports dark mode (`.ui-dark`).
- jComponent v20.
