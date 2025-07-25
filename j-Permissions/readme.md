## j-Permissions

- - jComponent `v19|v20`

__Configuration__:

- `placeholder {String}` a placeholder for `j-Directory` component (default: `Search`)
- `types {String}` permission types (only one character per operation!!!!) (array delimited by comma, default: `R,W`)
- `dirsource {String}` optional, path to a data-source or __NEW__: `id|name,id|name`
- `disabled {Boolean}` optional, disables this component
- `default {String}` default value of `type` (default: `R`)
- `dirraw {Boolean}` optional, disables HTML encoding for text in `j-Directory` (default: `false`)
- `autoremove {Boolean}` optional, it automatically removes non-existent permissions (default: `true`)
- `autoexclude {Boolean}` optional, it excludes the used permissions from the `dirsource` (default: `true`)
- __NEW__: `exec {String}` optional, it executes a method (`path.to.method`) when the user changes the value

__Source__:

```js
[
	{
		id: "123456",
		name: 'Peter'
	},
	{
		id: "654321",
		name: 'John'
	}
]
```

__Input & Output__:

```js
['R123456', 'W123456', 'W654321']
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
