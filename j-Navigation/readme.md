## j-Navigation

- a simple navigation component like Tree
- easy for customization
- supports __dark mode__

- jComponent `v19|v20`

__Configuration__:

- `exec {String}` a link to the function
- `pk {String}` a primary key (default: `id`) for remembering last state of tree

__Data-source__:

```javascript
[
	{
		id: 1,
		name: 'Text to navigation item',
		title: 'Optional, a title attribute',
		collapsed: true, // only for children, default "false"
		children: [
			// Can contain same structure as the parent
		]
	}
]
```

__Good to know__:

- only items without children are clickable
- `exec` returns an entire object

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
