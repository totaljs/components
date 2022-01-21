## j-Watcher

This component executes the code defined in `<script type="text/js"></script>` tag.

```html
<script type="text/js">

	// value {Object} a value binded according to the path
	// path {String} a path where the value was binded
	// type {Number}
	// element {jQuery element} a current element

</script>
```

- `delay {Number}` a delay for evaluating code (default: `0`)

__IMPORTANT__:

You need to use `<script type="text/js">` or `<script type="text/plain">`. Don't use the script element without `type` or with type `text|application/javascript` because the script will be evaluated by the browser automatically.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)