---
name: Tooltip
description: Singleton tooltip shown next to an element with HTML content, offset, alignment and optional auto-hide timeout
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-10-20 17:52
updated: 2023-01-21 23:04
jcomponent: v19
---

# Tooltip

- singleton
- universal usage
- __NEW__ hide (`SETTER('tooltip', 'hide', [force])`) now supports the `force` parameter for instant hide.

__METHODS__

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `bottom` (default), `top`, `left` or `right`
// opt.center {Boolean}    : centered position for `left` and `right` align (default: false)
// opt.timeout {Number}    : hide timeout (in milliseconds), default: `undefined`

opt.element = YOUR_ELEMENT;
opt.html = 'YOUR_HTML_CONTENT';

SETTER('tooltip', 'show', opt);
```
