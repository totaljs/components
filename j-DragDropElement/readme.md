## j-DragDropElements

On `drag` event displays modal inside given element with text `Drop & drop files here`. On moving dragged files away from element or dropping dragged files modal will hide. Also on `drop` event `exec` function is executed.

__Configuration__

- `exec {String}` the component executes this method if the files are dropped
- `text {String}` text to display (default `empty`)

__Example__

`<ui-component name="dragdropelement" config="exec:console.log;"></ui-component>`

__Author__

- Michal Capo <capo@dasolutions.sk> and Marek Dorotovič <marek@totaljs.com>
- [License](https://www.totaljs.com/license/)