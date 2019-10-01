# j-Movable

The component handles similar `draggable` element and supports movement between each other. Each element according to the selector must have defined `draggable="true"` attribute.

__Configuration__:

- `selector` {String} jQuery selector for watching
- `exec` {String} A path to method which will be executed if the user moves element

__Example of `Exec` method__:

```javascript
function exec_method(list, dragged, target) {
	// @list jQuery list
}
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT