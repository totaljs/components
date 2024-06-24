## j-Input

__j-Input__ is multifuncional `input` component which supports a lot of features and it's optimized for everyday usage. It's a great alternative to `j-Textbox` and `j-Dropdown`. Works only with jComponent `+v17`.

- jComponent `v19|v20`

__Configuration__:

- `type {String}` optional, can be `email`, `multiline`, `checkbox`, `phone`, `password`, `zip`, `date` (needs `datepicker` component), `time` (needs `timepicker` component), `color` (needs `colorpicker` component), `icon` (needs `faicons` component), `emoji` (needs `emoji` component), `url`, `number`, `number2` (nullable), `search`, `lower`, `upper`, `slug`, `id` or empty (default)
- `required {Boolean}` optional, enables "required" (default: `false`)
- `icon {String}` optional, icon for label e.g. `home`, `cog`, etc.
- `licon {String}` optional, left icon e.g. `home`, `cog`, etc.
- `liconclick {String}` optional, a path to method `function(component, input)`
- `ricon {String}` optional, right icon e.g. `home`, `cog`, etc.
- `riconclick {String}` optional, a path to method `function(component, input)`
- `label {String}` optional, a label (default is HTML content)
- `autofocus {Boolean}` optional, focuses the input (default: `false`)
- `align {String}` optional, `left` (default), `2` / `right` or `1` / `center`
- `after {String}` optional, it means a char after label (default: `:`)
- `autofill  {Boolean/String}` optional, enables browser's autofill feature (`string` will be used as an input name, default: `false`)
- `placeholder {String}` optional, adds a `placeholder` text into the input
- `maxlength {Number}` optional, sets a maximum length of chars (default: `200`)
- `minlength {Number}` optional, sets a minimum length of chars
- `minvalue {Number}` optional, a minimal value for `number` type
- `maxvalue {Number}` optional, a maximal value for `number` type
- `increment {Number}` optional, sets a value for incrementing (default: `1`)
- `validate {String}` optional, a condition for validating of value, can contain a link to `function(value)` or `!!value.match(/[a-z]+/)`
- `format {String}` optional, output formatting e.g. for `date` type: `yyyy-MM-dd`, for `time` type: `HH:mm`, for `number` you can define max. decimals (Default: `auto`)
- `disabled {Boolean}` optional, disables this component
- `error {String}` optional, adds a `string` text under the component
- `autocomplete {String}` optional, needs to contain a link to a function, is triggered on `focus` event
- `spaces {Boolean}` optional, enables spaces otherwise it removes them (default: `true`)
- `innerlabel {Boolean}` optional, enables inner label (default: `true`)
- `dirsource {String}` optional, path to a data-source or __NEW__ to `function(search, next)` (path must contain `/` or __NEW__: `id|name,id|name`
- `dircustom {String/Boolean}` optional, can contain a path to `function(val, next(new_val))` or can be `Boolean`. This option can enable adding a custom value (value not defined in data-source)
- `dirrender {String}` optional, a path to `function(item, text)` (must return HTML for `j-Directory`), this function can affect list of items in `j-Directory`
- `dirminwidth {Number}` optional, a minimum width for `j-Directory`, default: `200`
- `dirmaxwidth {Number}` optional, a maximum width for `j-Directory`
- `diroffsety {Number}` optional, `Y` offset (default: `0`)
- `diroffsetx {Number}` optional, `X` offset (default: `0`)
- `dirplaceholder {String}` optional, a placeholder for `j-Directory`
- `dirempty {String}` optional, adds an empty field for `j-Directory`
- `dirkey {String}` optional, a key name for reading of `text` in `dirsource` (default: `name`)
- `dirvalue {String}` optional, a key name for reading of `value` in `dirsource` (default: `id`)
- `direxclude {Boolean}` optional, excludes a current value from `j-Directory` (default: `true`)
- `dirsearch {Boolean/String}` optional, can disable search in `j-Directory` (default: `true`) or `{String}` (key name) can map a value for searching
- `dirraw {Boolean}` optional, can disable escaping of items for `j-Directory` (default: `false`)
- `dirdetail {String}` optional, a link to the function `function(val, next(NEW_TEXT))` (targeted for to `dirsource`)
- __NEW__ `dirfilter {String}` optional, an inline filter conditional method, for example: `value.id !== 2` (targeted for to `dirsource`)
- `mask {String}` optional, can contain a mask in the form `###/##` (`#` is replaced for a char)
- `maskregexp {String}` optional, can contain RegExp for each char in the form `\d,\d,\d,null,\d,\d` (`,` is delimiter)
- `masktidy {Boolean}` optional, the component returns only raw chars without fixed chars (default: `false`)
- `autosource {String}` a path to `search` function in `autocomplete`, `function(search, render(arr))`
- `autovalue {String}` a property path for the value in `autosource`, default: `name`
- `autoexec {String}` a path method `function(item, next(value_to_input))`
- `searchalign {Number}` can align icon on `type:search` to left (`2`) or right (`1`, default)
- `forcevalidation {Boolean}` enables for force validation for `phone` and `email` (default: `true`)
- `camouflage {Boolean/String}` masks the value in the input after is triggered `blur` event (default: `false`) or it can be `String` which will be used as a camouflage
- `monospace {Boolean}` enables `monospaced` font (default: `false`)
- `multiple {Boolean}` enables checkboxes if `dirsource` is not empty
- `tabindex {Number}` adds a tabindex (default: `0`)
- `tabs {Boolean}` enables tabs for multiline (default: `true`)
- `readonly {Boolean}` block text field edition (default: `false`)

__Interesting:__

- `type:date` needs __`datepicker`__ component
- `type:time` needs __`timepicker`__ component
- `dirsource:path.to.datasource` needs __`directory`__ component
- if `licon` or `ricon` starts with `!` then the component render a raw value instead of `icon`
- `ui-input-ok` class is binded when the input is validated and filled
- `SET('path', 'camouflage', 'show');` shows the value for 2000 ms

```video
https://www.youtube.com/watch?v=Ne3ezaP0w34
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
