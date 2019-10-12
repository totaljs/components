## j-CheckboxList

- __NEW__ now supports custom buttons
- __NEW__ now supports darkmode

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope"`

- `required` {Boolean} (optional) enables "required" (default: `false`)
- `items` {String} (optional) static items `key1|value1, key2 with value, key3|value`
- `icon` {String} (optional) icon for label without `fa-` e.g. `home`, `cog`, etc.
- `checkicon` {String} (optional) check icon without `fa-`, (default: `check`).
- `label` {String} (optional) label (default is HTML content) [__NEW__ config is the only way to set label for custom buttons]
- `type` {String} (optional) can be `number` (converts `String` values to `Number`)
- `datasource` {String} path to data-source (must be array)
- `text` {String} determines a property name for text (in data-source), default: `name`
- `value` {String} determines a property name for value (in data-source) default :`id`
- `empty` {String} (optional) empty text for empty data-source
- `disabled` {Boolean} (optional) disables this component

__Custom buttons:__

- Custom buttons have predefined styles. For predefined styles use `ui-checkboxlist-custom` class
- Component will create custom `object` with `value, text, index`. So in template you can use `{{ text }}` or `{{ value }}` or `{{ index }}`
- But, your data are set as `repository` ([more info](https://wiki.totaljs.com/jcomponent/helpers/tangular/#method-tangular-render-)). So you can display your data with `$.` prefix. e.g. `{{ $.mydata }}`

```
<div data---="checkboxlist__selected__datasource:datasource;label:My label">
	<script type="text/html">
		<div class="ui-checkboxlist-custom">
			<div>{{ text }}</div>
			<div>{{ $.brutal }}</div>
		</div>
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
