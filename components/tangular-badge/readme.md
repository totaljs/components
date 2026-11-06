---
name: tangular-badge
description: Tangular helper that renders colored badge elements for a label or a list of labels.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2025-03-24 11:11
updated: 2026-11-03 11:05
jcomponent: v19,v20
---

# Tangular-Badge

This helper makes a `<span class="badge"></span>` element (use [`IntranetCSS`](https://componentator.com/components/intranet-css/)) with colorized background.

- Predefined colors can be changed via `DEF.badgecolors = [hex, hex, hex, ...]`

```js
Thelpers.badge(label, [size]);
// @label {String|String Array}
// @size {String} small, medium (large), large
```

__Tangular__:

```html
<div>{{ tag | badge }}</div>
<div>{{ tag | badge('large') }}</div>
```
