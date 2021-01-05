## j-Edit

This component can edit elements with `edit` class, in other words: the component executes only the method which can execute e.g. `FloatingInput`, `ColorPicker`, etc..

__Configuration__:

- `type {String}` event type `click` or __`dblclick`__ (default)
- `id {String}` attribute for obtaining of identifier, components browses all parent elements (default: `data-id`)
- `exec {String}` a link to `function(meta, e)` which is executed if the user tries to edit element
    - `meta` contains all custom values from defines in `data-edit` attribute
	- `meta.element` element which has `edit` class
	- `meta.path` contains a path defined in `j-Edit` component
	- `meta.component` contains an instance of `j-Edit` component
	- `meta.model` contains a value/object according to the `component.path`
	- `meta.event` contains click event object
	- `meta.id` contains an identifier according to the `config.id`
	- `meta.parent` contains an element which contained `config.id`

---

`data-edit` attribute can contains

- `exec {String}` a link to `function(meta, e)`
- or your custom values `key:value` in the form of jComponent configuration structure

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)