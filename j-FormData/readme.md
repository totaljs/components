## j-FormData

With this component you can send data via the POST/PUT/DELETE method to the current window or another.

- jComponent `v19|v20`
- singleton

### Configuration

- `method {String}` a default HTTP method (default: `POST`)
- `target {String}` a default target (default: `_blank`)
- `type {String}` a default form type (default: `application/x-www-form-urlencoded`)

### Methods

- `component.send(opt)`
	- `opt.method {String}` form method, default `config.method`
	- `opt.target {String}` form target, default `config.target`
	- `opt.type {String}` form type, default `config.target`
	- `opt.url {String}` __required__ URL address
	- `opt.data {Object}` __required__ form data in the form `{ key1:value, key2:value }`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)