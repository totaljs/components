## j-Disable

The component disables nested controls like `input`, `select` and `textarea`.

__Configuration__:
- `if` can contain a condition for validating
- `selector` can contain custom element selector, default: `input,texarea,select`
- `validate` can contain only paths separated with comma, e.g. `form.email,form.name`, the component performs `jC.reset(path)`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT