## j-Pagination

- responsive
- easy usage

__Configuration__:

- `pages` {String} pluralization for `pages`, e.g. `zero, # one, # two-three-four, # others`
- `items` {String} pluralization for `items` e.g. `# zero, # one, # two-three-four, # others`
- `max` {Number} shows a maximum count of pages (default: `8`)
- `exec` {String} link to function
- __NEW__: `nopages` {Boolean} can hide pagination if the pages are less than `2` (default: `false`)

__Important__:
The component caches values: `pages` and `count`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)