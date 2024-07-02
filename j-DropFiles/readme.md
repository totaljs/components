## j-DropFiles

- jComponent `v19|v20`
- singleton
- captures all dropped files into the `window`
- must be located under `<body>` element due to positioning

__Configuration__:

- `exec {String}` a link to the `function(files, e)`
- __NEW__: `check {String}` optional, a link to the `function(e)` that must return `true` (allows drag&drop) or `false` (disallow)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)