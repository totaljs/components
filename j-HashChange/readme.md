## j-HashChange

The component captures all changes for `#hashtag` in the URL address. When change, it emits event `hash`. The component reacts to the real changes.

- jComponent `v19|v20`

__Configuration__:

- `delay {Number}` a delay for emitting `hash` event (default: `0`)

__How to capture hash change?__

```js
ON('hash', function(hash) {
	// @hash {String} - it can be "empty"
});
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)