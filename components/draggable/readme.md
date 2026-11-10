---
name: Draggable
description: A simple component which can capture drag & drop operation.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-10-05 22:45
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Draggable

# j-Draggable

A simple component which can capture drag & drop operation.

__Configuration__:

- `selector {String}` jQuery selector for capturing of element for "drag"
- `exec {String}` a path to method `function(meta, el)`

```javascript
function method(meta, el) {
	// meta.pageX;    {Number}
	// meta.pageY;    {Number}
	// meta.offsetX;  {Number}
	// meta.offsetY;  {Number}
	// meta.el;       {jQuery element} dragged element
	// meta.target;   {jQuery element} target (where the element has been dropped?)
}
```
