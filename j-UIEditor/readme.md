## j-UIEditor

The component opens UI Builder in the iframe.

- UI Builder editor repository <https://github.com/totaljs/uibuilder> (if you don't want to use cloud version)

__Configuration__:

- `url {String}` a link to the UI Builder (default: `https://uibuilder.totaljs.com`)
- `top {Number}` default: `0`
- `left {Number}` default: `0`
- `right {Number}` default: `0`
- `bottom {Number}` default: `0`
- `zindex {Number}` default: `30`
- `language {String}` default: `eu` (english)

__Model__:

```js
{
	data: { .. UI BUILDER DESIGN .. },
	upload: 'https://.../upload/', // optional
	groups: [{ id: 'group1', name: 'Group 1' }], // optional
	apps: [{ id: 'app1', name: 'App 1' }], // optional
	views: [{ id: 'view1', name: 'View 1' }], // optional
	close: function() {}, // optional, it's executed when the editor is closed
	save: function(data) {}, // optional, it's executed when the user saves design
	publish: function(data) {}, // optional, it's executed when the user compiles design
	render: function(data) {}, // optional, it's executed when the user wants to preview a design
}
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)