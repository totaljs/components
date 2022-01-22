## j-CloudEditor (BETA)

- it works in the iframe
- supports multiple cursors (`shift + cmd + arrow-down/up`)
- supports finding selected text (`cmd + d`)
- supports custom scrollbars
- supports diff tracker
- supports a simple emmet plugin
- supports real-time collaboration
- source-code: <https://github.com/totaljs/editor>
- it uses editor: [CodeMirror](https://codemirror.net/)
- very small code

__Configuration__:

- `parent {String}` a selector for the main container (default: `auto`)
- `autosave {Boolean}` auto rebinds value from the editor to the component's path (default: `true`)
- `event {String}` a path to the `function(name, value)`
	- `click`
	- `errors`
	- `shortcut`
	- `cursor` contains cursor position
	- `change` contains partial changes for real-time collaboration (`config.realtime` must be `true`)
- `contextmenu {String}` a path to the `function(opt)`
- `realtime {Boolean}` enables realtime sending changes to the `event` method (event name is `change`)

__Method__:

- `component.insert('some text')`
- `component.replace('text', 'newvalue')`
- `component.search('text', callback(output))`
- `component.select(from, [to])`
- `component.goto(pos)`
- `component.focus()`
- `component.save(callback(value))`
- `component.marker(name, [from], [to], [color])` adds + modifies (with `from`) and removes (without `from` argument) marker
- `component.change(changes)` for the real-time collaboration (`changes` can be generated in the `config.event` function)
- `component.clear()` clears all changes
- `component.replaceselections(selections)`
- `component.replaceselection(selection)`
- `component.replacerange(value, from, [to])`

__IMPORTANT__:

`from`, `to`, `pos` arguments must be in the form: `{ line: Number, ch: Number }`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)