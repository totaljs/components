## j-KeySelection

This component allows user to select some items by up/down keys and confirm selection by the `enter` key.

- supports auto-scroll

__Configuration__

- `selectoritem {String}` a selector for browsing items (default: `.item`)
- `selector {String}` a default selector for capturing keys (default: `input`)
- `class {String}` a selection class (default: `selected`)
- `autoselect {Boolean}` it should select first item (default: `true`)
- `autoscroll {Boolean}` enables/disables auto-scroll (default: `true`)
- `exec {String}` a link to the `function(jqueryel)`, evaluated by the `enter` key (optional, otherwise will be trigger `click` event)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)