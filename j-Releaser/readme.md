## j-Releaser

The component can release after some time own content (DOM) + memory. We recommend to use it for `j-DataGrid`, `j-CodeMirror`, `j-CloudEditor`, etc..

- jComponent `v19|v20`

__Configuration__:

- `if {String}` must contain a value for comparing with the model
- `delay {Number}` delay for removing of `invisible` class (default: `500`)
- `release {Number}` delay for releasing of the content in idle time (default: `10000`)
- `bindvisible {Boolean}` it evalutes the content if the component is visible (default: `false`)
- `released {String}` a link to the `function(component_element)` when the content is released
- `render {String}` a link to the `function(component_element)` when the content is going to render

__Example__:

```html
<ui-component name="releaser" path="common.form" config="if:userform">
	<script type="text/html">
		<ui-component name="datagrid" path=".......">
			<SCR type="text/html">
				YOUR COLUMNS
			</SCR>
		</ui-component>
	</script>
</
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)