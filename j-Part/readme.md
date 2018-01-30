# j-Part

This component can handle different contents asynchronously. __If the element doesn't contain any content__ then the component downloads the content according to the `url` defined in configuration.

__Configuration__:

Example: `data-jc-config="url:/home.html;if:home`

- `url` {String} (required) a relative URL address
- `if` {String} (required) condition, it's compared with the value within of `data-jc-path`
- `reload` {String} (optional) a link to function in the `window` scope
- `init` {String} (optional) a link to function in the `window` scope
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- `hide` {Boolean} (optional) auto-hide element if the `if` condition is not valid (default: `true`)