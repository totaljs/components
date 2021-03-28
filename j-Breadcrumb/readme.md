## j-Breadcrumb

- Supports __Dark theme__
- Only SPA

__Configuration__:

- `icon {String}` home icon (default: `fa fa-home`)
- `exec {String}` path to the method `function(url)` for manual processing of links
- `historyapi {Boolean}` enables redirecting via `REDIRECT()` (default `true`)

## Data-source example

```javascript
[
	{
		name: 'Home',      // A link label
		url: '/'           // URL address
	},
	{
		name: 'Products',  // A link label
		url: '/'           // URL address
	}
];
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)