## j-Selected

The component can set a specific class to a specific element according to the simple condition.

__Configuration__:

Example: `data-jc-config="class:selected;selector:a"`

- `class` {String} (optional) is a class name for selected element
- `selector` {String} (optional) is a jQuery selector

__Usage__:

Each nested element according to the `selector` must have defined `data-if` attribute. It works only with `strings` values.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT