## j-SearchBox

The component contains a search box (input).

- jComponent `v19|v20`

__Configuration__:

- `exec {String}` a link to the `function(model, component, changetype)`, it will be executed if the user presses enter
- `autocomplete {String}` a link to the `function(component, input)`, it will be executed if the user focuses the search box
- `init {String}` a link to the `function(component)`, it will be executed if the component is initialized
- `placeholder {String}` a placeholder for the search box
- `cleartype {Boolean}` clears type when the user will perform `ESC` (default: `false`)
- `keypress {Boolean}` key-press binding (default: `false`)
- `autotrim {Boolean}` trims the value automatically (default: `true`)
- `clicktype {String}` a link to the `function(component, currenttype, currentvalue)`, it will be executed if the user clicks on the `type` (a new `type` must be set via `component.type(html, value)`)

__Methods__:

- `component.type(html, id, [noemit])` adds a new type before the search input
- `component.enter()` performs searching manually
- __NEW__: `component.show()` focuses the input

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)