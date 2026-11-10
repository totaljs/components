---
name: Error
description: Displays the error messages from an array of objects with an error property, hidden when the array is empty
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-03-08 10:22
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Error

- easy usage
- errors are displayed only if the path contains an array in the form below:

```js
[
	{ error: 'Error Message 1' },
	{ error: 'Error Message 2' }
]
```

__Configuration__:
- `icon {String}` an error icon (default: `warning`)
