## j-Validation

__Configuration__:

Example: `data-jc-config="if:value.terms && value.newsletter;selector:button[name='submit']`

- `if` {String} can contain a condition for evaluation (optional)
- `selector` {String} jQuery selector for disabling (optional, default: `button[name="submit"]`)
- `timeout` {Number} a timeout for validation (optional, default: `100`)
- `flags` {String} `+v13.0.0` flags for better validation, can contain `visible,hidden,enabled,disabled` components
	- `enabled` validates all components which are enabled `input`, `textarea` or `select` elements
	- `disabled` validates all components which are disabled `input`, `textarea` or `select` elements
	- `hidden` validates all components which are hidden
	- `visible` validates all components which are visible

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT