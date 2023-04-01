## j-iFrame

The component renders another URL address (stored in the `path` attribute) directly in the iframe. The biggest benefit is auto-resizing of the iframe element according to the `parent` selector.

__Configuration__:

- `parent {String}` optional, a container selector (default: `window`)
- `margin {Number}` optional, a vertical margin (default: `0`)
- `scrollbar {Boolean}` optional, enables iframe scrolling (default: `false`)
- `position {String}` optional, it can be `absolute` (default: `null`)
- `left {Number}` optional, left offset (only for `absolute` position)
- `right {Number}` optional, right offset (only for `absolute` position)
- `top {Number}` optional, top offset (only for `absolute` position)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)