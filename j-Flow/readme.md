## j-Flow

- Works only with `+v18`
- identifiers can't contain `__` char

__Configuration__:

- `width {Number}` a width of Flow designer, default: `6000`
- `height {Number}` a height of Flow designer, default: `6000`
- `grid {Number}` a size of background grid, default: `25`
- `paddingX {Number}` internal padding, default: `6`
- `curvedlines {Boolean}` enables curved lines, default: `false`
- `infopath {String}` a path to variable/method, response: `{ zoom: Number, selected: Object }`
- `undopath {String}` a path to variable/method, response is Object array
- `redopath {String}` a path to variable/method, response is Object array
- `ondrop {String}` a path to method `fn(dropmeta, grid)`
- `onmake {String}` a path to method `fn(el, com)`, it's executed when the component is creating
- `ondone {String}` a path to method `fn(el, com)`, it's executed when the component is created
- `onmove {String}` a path to method `fn(el, com/group, type)`, it's executed when the component/group is moving
- `onremove {String}` a path to method `fn(el, com)`, it's executed when the component is removed
- `onconnect {String}` a path to method `fn(meta)`, it's executed when the two components are connected
- `ondisconnect {String}` a path to method `fn(meta)`, it's executed when the two components are disconnected
- __NEW__ `onpause {String}` a path to method `fn(path, is)`, it's executed when the output/input is paused
- `steplines {Boolean}` enables step lines (default: `false`)
- `animationradius {Boolean}` animation radius in pixels (default: `6`)
- `contextmenu {String}` a path to `function(e, type, component/meta)` (type can be `map`, `component` or `connection`)
- `dblclick {String}` a path to `function(component)`
- `outputoffsetX {Number}` a default X offset for output point (default: `10`)
- `outputoffsetY {Number}` a default Y offset for output point (default: `12`)
- `inputoffsetX {Number}` a default X offset for input point (default: `10`)
- `inputoffsetY {Number}` a default Y offset for input point (default: `12`)
- `snapping {Number}` snapping in pixels (default: `0` = disabled)
- __NEW__ `multiple {Boolean}` enables multiple selecting of the component (default: `true`)
- __NEW__ `history {Number}` a count of steps in the undo/redo history (default: `100`)
- __NEW__ `animationlimit {Number}` a maximum count of dots for all animations (default: `100`)
- __NEW__ `animationlimitconnection {Number}` a maximum count of dots per connection (default: `5`)
- __NEW__ `allowpause {Boolean}` allows pausing on outputs/inputs (default: `true`)

__Commands__:

- `flow.refresh` recalculates positions
- `flow.selected.disconnect` disconnects selected connection
- `flow.selected.remove` removes selected component
- `flow.selected.clear` removes selected component or connection
- `flow.zoom` performs zoom, argument: `type` (can be: `in`, `out`, `reset`), second optional argument: `percentage`
- `flow.undo` performs undo step
- `flow.redo` performs redo step
- `flow.reset` resets editor
- `flow.components.add` adds a new component, argument: `component_declaration`
- `flow.components.find` finds a component, argument: `component_id`
- `flow.clean` cleans data and non-exist connections
- `flow.traffic(componentid__outputid, { count: 3, speed: 3, limit: 20, delay: 50 })` loads animation
- __NEW__ `flow.groups.find` finds a group, argument: `group_id`
- __NEW__ `flow.check` a new faster alternative to the `flow.refresh` command
- __NEW__ `flow.find` finds a component or group, argument: `component_id` or `group_id`

__Adding a new component__:

- the component automatically creates ID of component
- `connections` is `{Object}`

```js
// Component declaration
var component = {
	x: 100,
	y: 50,
	html: 'Component test',

	outputs: ['1 output name', '2 output name'],
	// or
	// outputs: [{ id: 'A', 'A output name' }, { id: 'B', 'B output name' }],

	connections: { '0': [{ id: '0002', index: '2', disabled: false }] }, // Look to the connection object below
	// or
	// connections: { 'A': [{ id: '0002', index: 'B', disabled: false }] },

	actions: { select: true, move: true, disabled: false, remove: true, connect: true }
};

// Appends component
CMD('flow.components.add', component);
```

```js
// Connection object
// connections: { '0': [CONNECTION_OBJECT1, CONNECTION_OBJECT2, CONNECTION_OBJECT3] }
{
	id: 'TARGET_ID_COMPONENT',
	index: '0', // An input index or index id, must be string!!!
	disabled: false // Optional, it's the connection disabled? Disabled connection can't be removed
}
````

__Flow output__:

- returns `Object` which keys are `ID` of components

```js
{
	'F1562743923216': { x: 1, y: 1, connections: [], ... },
	'F1562743965303': { x: 1, y: 1, connections: [], ... },

	// Contains paused endpoints
	paused: { 'input__COMPONENTID__INDEXID': 1, 'output__COMPONENTID__INDEXID': 1 },

	// Contains groups
	groups: [{ id: 'GroupID', name: 'Name', x: 100, y: 100, width: 100, height: 100, background: 'rgba(0,0,0,0.1)', color: '#000', border: 'rgba(0,0,0,0.1)' }, ...];
}
````

__Good to know__:

- each component (in the Flow) contains `f-COMPONENTNAME` class
- `selectable` class in the component element enables copying text and disables moving

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)