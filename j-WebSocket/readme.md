## j-WebSocket

With this component you can receive data via WebSocket. This component supports auto-reconnect to WebSocket when the connection is close.

__Attributes__:
- `data-component-path` - the component binds data from websocket according to the path
- `data-url` - URL for websocket, it can be relative or absolute
- `data-reconnect` - can contain only number (milliseconds, default: `2000`)

__Methods__:
- `component.send(obj)` - sends JSON serialized object to the server
- `component.close()` - closes connection
- `component.connect()` - opens connection

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT