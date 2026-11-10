---
name: ColorPicker
description: Singleton color picker popup placed next to an element, with offsets, alignment and opacity for hex colors
author: Denis Granec
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-03-25 14:47
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ColorPicker

- Component is __singleton__
- Simple color picker
- Supports __Dark theme__

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`
// opt.opacity {Number}    : converts hex color to RGBA with the opacity e.g. 0.3

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.callback = function(color) {
	console.log(color); // callback parameter has string with HEX color (like #bada55)
};

SETTER('colorpicker/show', opt);
```
