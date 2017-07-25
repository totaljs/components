# j-Page

This component can handle different contents asynchronously.

__Configuration__:

Example: `data-jc-config="template:/home.html;if:home`

- `template` {String} (required) a relative URL address
- `if` {String} (required) condition, it's compared with the value within of `data-jc-path`
- `reload` {String} (optional) a link to function in the `window` scope
- `init` {String} (optional) a link to function in the `window` scope