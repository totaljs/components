## j-CodeMirror

- supports multiple cursors (`shift + cmd + arrow-down/up`)
- supports finding selected text (`cmd + d`)
- supports custom scrollbars

__Configuration__:

- `type` {String} (optional) type for syntax highlighting (default: `htmlmixed`)
- `required` {Boolean} (optional) enables "required" (default: `false`)
- `linernumbers` {Boolean} (optional) shows line numbers (default: `false`)
- `icon` {String} (optional) icon for label without `fa-` e.g. `home`, `cog`, etc.
- `height` {Number} (optional) control height (default: `200` px)
- `label` {String} (optional) label (default is HTML content)
- `disabled` {Boolean} (optional) disables this component
- `tabs` {Boolean} (optional) enables indent with tabs (default: `false`)
- `trim` {Boolean} (optional) performs right auto-trim and removes empty begin/end lines (default: `false`)

__Method__:

- `component.insert('some text')` inserts a text to the current position of the cursor

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT