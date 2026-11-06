---
name: listdetail
description: Splits content into a list and a resizable detail panel, side by side or stacked, with the detail shown when the path has a value
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2022-06-24 13:56
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ListDetail

The component divides the content for listing part and detail part. Displaying of detail part depends on the `path {Boolean}`.

__Configuration__:

- `parent {String}` parent element for obtaining of width/height (default: `auto`)
- `margin {Number}` a margin for height (default: `0`)
- `width {Number/String}` a detail panel width (default: `35%`)
- `minwidth {Number/String}` a minimal width of the detail panel (default: `20%`)
- `maxwidth {Number/String}` a maximal width of the detail panel (default: `50%`)
- `resize {Boolean}` enables/disables detail panel resizing (default: `true`)
- __NEW__: `position {String}` split orientation: `vertical` (side-by-side) or `horizontal` (stacked) (default: `vertical`)
- __NEW__: `height {Number/String}` a detail panel height (only for `position:horizontal`; when set, it overrides `width` for sizing the detail panel) (default: `null`)
- __NEW__: `minheight {Number/String}` a minimal height of the detail panel (only for `position:horizontal` + `height`) (default: `null`)
- __NEW__: `maxheight {Number/String}` a maximal height of the detail panel (only for `position:horizontal` + `height`) (default: `null`)

Parts: list + detail must be wrapped to independent `<section>` element, e.g.

```html
<ui-component name="listdetail__...">
	<section>
		LIST
	</section>
	<section>
		DETAIL
	</section>
</ui-component>
```
