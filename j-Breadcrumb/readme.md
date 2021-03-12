## j-Breadcrumb

- Supports __Dark theme__
- Only SPA

__Configuration__:

- `icon {String}` home icon (default: `fa fa-home`)
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
		url: '/',          // URL address
		buttons: [         // Optional, custom buttons in the breadcrumb
			{
				name: 'Add',
				icon: 'far fa-plus-circle',
				click: function(el) {

				}
			}
		]
	}
];
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)