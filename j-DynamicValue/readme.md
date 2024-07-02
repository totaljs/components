## j-DynamicValue

This component is very special component. It can keep a value for example `Number` and at the same it can render another readable `text`. This component is optimized for dynamic usage, so it needs to be linked with another component or part.

- jComponent `v19|v20`

- `icon {String}` icon for label e.g. home, cog, etc.
- `label {String}` label (default is HTML content)
- `icon2 {String}` icon in the right box e.g. home, cog, etc. (default: `angle-down`)
- `placeholder {String}` adds a placeholder text
- `disabled {Boolean}` disables this component
- `find {String}` __important__ link to `function(el, next(value))` for binding a new value
- `read {String}` a link to `function(value, next(response))` for binding a readable `text`
- `url {String}` tries to bind a value via `AJAX()`, argument `{0}` in URL is replaced by the value
- `html {String}` Tangular template for rendering a value (default: `{{ name }}`)
- `remap {String}` a remap function (default: `null`), example: `value.length ? value[0] : null`
- `required {Boolean}` enables "required" (default: `false`)
- `bind {String}` a path to method or variable where will be binded loaded value (optional)
- `dirsource {String}` a link to method `function(search, next(items_arr))` or __NEW__: can contain URL for search in fhe form `GET /api/partners/?q={0}`
- `dircustom {String/Boolean}` can contain a path to function(val, next(new_val)) or can be Boolean. This option can enable adding a custom value (value not defined in data-source)
- `dirrender {String}` a path to `function(item, text)` (must return HTML for j-Directory), this function can affect list of items in j-Directory
- `dirminwidth {Number}` a minimum width for j-Directory, (default: `200`)
- `dirmaxwidth {Number}` a maximum width for j-Directory
- `dirplaceholder {String}` a placeholder for j-Directory
- `dirempty {String}` adds an empty field for j-Directory
- `dirkey {String}` a key name for reading of text in dirsource (default: `name`)
- `dirvalue {String}` a key name for reading of value in dirsource (default: `id`)
- `onresponse {String}` a path to property or `function(response)`, executed if the response is processed (default: `undefined`)
- __NEW__ `tapi {Boolean}` enables calling `TAPI()` insteadof `AJAX()` (default: false)

### AJAX usage

If the `value` will be changed then the component performs `AJAX` call automatically.

```html
<ui-component name="dynamicvalue" path="path.to.property" config="url:/users/{0}/;dirsource:GET /users/?search={0}"></ui-component>
```

### Inline usage

If the `value` will be changed then the component performs `config.exec` for obtaining a readable text of a value.

```html
<ui-component name="dynamicvalue" path="path.to.property" config="exec:my_function"></ui-component>

<script>
	function my_function(value, next) {
		next({ name: 'This text will be displayed as a value '});
	}
</script>
```

__Good to know__:

- `component.response` contains a raw response from the result

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
