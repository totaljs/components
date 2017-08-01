## j-WebSocket

With this component you can receive data via WebSocket. This component supports auto-reconnect to WebSocket when the connection is close.

__Attributes__:
- `data-jc-path` - (optional) the component binds data from websocket according to the path (if exists)

__Configuration__:

- `url` {String} URL for websocket, it can be relative or absolute
- `reconnect` {Number} can contain only number (milliseconds, default: `2000`)

__Methods__:
- `component.send(obj)` - sends JSON serialized object to the server
- `component.close()` - closes connection
- `component.connect()` - opens connection

__Events__:
- `ON('message', function(data) {})` - received data
- `ON('online', function(isOnline) {})` - online/offline

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT