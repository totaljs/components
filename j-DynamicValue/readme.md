## j-DynamicValue

This component is very special component. It can keep a value for example `Number` and at the same it can render another readable `text`. This component is optimized for dynamic usage, so it needs to be linked with another component or part.

- `icon` {String} icon for label e.g. home, cog, etc.
- `label` {String} label (default is HTML content)
- `icon2` {String} icon in the right box e.g. home, cog, etc. (default: `angle-down`)
- `placeholder` {String} adds a placeholder text
- `disabled` {Boolean} disables this component
- `click` {String} __important__ link to `function(el, value, next(new_value))` for binding a new value
- `exec` {String} a link to `function(element, next(value), current_value)` for binding a readable `text`
- `url` {String} tries to bind a value via `AJAX()`, argument `{value}` in URL is replaced by the value
- `html` {String} Tangular template for rendering a value (default: `{{ name }}`)
- `remap` String} a remap function (default: `null`), example: `value.length ? value[0] : null`
- `required` {Boolean} enables "required" (default: `false`)
- `bind` {String} a path to method or variable where will be binded loaded value (optional)
- `dirsource` {String} a link to method `function(search, next(items_arr))`
- `dircustom` {String/Boolean} can contain a path to function(val, next(new_val)) or can be Boolean. This option can enable adding a custom value (value not defined in data-source)
- `dirrender` {String} a path to `function(item, text)` (must return HTML for j-Directory), this function can affect list of items in j-Directory
- `dirminwidth` {Number} a minimum width for j-Directory, (default: `200`)
- `dirmaxwidth` {Number} a maximum width for j-Directory
- `dirplaceholder` {String} a placeholder for j-Directory
- `dirempty` {String} adds an empty field for j-Directory
- `dirkey` {String} a key name for reading of text in dirsource (default: `name`)
- `dirvalue` {String} a key name for reading of value in dirsource (default: `id`)

### AJAX usage

If the `value` will be changed then the component performs `AJAX` call automatically.

```html
<div data-jc="dynamicvalue__path.to.property__url:/users/{value}/"></div>
```

### Inline usage

If the `value` will be changed then the component performs `config.exec` for obtaining a readable text of a value.

```html
<div data-jc="dynamicvalue__path.to.property__exec:my_function"></div>

<script>
	function my_function(value, next) {
		next({ name: 'This text will be displayed as a value '});
	}
</script>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
