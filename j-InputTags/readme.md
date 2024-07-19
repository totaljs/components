## j-InputTags

- jComponent `v19|v20`

__Configuration__:

- `required {Boolean}` optional, enables "required" (default: `false`)
- `icon {String}` optional, icon for label e.g. `home`, `cog`, etc.
- `licon {String}` optional, left icon e.g. `home`, `cog`, etc.
- `liconclick {String}` optional, a path to method `function(component, input)`
- `ricon {String}` optional, right icon e.g. `home`, `cog`, etc.
- `riconclick {String}` optional, a path to method `function(component, input)`
- `label {String}` optional, a label (default is HTML content)
- `after {String}` optional, it means a char after label (default: `:`)
- `placeholder {String}` optional, adds a `placeholder` text into the input
- `validate {String}` optional, a condition for validating of value, can contain a link to `function(value)` or `!!value.match(/[a-z]+/)`
- `disabled {Boolean}` optional, disables this component
- `error {String}` optional, adds a `string` text under the component
- `spaces {Boolean}` optional, enables spaces otherwise it removes them (default: `true`)
- `innerlabel {Boolean}` optional, enables inner label (default: `true`)
- `dirsource {String}` optional, path to a data-source or __NEW__ can contain a link to method `function(search, next(items_arr))`
- `dircustom {String/Boolean}` optional, can contain a path to `function(val, next(new_val))` or can be `Boolean`. This option can enable adding a custom value (value not defined in data-source)
- `dirrender {String}` optional, a path to `function(item, text)` (must return HTML for `j-Directory`), this function can affect list of items in `j-Directory`
- `dirminwidth {Number}` optional, a minimum width for `j-Directory`, default: `200`
- `dirmaxwidth {Number}` optional, a maximum width for `j-Directory`
- `dirplaceholder {String}` optional, a placeholder for `j-Directory`
- `dirempty {String}` optional, adds an empty field for `j-Directory`
- `dirkey {String}` optional, a key name for reading of `text` in `dirsource` (default: `name`)
- `dirvalue {String}` optional, a key name for reading of `value` in `dirsource` (default: `id`)
- `autosource {String}` a path to `search` function in `autocomplete`, `function(search, render(arr))`
- `autovalue {String}` a property path for the value in `autosource`
- `transform {Number}` optional, transforms the text `0 - none, 1 - lowercase, 2 - uppercase, 3 - capitalize` (Default: `0`)
- `enteronly {Boolean}` optional, appends a new value after `enter` key is pressed (default: `true`)

__Interesting:__

- `dirsource:path.to.datasource` needs __`directory`__ component
- if `licon` or `ricon` starts with `!` then the component render a raw value instead of `icon`
- `dirsource` with paths to methods can load data asynchronously

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
