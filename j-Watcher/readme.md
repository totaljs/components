## j-Watcher

This component executes the code defined in `<script type="text/js"></script>` tag.

```html
<script type="text/js">

	// value {Object} a value binded according to the path
	// path {String} a path where the value was binded
	// type {Number} binding type (0: init, 1: manually, 2: by input, 3: default value)
	// element {jQuery element} a current element
	// datasource {Object}
	// component {jComponent}

</script>
```

__Configuration__:

- `delay {Number}` a delay for evaluating code (default: `0`)
- __NEW__: `datasource {String}` a link to the datasource (it will be stored in `datasource` property)

__IMPORTANT__:

You need to use `<script type="text/js">` or `<script type="text/plain">`. Don't use the script element without `type` or with type `text|application/javascript` because the script will be evaluated by the browser automatically.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)