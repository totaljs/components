## j-Navigation

- a simple navigation component like Tree
- easy for customization
- supports __dark mode__

__Configuration__:

Example: `data-jc-config="exec:LINK_TO_FUNCTION"`

- `exec` {String} a link to the function

__Data-source__:

```javascript
[
	{
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
- License: MIT
