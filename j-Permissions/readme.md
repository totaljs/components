## j-Permissions

- - jComponent `v19|v20`

__Configuration__:

- `placeholder {String}` a placeholder for `j-Directory` component (default: `Search`)
- `types {String}` types of permission (array delimited by comma, default: `R,RW`)
- `dirsource {String}` optional, path to a data-source or __NEW__: `id|name,id|name`
- `disabled {Boolean}` optional, disables this component
- `default {String}` default value of `type` (default: `R`)
- `dirraw {Boolean}` optional, disables HTML encoding for text in `j-Directory` (default: `false`)
- __NEW__: `autoremove {Boolean}` optional, it automatically removes non-existent permissions (default: `true`)
- __NEW__: `autoexclude {Boolean}` optional, it excludes the used permissions from the `dirsource` (default: `true`)

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
['R|123456', 'RW|654321']
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
