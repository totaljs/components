## j-Button

A simple button component with great features.

- fully responsive

__Configuration__:

- `exec {String}` __required__ a path to the `function(el, path)` method
- `icon {String}` Font-Awesome icons (default: `undefined`)
- `color {String}` An icon color (default: `undefined`)
- `validation {Boolean}` Enables validation for all components on the path (default: `true`)
- `delay` {Number} a timeout for validation (default: `100`)
- `name {String}` a name for the `name` attribute (default: `submit`)
- `ddos {String}` A simple DDOS prevetion for multiple clicks, possible values:
	- `undefined` disables prevention
	- `10 seconds`
	- `session`
	- `1 day`
	- etc.
- `if` {String} can contain JS condition for evaluation(optional)
	- `value` {Object} contains entire model
	- `path` {String} contains changed path
	- __must return boolean__
- `track` {String} can contain paths divided by comma which evaluate validation (executors for paths aren't components, but these methods `SET()`, `UPD()`, `INC()`, etc.)
- `validonly` {Boolean} skips `dirty` state (default: `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)