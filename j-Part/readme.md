# j-Part

This component can handle different contents asynchronously. __If the element doesn't contain any content__ then the component downloads the content according to the `url` defined in configuration.

__Configuration__:

- `url` {String} required, a relative URL address
- `if` {String} required, condition, it's compared with the value within of `path` (__NEW__: supports multiple paths divided by `comma`)
- `reload` {String} optional, a link to function `function(init) {}`, it's executed when the part is visible (always)
- `hidden` {String} optional, a link to function, it's executed when the part is hidden (always)
- `init` {String} optional, a link to function, it's executed when the part is visible and onetime
- `default` {String} optional, a short alias for `DEFAULT(default)`
- `hide` {Boolean} optional, auto-hide element if the `if` condition is not valid (default: `true`)
- `cleaner` {Number} optional, idle time (in minutes) for running of cleaning (default: `0`)
- `clean` {String} optional, a link to function, it's executed before the part is cleaned
- `loading` {Boolean} optional, enables loading via `SETTER('loading')` (default: `true`)
- `path` {String} optional, the component replace all `~PATH~` phrases for the value of the `path` in the downloaded template
- `replace` {String} optional, a link to method `function(content) { return content }` which can modify downloaded template
- `absolute` {Boolean} optional, enables absolute position (default `false`)
- `check` {String} optional, a link to function `function(next) { next(); }`, it's executed when the part is wanting to show
- `invisible` {Boolean} enables adding of `invisible` class when the part is going to hide (default: `false`)
- `delay` {Number} a delay (in ms) for removing of `invisible` class and hiding of `loading` (default: `500`)
- `autofocus` {Boolean/String} focuses the first input, textarea (default: `false`)

__Good to know 1__:

All `~PATH~` phrases will be replaced by `config.path` or `config.if` automatically.

__Good to know 2__:

Part component emits an `event` in the form: `parts.` + `config.if` for extending of parts. This can be very usefull for some plugin systems. Example:

__Good to know 3__:

If the part component isn't within scope then the value from the `config.if` will replace `?` characters in all config keys.

```js
ON('parts.pages', function(element, partcomponent) {
	// It's executed only when the part is initialized
});
```