## j-Table

- please try to understand the functionality
- `j-Table` is very very very simple alternative to `j-DataGrid` targeted for UI
- `data-source` expects `Array`

__Configuration__:

- `highlight` {Boolean} enables highlighting of the row (default: `true`)
- `unhighlight` {Boolean} enables undo-highlighting of the row (default: `false`)
- `multiple` {Boolean} enables multiple row highlighting (default: `false`)
- `detail` {Boolean/String} if `string` then the value must be a link to `function(el_td, row)`
- `exec` {String} a path to `function(row/rows)` or path to `variable`

__HTML definition__:

```html
<div data---="table__PATH__CONF">

	<!--
		data-size="TD1,TD2,TD3"      : column width, optional (can contain pixels or percentage), "0" means "auto" width
		data-head="TD1,TD2,TD3"      : column names, optional
		data-align="TD1,TD2,TD3"     : column align, optional (0: left, 1: center, 2: right)
		data-type="TYPE"             : can be "detail" (Tangular template) or "empty" (empty is rendered when the Array is empty)
	-->
	<script type="text/html" data-size="0,150px,50px" data-head="Name,Created,Opt" data-align="0,0,1">
		<tr>
			<td>{{ name }}</td>
			<td>{{ dtcreated | format('[date]') }}</td>
			<td>OK</td>
		</tr>
	</script>

	<script type="text/html" data-type="detail">
		DETAIL: {{ name }}
	</script>

	<script type="text/html" data-type="empty">
		EMPTY
	</script>

</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT