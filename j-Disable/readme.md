## j-Disable

The component disables nested controls like `input`, `select` and `textarea`.

__Attributes__:
- `data-if` can contain a condition for validating
- `data-selector` can contain custom element selector, default: `input,texarea,select`
- `data-validate` can contain only paths separated with comma, e.g. `form.email,form.name`, the component performs `jC.reset(path)`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT