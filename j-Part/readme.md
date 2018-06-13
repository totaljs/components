# j-Part

This component can handle different contents asynchronously. __If the element doesn't contain any content__ then the component downloads the content according to the `url` defined in configuration.

__Configuration__:

Example: `data-jc-config="url:/home.html;if:home`

- `url` {String} (required) a relative URL address
- `if` {String} (required) condition, it's compared with the value within of `data-jc-path`
- `reload` {String} (optional) a link to function, it's executed when the part is visible (always)
- `hidden` {String} (optional) a link to function, it's executed when the part is hidden (always)
- `init` {String} (optional) a link to function, it's executed when the part is visible and onetime
- `default` {String} (optional) a short alias for `DEFAULT(default)`
- `hide` {Boolean} (optional) auto-hide element if the `if` condition is not valid (default: `true`)
- `cleaner` {Number} (optional) idle time (in minutes) for running of cleaning (default: `0`)
- `clean` {String} (optional) a link to function, it's executed before the part is cleaned