## j-IdleTime

This component emits event `ON('idletime', function(is) {})` when the website is in idle. It reacts on mouse, keyboard, touch events or focusing of window. And the component sets `Boolean` according to the path with the current idle state.

- singleton

__Configuration__:

- `count {Number}` in seconds, default: `300` 5 minutes)

__Events__:

- `ON('idletime', function(is))` is emitted if the document is idle (`is=true`) / active (`is=false`)
- `ON('reload', function() {})` is emitted if the document is transformed from invisible to visible state within `config.count` interval

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
