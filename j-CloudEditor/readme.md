## j-CloudEditor (BETA)

- supports multiple cursors (`shift + cmd + arrow-down/up`)
- supports finding selected text (`cmd + d`)
- supports custom scrollbars
- supports diff tracker
- source-code: <https://github.com/totaljs/editor>
- it uses editor: [CodeMirror](https://codemirror.net/)

__Configuration__:

- `parent {String}` a selector for the main container (default: `auto`)
- `autosave {Boolean}` auto rebinds value from the editor to the component's path (default: `true`)
- `event {String}` a path to the `function(name, value)`
- `contextmenu {String}` a path to the `function(opt)`

__Method__:

- `component.insert('some text')`
- `component.replace('text', 'newvalue')`
- `component.search('text', callback(output))`
- `component.select(from, [to])`
- `component.goto(pos)`
- `component.focus()`
- `component.save(callback(value))`
- `component.markeradd(from, to, name, [color])`
- `component.markerrem(name)`
- `component.clear()` clears all changes
- `component.replaceselections(selections)`
- `component.replaceselection(selection)`
- `component.replacerange(value, from, [to])`

__IMPORTANT__:

`from`, `to`, `pos` arguments must be in the form: `{ line: Number, ch: Number }`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)