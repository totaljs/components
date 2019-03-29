## j-Input

__j-Input__ is multifuncional `input` component which supports a lot of features and it's optimized for everyday usage. It's a great alternative to `j-Textbox` and `j-Dropdown`. Works only with jComponent `+v17`.

__Configuration__:

- `type` {String} optional, can be `email`, `phone`, `password`, `date`, `time` (supports only 24 hours time), `url`, `number`, `search`, `lower`, `upper` or empty (default)
- `required` {Boolean} optional, enables "required" (default: `false`)
- `icon` {String} optional, icon for label e.g. `home`, `cog`, etc.
- `licon` {String} optional, left icon e.g. `home`, `cog`, etc.
- `liconclick` {String} optional, a path to method `function(component, input)`
- `ricon` {String} optional, right icon e.g. `home`, `cog`, etc.
- `riconclick` {String} optional, a path to method `function(component, input)`
- `label` {String} optional, a label (default is HTML content)
- `autofocus` {Boolean} optional, focuses the input (default: `false`)
- `align` {String} optional, `left` (default), `2` / `right` or `1` / `center`
- `after` {String} optional, it means a char after label (default: `:`)
- `autofill` {Boolean} optional, enables browser's autofill feature (default: `false`)
- `placeholder` {String} optional, adds a `placeholder` text into the input
- `maxlength` {Number} optional, sets a maximum length of chars (default: `200`)
- `minlength` {Number} optional, sets a minimum length of chars
- `minvalue` {Number} optional, a minimal value for `number` type
- `maxvalue` {Number} optional, a maximal value for `number` type
- `increment` {Number} optional, sets a value for incrementing (default: `1`)
- `validate` {String} optional, a condition for validating of value, can contain a link to `function(value)` or `!!value.match(/[a-z]+/)`
- `format` {String} optional, output formatting e.g. for `date` type: `yyyy-MM-dd`, for `time` type: `HH:mm`, for `number` you can define max. decimals
- `disabled` {Boolean} optional, disables this component
- `error` {String} optional, adds a `string` text under the component
- `autocomplete` {String} optional, needs to contain a link to a function, is triggered on `focus` event
- `spaces` {Boolean} optional, enables spaces otherwise it removes them (default: `true`)
- `innerlabel` {Boolean} optional, enables inner label (default: `true`)
- `dirsource` {String} optional, path to a data-source
- `dircustom` {String/Boolean} optional, can contain a path to `function(val, next(new_val))` or can be `Boolean`. This option can enable adding a custom value (value not defined in data-source)
- `dirrender` {String} optional, a path to `function(item, text)` (must return HTML for `j-Directory`), this function can affect list of items in `j-Directory`
- `dirminwidth` {Number} optional, a minimum width for `j-Directory`, default: `200`
- `dirmaxwidth` {Number} optional, a maximum width for `j-Directory`
- `diroffsety` {Number} optional, `Y` offset (default: `0`)
- `diroffsetx` {Number} optional, `X` offset (default: `0`)
- `dirplaceholder` {String} optional, a placeholder for `j-Directory`
- `dirempty` {String} optional, adds an empty field for `j-Directory`
- `dirkey` {String} optional, a key name for reading of `text` in `dirsource` (default: `name`)
- `dirvalue` {String} optional, a key name for reading of `value` in `dirsource` (default: `id`)
- `direxclude` {Boolean} optional, excludes a current value from `j-Directory` (default: `true`)
- `dirsearch` {Boolean} optional, can disable search in `j-Directory` (default: `true`)
- `mask` {String} optional, can contain a mask in the form `###/##` (`#` is replaced for a char)
- `maskregexp` {String} optional, can contain RegExp for each char in the form `\d,\d,\d,null,\d,\d` (`,` is delimiter)
- `masktidy` {Boolean} optional, the component returns only raw chars without fixed chars (default: `false`)
- __NEW__ `autosource` {String} a path to `search` function in `autocomplete`, `function(search, render(arr))`
- __NEW__ `autovalue` {String} a property path for the value in `autosource`, default: `name`
- __NEW__ `autoexec` {String} a path method `function(item, next(value_to_input))`
- __NEW__ `searchalign` {Number} can align icon on `type:search` to left (`2`) or right (`1`, default)

__Interesting:__

- `type:date` needs __`datepicker`__ component
- `type:time` needs __`timerpicker`__ component
- `dirsource:path.to.datasource` needs __`directory`__ component
- if `licon` or `ricon` starts with `!` then the component render a raw value instead of `icon`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT
