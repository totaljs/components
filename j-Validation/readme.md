## j-Validation

__Configuration__:

- `if` {String} can contain JS condition for evaluation(optional)
	- `value` {Object} contains entire model
	- `path` {String} contains changed path
	- __must return boolean__
- `selector` {String} jQuery selector for disabling (optional, default: `button[name="submit"]`)
- `timeout` {Number} a timeout for validation (optional, default: `100`)
- `flags` {String} `+v13.0.0` flags for better validation, can contain `visible,hidden,enabled,disabled` components
	- `enabled` validates all components which are enabled `input`, `textarea` or `select` elements
	- `disabled` validates all components which are disabled `input`, `textarea` or `select` elements
	- `hidden` validates all components which are hidden
	- `visible` validates all components which are visible
- `track` {String} can contain paths divided by comma which evaluate validation (executors for paths aren't components, but these methods `SET()`, `UPD()`, `INC()`, etc.)
- `validonly` {Boolean} skips `dirty` state (default: `false`)


__Good to know__:

- component adds `ui-validation-ok` to the element if the model is valid
- component adds `ui-validation-no` to the element if the model is invalid

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)