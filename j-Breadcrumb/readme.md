## j-Breadcrumb

- Supports __Dark theme__
- Only SPA

__Configuration__:

- `icon {String}` home icon (default: `fa fa-home`)
- `exec {String}` path to the method `function(url, el)` for manual processing of links
- `historyapi {Boolean}` enables redirecting via `REDIRECT()` (default `true`)

## Data-source example

```js
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

## Methods

- `component.add(name1, url1)(name2, url2)(name3, url3)...`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)