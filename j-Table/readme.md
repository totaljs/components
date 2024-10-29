## j-Table

- jComponent `v19|v20`
- try to understand the functionality
- `j-Table` is a very very very simple alternative to `j-DataGrid` targeted for UI
- `data-source` expects `Array` or `Object` with `{ page: 1, pages: 10, limit: 50, items: [], count: 1000 }`

__Configuration__:

- `highlight {Boolean}` enables highlighting of the row (default: `true`)
- `unhighlight {Boolean}` enables undo-highlighting of the row (default: `true`)
- `multiple {Boolean}` enables multiple row highlighting (default: `false`)
- `detail {Boolean/String}` if `string` then the value must be a link to `function(row_data, next_fn(new_data_for_detail_template_OR__new_html), tdelement)`
- `exec {String}` a path to `function(row/rows)` or path to `variable`
- `remember {Boolean}` enables remembering of last selected rows (default: `false`)
- `pk {String}` a primary key (default: `id`)
- `border {Boolean}` enables border (default: `true`)
- `scrollbar {Boolean}` enables custom scrollbar (default: `false`) + important: `height` must be specified
- `height {Number/String}` height of grid or can contain selector `window`, `parent` or custom selector `.ui-viewbox-body`
- `paginate {String}` a link to `function(model)` for performing pagination `{ page: 1, limit: 10, sort: [] }`
- `redraw {String}` a link to function, it's evaluated when the table is redrawing
- `filter {String}` a link to function, it's evaluated before the table is rendering
- `dblclick {String}` a link to function, it's evaluated when the user performs double-click
- `datasource {String}` path to data-source (for other extra data in the template. Usage: `{{ $.data.something }}`)
- `click {String}` a path to `function(button_name, row, button_element)`, is executed when the user will click on the button
- `flat {Boolean}` removes padding in cells (default: `false`)
- `noborder {Boolean}` removes border around (default: `false`)
- __NEW__: `hidewhenempty {Boolean}` hides table when empty (default: `false`)

__Good to know__:

- each `tr` element contains `data-index` attribute with `row` index
- each `td` __element of detail__ contains `data-index` attribute with `row` index

__HTML definition__:

```html
<ui-component name="table" path="" config="">

	<!--
		data-size="TD1,TD2,TD3"      : column width, optional (can contain pixels or percentage), "0" means "auto" width
		data-head="TD1,TD2,TD3"      : column names, optional
		data-align="TD1,TD2,TD3"     : column align, optional (0: left, 1: center, 2: right)
		data-type="TYPE"             : can be "detail" (Tangular template) or "empty" (empty is rendered when the Array is empty)
		data-display="MD,XS"         : can contain display types "LG" large, "MD" medium, "SM" small, "XS" extra small
		data-sort="name,,price"      : enables sorting, can contain the name of fields (a column with empty value will have disabled sorting)
	-->
	<script type="text/html" data-size="0,150px,50px" data-head="Name,Created,Opt" data-align="0,0,1" data-sort="1">
		<tr>
			<td>{{ name }}</td>
			<td>{{ dtcreated | format('[date]') }}</td>
			<td>OK</td>
		</tr>
	</script>

	<script type="text/html" data-type="detail">
		DETAIL: {{ name }}
		HIDDEN COMMANDS: {{ $.index }} or {{ $.user }}
	</script>

	<script type="text/html" data-type="empty">
		EMPTY
	</script>

</ui-component>
```

__Good to know__:

- `data-head` can contain Font Awesome icons, it must be wrapped like this `data-head="Name,'cog'"` or `data-name="Name,'youtube fab'"`
- `NULL('link.to.data')` evaluates `config.paginate`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)