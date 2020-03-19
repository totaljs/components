## j-DynamicValueList

This component is [j-DynamicValue](https://componentator.com/components/j-dynamicvalue/) but for Array.

- `icon` {String} icon for label e.g. home, cog, etc.
- `label` {String} label (default is HTML content)
- `placeholder` {String} adds a placeholder text
- `disabled` {Boolean} disables this component
- `click` {String} __important__ link to `function(value, next(new_value))` for binding a new value
- `exec` {String} a link to `function(value, next(value))` for binding a readable `text` (__important__ value is `Array`)
- `remap` String} a remap function (default: `null`), example: `value.length ? value[0] : null`
- `required` {Boolean} enables "required" (default: `false`)
- `bind` {String} a path to method or variable where will be binded loaded value (optional)
- `after` {String} optional, it means a char after label (default: `:`)
- `value` {String} optional, a key name for reading of text in object (default: `name`)
- `dirsource` {String} a link to method `function(search, next(items_arr))`
- `dircustom` {String/Boolean} can contain a path to function(val, next(new_val)) or can be Boolean. This option can enable adding a custom value (value not defined in data-source)
- `dirrender` {String} a path to `function(item, text)` (must return HTML for j-Directory), this function can affect list of items in j-Directory
- `dirminwidth` {Number} a minimum width for j-Directory, (default: `200`)
- `dirmaxwidth` {Number} a maximum width for j-Directory
- `dirplaceholder` {String} a placeholder for j-Directory
- `dirempty` {String} adds an empty field for j-Directory
- `dirkey` {String} a key name for reading of text in dirsource (default: `name`)
- `dirvalue` {String} a key name for reading of value in dirsource (default: `id`)

### Author

- Denis Granec <denis@totalavengers.com>
- [License](https://www.totaljs.com/license/)
