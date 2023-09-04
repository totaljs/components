## j-UIStudio

This component renders the app according to the Total.js Flow UI Studio schema.

__Configuration__:

- `url {String}` a link to the Flow UI Studio schema (must be in the `json` format)
- `css {Boolean}` applies app style to the current element (default: `true`)
- `ssid {String}` optional, adds a session identifier to the URL address for the Flow

__Properties__:

- `component.app` contains an `app` instance

__Good to know__:

The component extends the `app` instance by adding `breadcrumb {Array}` property.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)