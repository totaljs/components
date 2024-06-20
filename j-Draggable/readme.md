# j-Draggable

A simple component which can capture drag & drop operation.

- jComponent `v19|v20`

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