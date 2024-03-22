## j-Dashboard

- Works only with `+v18`
- Supports mobile devices
- Supports touches
- Movable
- Draggable
- Resizable

The component expects `Array` of objects.

__Configuration__:

- `axisX {Number}` a size of grid of X axis (default: `12`)
- `axisY {Number}` a size of grid of Y axis (default: `144`)
- `padding {Number}` a padding between widgets (default: `10`)
- `delay {Number}` init delay (default: `200`)
- `serviceinterval {Number}` a service interval (default: `5000`)
- `ondrop {String}` a path to method `function(meta) {}`, is executed if someone drops some element into area
	- `meta.x` X grid position
	- `meta.y` Y grid position
	- `meta.el` dragged element
	- `meta.pageX`
	- `meta.pageY`
	- `meta.offsetX`
	- `meta.offsetY`
	- `meta.target`
	- `meta.d` a display mode `xs`, `sm`, `md` or `lg`
- `noemitresize` disables executing of `resize` method in all nested component (default: `false`)
- `parent {String}` a parent container which sets a minimal height (default: `null`)
- `minsizexs {Number}` a minimal column/row size for extra small displays (default: `2`)
- `minsizesm {Number}` a minimal column/row size for small displays (default: `2`)
- `minsizemd {Number}` a minimal column/row size for mediun displays (default: `1`)
- `minsizelg {Number}` a minimal column/row size for large displays (default: `1`)
- `iconsettings {String}` settings icon
- `iconremove {String}` remove icon
- `change {String}` a path to the method `function(type, id)` (executed if the dashboard captures a change `move` or `remove`)
- `animation {Number}` style of animation:
	- `1` opacity
	- `2` scale from big to normal
	- `3` scale from small to normal (__default__)
	- `4` rotation Z
	- `5` changing of X position
	- `6` changing of Y position
- `grid {Boolean}` renders background grid (default: `false`)

```js
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

	html: 'THE CONTENT OF COMPONENT', // or can be raw HTMLElement

	// Default settings
	actions: { move: true, remove: true, resize: true, resizeX: true, resizeY: true, resizeP: false, settings: true },
	// resizeP means: resize "proportionally"

	// Can disable header (default: true)
	header: true,

	// Can delay displaying (in "ms", default: config.delay)
	delay: 0,

	// A component title
	title: 'Title for the component',

	// Custom properties which will be assigned to the instance
	template: Object,
	config: Object,
	// reset: true, // NEW: reloads the component again
	// class: String // adds a class to the item

	make: function(exports, config, el) {

		// @exports {Object}
		// @config {Object}
		// @el {jQuery} a content of the component

		// Handlers (optional):
		exports.destroy = function() {
			// @el {jQuery} a content of the component
			// @this {Instance}

			// is executed when the component is destroyed
		};

		exports.data = function(data, el) {
			// @data {Object}
			// @this {Instance}
			// @el {jQuery} a content element of the component
			// It can be executed via SETTER('dashboard/send', ....)
		};

		exports.service = function(counter, el) {
			// @counter {Number} count of calls
			// @el {jQuery} a content of the component
			// @this {Instance}
			// dashboard will execute this handler each 5 seconds
		};

		exports.focus = function() {
			// Optional, when the "window" is focused the delegate will be executed
		};

		exports.resize = function(width, height, el, display) {
			// @width {Number}
			// @height {Number}
			// @el {jQuery} a content of the component
			// @display {String} a current display size "xs", "sm", "md" or "lg"
			// @this {Instance}
			// is executed when the component is resized
			// @this {Instance}
		};

		exports.settings = function(config, el, elbtn) {
			// @config {Object}
			// @el {jQuery} a content element of the component
			// @elbtn {jQuery} button element
			// is executed when the users clicks on the settings icon
		};

		exports.remove = function(remove) {
			// remove {Function} removes that widget
			remove();
		};

		exports.configure = function(config) {
			// @config {Object}
			// is executed when the configuration is changed
		};

		// this.meta {Object} a reference to component object
		// this.element {jQuery} a content element of the component
		// this.container {jQuery} a main content element of the component
		// this.main {Object} a reference to Dashboard component
		// this.width {Number} a width of "this.element"
		// this.height {Number} a height of "this.element"
		// this.display {String} a current display size "xs", "sm", "md" or "lg"

		// is executed when the component is making
	}
};

PUSH('components', component);
```

__Methods__:

- `SETTER('dashboard/send', id, body)` sends data to all widgets which contain `data` delegate
	- `id {String}`
		- `null` sends to all components
		- `@component` sends to the specific components according to the component name
		- `string` sends to a specific component according to the identifier
- `SETTER('dashboard/call', method_name, [a], [b], [c], [d])` executes a method in each widget
- `RETURN('dashboard/pixel')` returns a size of the pixel (square)
- `RETURN('dashboard/display')` returns a current display width

__Good to know__:

- component adds classes to component's body:
	- `d_colNUMBER` determins count of taken columns e.g. `d_col2`
	- `d_rowNUMBER` determins count of taken rows e.g. `d_row3`
	- `d_square` the component has same width/height
	- `d_vertical` the component has only 1 step of width and more than 1 steps of height
	- `d_horizontal` the component has only 1 step of height and more than 1 steps of width

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)