# j-Page

This component can handle different contents asynchronously.

__Configuration__:

Example: `data---="path__url:/home.html;if:home`

- `url` {String} (required) a relative URL address
- `if` {String} (required) condition, it's compared with the value within of `path`
- `reload` {String} (optional) a link to function in the `window` scope
- `init` {String} (optional) a link to function in the `window` scope
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`