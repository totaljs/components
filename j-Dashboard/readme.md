## j-Dashboard (BETA)

- Works only with `+v18`
- Supports mobile devices
- Supports touches
- Movable
- Draggable
- Resizable

The component expects `Array` of objects.

__Configuration__:

- `axisX` {Number} a size of grid of X axis (default: `12`)
- `axisY` {Number} a size of grid of Y axis (default: `144`)
- `padding` {Number} a padding between widgets (default: `10`)
- `delay` {Number} init delay (default: `200`)
- `ondrop` {String} a path to method `function(meta) {}`, is executed if someone drops some element into area
	- `meta.x` X grid position
	- `meta.y` Y grid position
	- `meta.el` dragged element
	- `meta.pageX`
	- `meta.pageY`
	- `meta.offsetX`
	- `meta.offsetY`
	- `meta.target`
	- `meta.d` a display mode `xs`, `sm`, `md` or `lg`

```javascript
// Component declaration
var component = {

	// Component ID
	id: 'COMPONENT_ID',

	// Positioning
	// You can define specific display size and if the display size is not specified then the component tries to find a size for larger display
	offset: {
		xs: { x: 1, y: 1, width: 6, height: 6 }, // Number means the position in the grid, so e.g. width "2" takes "2" columns in X axis
		lg: { x: 1, y: 1, width: 6, height: 6 }
	},

	html: 'THE CONTENT OF COMPONENT',

	// Default settings
	actions: { move: true, remove: true, resize: true, settings: true },

	// Can disable header (default: true)
	header: true,

	// A component title
	title: 'Title for the component',

	// Handlers (optional):
	destroy: function() {
		// @el {jQuery} a content of the component
		// @this {Instance}

		// is executed when the component is destroyed
	},

	make: function(el) {

		// @el {jQuery} a content of the component
		// @this {Instance}

		// this.meta {Object} a reference to component object
		// this.element {jQuery} a content element of the component
		// this.contianer {jQuery} a main content element of the component
		// this.main {Object} a reference to Dashboard component
		// this.width {Number} a width of "this.element"
		// this.height {Number} a height of "this.element"
		// this.display {String} a current display size "xs", "sm", "md" or "lg"

		// is executed when the component is making
	},

	data: function(type, data, el) {

		// @type {String}
		// @data {Object}
		// @this {Instance}
		// @el {jQuery} a content element of the component

		// is executed when data are sent via SETTER('dashboard', 'send', 'TYPE', 'DATA')
	},

	resize: function(width, height, el, display) {

		// @width {Number}
		// @height {Number}
		// @el {jQuery} a content of the component
		// @display {String} a current display size "xs", "sm", "md" or "lg"
		// @this {Instance}

		// is executed when the component is resized
		// @this {Instance}
	},

	service: function(counter, el) {

		// @counter {Number} count of calls
		// @el {jQuery} a content of the component
		// @this {Instance}

		// dashboard will execute this handler each 5 seconds
	}
};

PUSH('components', component);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)