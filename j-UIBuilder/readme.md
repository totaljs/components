## j-UIBuilder

__BETA__: This component renders the application designed via UI Builder (we will release it soon).

You can load the app via the `path` specified in the component or via the `config.url` option. The path can contain a URL address to the `JSON` app schema or the app object (parsed JSON).

__Configuration__:

- `app {String}` a link to the method/variable where will be stored `app` instance
- `url {String}` a link to the app schema (must be in the `json` format)
- `css {Boolean}` applies app style to the current element (default: `true`)
- `id {String}` overwrites app ID

__Methods__:

- `component.load(data)` the method loads `app` into the current element

__Properties__:

- `component.app` contains an `app` instance

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)