## j-Editable

This component can edit all elements with `editable` class. It works with `data-bind` or dynamic values. Learn more from example.

---

`data-editable` attribute describes behaviour:

- `path` {String} a __relative path__ to property (can be inherited from `data-bind` automatically)
- `type` {String} optional, can be `string` (default), `date` or `number`
- `can` {String} optional, a path to `function(opt, el)` must return `boolean`, it means `can edit?`
- `save` {String} optional, a path to `function(opt, accepted(boolean))`, `accepted` function must be evaluated
- `format` {String} optional, a format for `date`, default: `yyyy-MM-dd`
- `dirsource` {String} optional, path to a data-source
- `dircustom` {String/Boolean} optional, can contain a path to `function(val, next(new_val))` or can be `Boolean`. This option can enable adding a custom value (value not defined in data-source)
- `dirrender` {String} optional, a path to `function(item, text)` (must return HTML for `j-Directory`), this function can affect list of items in `j-Directory`
- `dirminwidth` {Number} optional, a minimum width for `j-Directory`, default: `200`
- `dirmaxwidth` {Number} optional, a maximum width for `j-Directory`
- `dirplaceholder` {String} optional, a placeholder for `j-Directory`
- `dirempty` {String} optional, adds an empty field for `j-Directory`
- `dirkey` {String} optional, a key name for reading of `text` in `dirsource` (default: `name`)
- `dirvalue` {String} optional, a key name for reading of `value` in `dirsource` (default: `id`)
- `autosource` {String} a path to `search` function in `autocomplete`, `function(search, render(arr))`
- `autovalue` {String} a property path for the value in `autosource`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT