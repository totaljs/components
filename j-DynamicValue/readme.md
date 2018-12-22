## j-DynamicValue

This component is very special component. It can keep a value for example `Number` and at the same it can render another readable `text`. This component is optimized for dynamic usage, so it needs to be linked with another component or part.

- `icon` {String} (optional) icon for label e.g. home, cog, etc.
- `label` {String} (optional) label (default is HTML content)
- `icon2` {String} (optional) icon in the right box e.g. home, cog, etc. (default: `search`)
- `placeholder` {String} (optional) adds a placeholder text
- `disabled` {Boolean} (optional) disables this component
- `click` {String} __important__ link to `function(value, next(new_value))` for binding a new value
- `exec` {String} (optional) a link to `function(next(value), current_value)` for binding a readable `text`
- `url` {String} (optional) tries to bind a value via `AJAX()`, argument `{value}` in URL is replaced by the value
- `html` {String} Tangular template for rendering a value (default: `{{ name }}`)
- `remap` String} (optional) a remap function (default: `null`), example: `value.length ? value[0] : null`

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

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT