# j-Movable

The component handles similar `draggable` element and supports movement between each other. Each element according to the selector must have defined `draggable="true"` attribute.

__Configuration__:

- `selector {String}` jQuery selector for watching
- `exec {String}` A path to method which will be executed if the user moves element
- `global {Boolean}` drag & drop events will be binded to `document` (default: `false`)
- `parent {String}` selector for finding of element where will be binded drag & drop envets (default: current element)
- `move {Boolean}` enables auto re-ordering elements (default: `true`)
- `container {String}` a selector for finding of the main container
- __NEW__ `check {Function(el)}` optional, a function for checking of draggability (it must return `true` or `false`)

__Example of `Exec` method__:

```javascript
function exec_method(list, dragged, target) {
	// @list jQuery list
}
```

__Good to know__:

- `path` performs `CHANGE()`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)