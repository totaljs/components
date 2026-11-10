---
name: HashChange
description: The component captures all changes for #hashtag in the URL address.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-09-18 15:02
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# HashChange

The component captures all changes for `#hashtag` in the URL address. When change, it emits event `hash`. The component reacts to the real changes.

- singleton

__Configuration__:

- `delay {Number}` a delay for emitting `hash` event (default: `0`)
- __NEW__: `middleware {String}` a middleware (separated by the comma) for initial emit of the `hash` event

__How to capture hash change?__

```js
// Global:
ON('hash', function(hash) {
	// @hash {String} - it can be "empty"
});

// Or in the Plugin declaration:
exports.on('hash', function(hash) {

});
````
