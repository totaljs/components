# j-Page

This component can handle different contents asynchronously. The component has same functionality like `j-Part`. __If the element doesn't contain any content__ then the component downloads the content according to the `url` defined in configuration.

__Configuration__:

- `url` {String} required, a relative URL address
- `if` {String} required, condition, it's compared with the value within of `path` (__NEW__: supports multiple paths divided by `comma`)
- `reload` {String} optional, a link to function `function(init) {}`, it's executed when the page is visible (always)
- `hidden` {String} optional, a link to function, it's executed when the page is hidden (always)
- `init` {String} optional, a link to function, it's executed when the page is visible and onetime
- `default` {String} optional, a short alias for `DEFAULT(default)`
- `hide` {Boolean} optional, auto-hide element if the `if` condition is not valid (default: `true`)
- `cleaner` {Number} optional, idle time (in minutes) for running of cleaning (default: `0`)
- `clean` {String} optional, a link to function, it's executed before the page is cleaned
- `loading` {Boolean} optional, enables loading via `SETTER('loading')` (default: `true`)
- `path` {String} optional, the component replace all `~PATH~` phrases for the value of the `path` in the downloaded template
- `replace` {String} optional, a link to method `function(content) { return content }` which can modify downloaded template
- `absolute` {Boolean} optional, enables absolute position (default `false`)
- `check` {String} optional, a link to function `function(next) { next(); }`, it's executed when the page is wanting to show
- `invisible` {Boolean} enables adding of `invisible` class when the page is going to hide (default: `false`)
- `delay` {Number} a delay (in ms) for removing of `invisible` class and hiding of `loading` (default: `500`)
- `autofocus` {Boolean/String} focuses the first input, textarea (default: `false`)
- `delayloading` {Number} a delay (in ms) for hiding of of `loading` (default: `800`)
- `id` {String} a custom identifier for replacing `~ID~` phrases in the imported HTML (default: empty)

__Good to know 1__:

- all `~PATH~` phrases will be replaced by `config.path` or `config.if` automatically
- all `~ID~` phrases will be replaced by `config.id` automatically

__Good to know 2__:

Page component emits an `event` in the form: `pages.` + `config.if` for extending of pages. This can be very usefull for some plugin systems. Example:

__Good to know 3__:

If the page component isn't within scope then the value from the `config.if` will replace `?` characters in all config keys.

```js
ON('pages.pages', function(element, pagecomponent) {
	// It's executed only when the page is initialized
});
```