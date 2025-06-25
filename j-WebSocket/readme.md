## j-WebSocket

With this component, you can receive data via WebSocket. This component supports auto-reconnect to WebSocket when the connection is closed.

- jComponent `v19|v20`

__Configuration__:

- `url {String}` URL for websocket, it can be relative or absolute
- `reconnect {Number}` can contain only a number (milliseconds, default: `2000`)
- `bind {Boolean}` enables binding of value according to the component `path` (default: `false`)
- `encoder {Boolean}` performs encode/decode messages via `URI` (default: `false`)
- `message {String}` a link to method `function(msg)`
- `online {String}` a link to method `function(isonline)`
- __NEW__: `statsinterval {Number}` stats interval in milliseconds (default: `1000`)
- __NEW__: `stats {String}` a link to method `function({ received: Number, sent: Number })` or path to a variable (measured in bytes)

__Methods__:

- `component.send(obj)` - sends JSON serialized object to the server
- `component.close()` - closes connection
- `component.connect()` - opens connection
- `component.idle(is)` - __NEW__ can cancel/reopen connection

__Events__:

- `ON('message', function(data) {})` - received data
- `ON('online', function(isOnline) {})` - online/offline

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)