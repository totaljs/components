## j-CodeMirror

- Works only with [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope"`

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

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT