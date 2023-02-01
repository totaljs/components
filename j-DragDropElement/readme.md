## j-DragDropElements

On `drag` event displays modal inside given element with text `Drop & drop files here`. On moving dragged files away from element or dropping dragged files modal will hide. Also on `drop` event `exec` function is executed.

__Configuration__

- `exec` {String} - the component executes this method if the files are dropped
- `class` {String} - toggles class if the drag over is emitted (default: `ui-dragdropelement`)
- `text` {String} - text to display in the middle of element (default: `Drag & drop files here`)

__Example__

`<ui-component name="dragdropelement" path="null" config="exec:console.log;"></ui-component>`

__Author__
- Michal Capo <capo@dasolutions.sk>
- [License](https://www.totaljs.com/license/)