## j-Loading

- jComponent `v19|v20`
- it automatically assigns flags `@showloading` and `@hideloading`

__Configuration__:

- __NEW__: `style {Number}` a loading style (default: `1`)
	- `1`: basic with animated spin
	- `2`: a blue line at the top of window

__Usage__:

- `SETTER('loading/show', [text])` - shows loading (`text` optional)
- `SETTER('loading/hide', [sleep])` - hides loading (`sleep` optional and in milliseconds)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)