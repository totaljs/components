## j-FlowEditor

The component opens Flow editor in the iframe.

- jComponent `v19|v20`
- Flow editor/designer repository <https://github.com/totaljs/flowdesigner> (if you don't want to use cloud version)

__Configuration__:

- `url {String}` a link to the Flow editor (default: `https://flow.totaljs.com`)
- `top {Number}` default: `0`
- `left {Number}` default: `0`
- `right {Number}` default: `0`
- `bottom {Number}` default: `0`
- `zindex {Number}` default: `30`
- `language {String}` default: `eu` (english)
- `closebutton {Boolean}` default: `true`

__Model__:

It must be a WebSocket URI to access the FlowStream.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)