## j-iFrame

The component renders another URL address (stored in the `path` attribute) directly in the iframe. The biggest benefit is auto-resizing of the iframe element according to the `parent` selector.

- jComponent `v19|v20`

__Configuration__:

- `parent {String}` optional, a container selector (default: `window`)
- `margin {Number}` optional, a vertical margin (default: `0`)
- `scrollbar {Boolean}` optional, enables iframe scrolling (default: `false`)
- __NEW__: `message {String}` optional, a link to the `function(msg)`
- __NEW__: `ready {String}` optional, a link to the `function(com)` when the iframe is ready

__Methods__:

- __NEW__: `SETTER('iframe/send', { your_message_data })` for sending message to the iframe

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)