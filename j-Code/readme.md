## j-Code

It's a simple alternative to `j-CloudEditor`. You can specify the main configuration in the config, and the value is `{String}` (in `j-CloudEditor` is configuration part of value). It's the same component as `j-CloudEditorSimple`.

- jComponent `v19|v20`
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
- `autosave {Number}` auto rebinds value from the editor to the component's path (in milliseconds, default: `500`)
- `event {String}` a path to the `function(name, value)`
	- `click`
	- `errors`
	- `shortcut`
	- `cursor` contains cursor position
	- `change` contains partial changes for real-time collaboration (`config.realtime` must be `true`)
- `contextmenu {String}` a path to the `function(opt)`
- `realtime {Boolean}` enables realtime sending changes to the `event` method (event name is `change`), default: `true`
- `keywords {String}` custom keywords in the form e.g. `ID,PATH`
- `minheight {Number}` optional, a minimal height (default: `0`)
- `margin {Number}` optional, a vertical margin (default: `0`)
- `linenumbers {Boolean}` optional, enables line numbers (default: `true`)
- `type {String}` optional, content-type (default: `clientside`)
- `url {String}` optional, a link to the editor (default: `//cdn.componentator.com/editor/1.min.html`)

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
- `component.command(cmd)` executes `codemirror.execCommand()` method
- `component.exec(a, [b], [c])` executes `document.execCommand(a, b, c)` method

__IMPORTANT__:

`from`, `to`, `pos` arguments must be in the form: `{ line: Number, ch: Number }`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)