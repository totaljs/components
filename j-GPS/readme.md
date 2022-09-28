## j-GPS

- singleton
- readonly

The component tries to read GPS coordinates.

__Configuration__:

- `watcher {Boolean}` enables real-time watchers (default: `true`)

__Good to know__:

The component emits `ON('gps', function(coords) {` event with a new GPS coordinates.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)