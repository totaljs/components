---
name: FaIcons
description: Searchable singleton picker of Font Awesome icons with a scrollable list, including pro icons when they are available
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-09-11 11:23
updated: 2025-08-05 10:43
jcomponent: v19
---

# FaIcons

- Font-Awesome Icons
- singleton
- supports pro icons

__Configuration__:

- `search {String}` a placeholder for search field (default: `Search`)

## Usage

```js
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`
// opt.empty {Boolean}     : adds empty icon (default: false)

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.callback = function(icon) {
	console.log(icon);
};

SETTER('faicons/show', opt);
```
