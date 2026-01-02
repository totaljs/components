## j-Remember

The component calls a function within the repeat interval. Information about the previous call is stored in `localStorage`.

- jComponent `v19|v20`
- easy usage

__Configuration__:

- `id {String}` a remember identifier
- `repeat {String}` a repeat time e.g. `session` or `5 minutes` or `1 day`
- `exec {String}` a link to the function that will be called
- `delay {Number}` a caller delay in ms (default: `3000`)

__Methods__:

- `SETTER('remember/clear', 'id')`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)