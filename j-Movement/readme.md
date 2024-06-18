## j-Movement

This component captures basic keyboard keys like `arrows`, `enter` and `esc`.

- jComponent `v19|v20`

__Methods__:

- `component.assign(ondown(key, e), [onunassign])`

The `assign` method will clear previous assignments and applies new ones. We recommend calling the `assign` method to your elements when they are focused, or the user clicks on them.

__Usage__:

```js
SETTER('movement/assign', function(key, e) {
	// @key {String}
	// @ {Event}
	switch (key) {
		case 'up':
		case 'down':
		case 'right':
		case 'left':
		case 'esc':
		case 'enter':
			break;
	}
});
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
