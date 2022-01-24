## j-AutoExec

This component automatically executes a method defined in `exec` option.

__Configuration__:

- __IMPORTANT__: `exec {String}` a path to the method `function(el, value)`
- `delay {Number}` a delay for evaluating code (default: `0`)
- `init {Boolean}` executes initial value (default: `false`)
- `input {Boolean}` executes value binded by the input (default: `true`)
- `manually {Boolean}` executes value binded manually via `SET()`, `INC()`, etc. method (default: `false`)
- `track {String}` can contain partial paths divided by the comma

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)