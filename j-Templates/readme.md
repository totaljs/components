## j-Templates

- multiple templates
- drag & drop
- custom scrollbars
- context menu

__Configuration__:

- `template {String}` a path to the watching a template name
- `scrollbar {Boolean}` uses a custom scrollbar (default: `true`)
- `scrolltop {Boolean}` scrolls to top if the source is changed (default: `true`)
- `visibleY {Boolean}` shows scrollbar Y (default: `true`)
- `margin {Number}` a vertical margin (default: `0`)
- `parent {String}` jQuery selector to parent container due to `scrollbar` (default: `auto`)
- `contextmenu {String}` a path to the method `function(e)` if the user triggers context-menu
- `emptyif {String}` a condition for showing of empty content (default: `!value || !value.length`)
- `drop {String}` a path to the method `function(e, target, selel)`
	- the method is evaluated if the user drops some files, then `selel` is undefined
	- or the user drags & drops element with the `draggable` attribute (`selel` argument) into the `target` argument (target must contain `droppable` class)

Templates must be defined in `<script type="text/html" data-name="NAME_OF_TEMPLATE">Tangular template</script>` element. This component supports one special template called `empty` that will be visible if the `emptyif` option will be valid.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)