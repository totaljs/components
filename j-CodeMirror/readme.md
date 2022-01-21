## j-CodeMirror

- supports multiple cursors (`shift + cmd + arrow-down/up`)
- supports finding selected text (`cmd + d`)
- supports custom scrollbars

__Configuration__:

- `type {String}` type for syntax highlighting (default: `htmlmixed`)
- `required {Boolean}` enables "required" (default: `false`)
- `linernumbers {Boolean}` shows line numbers (default: `false`)
- `icon {String}` icon for label without `fa-` e.g. `home`, `cog`, etc.
- `height {Number}` control height (default: `200` px)
- `label {String}` label (default is HTML content)
- `disabled {Boolean}` disables this component
- `tabs {Boolean}` enables indent with tabs (default: `false`)
- `trim {Boolean}` performs auto-trim and removes empty begin/end lines (default: `false`)
- __NEW__: `parent {String}` can set height by parent element
- __NEW__: `minheight {Number}` a minimal height for `parent` option (default: `200`)

__Method__:

- `component.insert('some text')` inserts a text to the current position of the cursor

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)