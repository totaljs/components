## j-Flow

- Works only with `+v17`
- the component adds custom scrollbars automatically

__Configuration__:

- `width` {Number} a width of Flow designer, default: `6000`
- `height` {Number} a height of Flow designer, default: `6000`
- `gridsize` {Number} a size of background grid, default: `25`
- `gridcolor` {String} a stroke color, default: `#F8F8F8`
- `gridstroke` {Number} a stroke width, default: `2`
- `paddingX` {Number} internal padding, default: `6`
- `curvedlines` {Boolean} enables curved lines, default: `false`
- `infopath` {String} a path to variable/method, response: `{ zoom: Number, selected: Object }`
- `undopath` {String} a path to variable/method, response is Object array
- `redopath` {String} a path to variable/method, response is Object array
- `ondrop` {String} a path to method `fn(dropmeta, grid)`
- `onmake` {String} a path to method `fn(el, com)`, it's executed when the component is creating
- `ondone` {String} a path to method `fn(el, com)`, it's executed when the component is created
- `onmove` {String} a path to method `fn(el, com)`, it's executed when the component is moving
- `onremove` {String} a path to method `fn(el, com)`, it's executed when the component is removed
- `onconnect` {String} a path to method `fn(meta)`, it's executed when the two components are connected
- `ondisconnect` {String} a path to method `fn(meta)`, it's executed when the two components are disconnected

__Commands__:

- `flow.refresh` recalculates positions
- `flow.selected.disconnect` disconnects selected connection
- `flow.selected.remove` removes selected component
- `flow.selected.clear` removes selected component or connection
- `flow.zoom` performs zoom, argument: `type` (can be: `in`, `out`, `reset`)
- `flow.undo` performs undo step
- `flow.redo` performs redo step
- `flow.reset` resets editor
- `flow.components.add` adds a new component, argument: `component_declaration`

__Adding a new component__:

- the component automatically creates ID of component
- `connections` is `{Object}`

```javascript
// Component declaration
var component = {
	x: 100,
	y: 50,
	html: 'Component test',
	outputs: ['1 output name', '2 output name'],
	connections: { '0': [{ id: '0002', index: '2', disabled: false }] }, // Look to the connection object below
	actions: { select: true, move: true, disabled: false, remove: true, connet: true }
};

// Appends component
CMD('flow.components.add', component);
```

```javascript
// Connection object
// connections: { '0': [CONNECTION_OBJECT1, CONNECTION_OBJECT2, CONNECTION_OBJECT3] }
{
	id: 'TARGET_ID_COMPONENT',
	index: '0', // An input index, must be string!!!
	disabled: false // Is the connection disabled? Disabled connection can't be removed
}
````

__Flow output__:

- returns `Object` which keys are `ID` of components

```javascript
{
	'F1562743923216': { x: 1, y: 1, connections: [], ... },
	'F1562743965303': { x: 1, y: 1, connections: [], ... },
}
````

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT