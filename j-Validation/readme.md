## j-Validation

The component contains the same source-code as the `j-Validate` component.

- jComponent `v19|v20`

__Configuration__:

- `if {String}` can contain JS condition for evaluation
	- `value {Object}` contains entire model
	- `path {String}` contains changed path
	- __must return boolean__
- `selector {String}` jQuery selector for disabling (default: `button[name="submit"]`)
- `delay {Number}` a timeout for validation (default: `100`)
- `flags {String}` flags for better validation, can contain `visible,hidden,enabled,disabled` components
	- `enabled` validate all components which are enabled `input`, `textarea` or `select` elements
	- `disabled` validate all components which are disabled `input`, `textarea` or `select` elements
	- `hidden` validate all components which are hidden
	- `visible` validate all components which are visible
- `track {String}` can contain paths divided by the comma, and manual changing of each path (via `SET()`, `UPD()`, `INC()`, etc. methods) will evaluate the validation
- `validonly {Boolean}` skips `dirty` state (default: `false`)
- __NEW__ `changes {Boolean}` enables comparing changes only between the input model and the form (default: `false`)
- __NEW__ `strictchanges {Boolean}` enables strict comparing changes (otherwise `null`, `false`, `empty strings` and `0` values will be removed), default: `false`
- __NEW__ `exec {String}` optional, a link to the `function(data)` that is executed when the model is validated and changed
- __NEW__ `output {String}` optional, a link to the `function(valid)` or path

__Good to know__:

- component adds `ui-validate-ok` class to the element if the model is valid
- component adds `ui-validate-no` class to the element if the model is invalid
- component adds `ui-validate-modified` class to the element if the model is changed

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)