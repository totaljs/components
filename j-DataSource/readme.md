## j-DataSource

The component loads data from the external source via `AJAX()` method and it binds the value according to the `config.path`.

__Configuration__:

- `path {String}` __required__ a path where the value will be set
- `url {String}` optional, a URL address for obtaining data
- `delay {Number}` optional, a delay (in milliseconds) for obtaining data (defaul: `0`)

__Good to know__:

- `config.path = '#codelist'` sets a value in code lists `DEF.cl.codelist`
- `config.path = '%codelist'` sets a value in as temporary
- `config.path = '?.path` sets a value according to the plugin path
- `config.path = 'absolute.path` sets a value according to the path

__Can I use dynamic URL address?__

Yes, you can use `<ui-component name="datasource" path="..."` for dynamic obtaining of data.

```html
<ui-component name="datasource" path="?.urlcities" config="path:#cities"></ui-component>
```

__How can I modify data before binding?__

```html
<ui-component name="datasource" config="url:https://www.yourdomain.com/api/countries/;path:#countries">
	<script type="text/plain">
		var output = [];
		for (var item of value)
			output.push({ id: item.Id, name: item.Name });
		return output;
	</script>
</ui-component>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
