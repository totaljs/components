## j-Permissions

__Configuration__:

- `placeholder` {String} a placeholder for `j-Directory` component (default: `Search`)
- `types` {String} types of permission (array delimited by comma, default: `R,W,RW`)
- `dirsource` {String} a link to method when is evaluated after user clicks on the header
- `pk` {String} a `pk` means primary key, it's used as a prevention for duplicated values (default: `name`)

__Source__:

```javascript
[
	{
		name: 'Peter',
		text: 'Peter <b>admin</b>', // HTML text for rendering (optional)
		type: 'R' // must be one of the value from types
	}
]
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT
