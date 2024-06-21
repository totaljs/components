## j-Kanban

- jComponent `v19|v20`

__Configuration__:

- `parent {String}` a container with fixed height, can be `window`. Default value: `parent` element.
- `margin {Number}` a top/bottom margin together (default: `0`)
- `padding {Number}` a padding between panels (default: `10`)
- `style {Number}` a style, `1` (default): boxes will have a full-height, `2` boxes will have `max-height `
- `move {String}` a path to method `function(group, target)`, is executed if the user moves an item to another group
- `remove {String}` a path to method `function(group)`, is executed if the user removes an item in group
- `dblclick {String}` a path to method `function(group)`, is executed if the user performs double click

__Methods__:

- `component.remove(id)` can remove an item in group
- `component.findgroup(id)` returns a group instance

__Important__: each item needs own ID {String}, look to example.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
