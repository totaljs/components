## j-Releaser

The component can release after some time own content (DOM) + memory. We recommend to use it for `j-DataGrid`, `j-CodeMirror`, `j-CloudEditor`, etc..

__Configuration__:

- `if {String}` must contain a value for comparing with the model
- `delay {Number}` delay for removing of `invisible` class (default: `500`)
- `release {Number}` delay for releasing of the content in idle time (default: `10000`)
- `bindvisible {Boolean}` it evalutes the content if the component is visible (default: `false`)
- `released {String}` a link to the `function(component_element)` when the content is released
- `render {String}` a link to the `function(component_element)` when the content is going to render

__Example__:

```html
<div data---="releaser__common.form__if:userform">
	<script type="text/html">
		<div data---="datagrid__.......">
			<SCR type="text/html">
				YOUR COLUMNS
			</SCR>
		</div>
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)