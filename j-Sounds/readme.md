## j-Sounds

This component contains some predefined sounds like `beep`, `fail`, `success`, etc... Path contains a volume control in percentage, `0` disables playing.

- jComponent `v19|v20`

__Configuration__:

- `url {String}` URL address to sound library (default: `https://cdn.componentator.com/sounds/`)
- `volume {Number}` (default: `50`)

__Good to know__:

`path` can contain `{Number}`, which will control volume or `{Boolean}` which will enable or disable sounds.

__Methods__:

- `component.play(sound)` supported sounds:
	- `alert`
	- `message`
	- `badges`
	- `notifications`
	- `beep`
	- `confirm`
	- `done`
	- `drum`
	- `fail`
	- `success`
- `component.success()`
- `component.fail()`
- `component.alert()`, `component.error()`
- `component.warning()`
- `component.notify()`
- `component.badge()`
- `component.confirm()`
- `component.beep()`
- `component.drum()`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)