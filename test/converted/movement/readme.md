---
name: movement
description: This component captures basic keyboard keys like arrows, enter and esc.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2021-07-19 13:30
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Movement

This component captures basic keyboard keys like `arrows`, `enter` and `esc`.

__Methods__:

- `component.assign(ondown(key, e), [onunassign])`

The `assign` method will clear previous assignments and applies new ones. We recommend calling the `assign` method to your elements when they are focused, or the user clicks on them.

__Usage__:

```js
SETTER('movement/assign', function(key, e) {
	// @key {String}
	// @ {Event}
	switch (key) {
		case 'up':
		case 'down':
		case 'right':
		case 'left':
		case 'esc':
		case 'enter':
			break;
	}
});
```
