## j-UIBuilder

__BETA__: This component renders application designed via UI Builder (we will releas it soon).

The app can be loaded via `path`. The path can contain URL address to the `JSON` app schema or it can contain the app object (parsed JSON).

__Configuration__:

- `app {String}` a link to the method/variable where will be stored app instance
- `url {String}` a link to the app schema (must be in the `json` format)

__Methods__:

- `component.load(data)` the method loads app into the current element

__Properties__:

- `component.app` contains app instance

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)