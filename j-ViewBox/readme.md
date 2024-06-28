## j-ViewBox

- jComponent `v19|v20`
- keeps a fixed percentage height
- great usage for intranet applications
- supports `releasing`

__Configuration__:

- `height {Number}` a percentage of height
- `disabled {Boolean}` optional, can disable content with the layer
- `parent {String}` optional, a container with fixed height, can be `window`. Default value: `parent` element.
- `minheight {Number}` a minimal height in pixels (default: `0` - disabled)
- `scroll {Boolean}` enables vertical scrolling (default: `false` - disabled)
- `scrollbar {Boolean}` shows scrollbar (default: `true`)
- `delay {Number}` `msec.` resizes the box again if the value is changed according to the path (default: `100`)
- `visibleY {Boolean}` still shows the `Y` scrollbar (default: `false`)
- `visibleX {Boolean}` still shows the `X` scrollbar (default: `false`)
- `scrollto {String}` scrolls to top/bottom automatically if the `path` is changed (default: `EMPTY`, can be `top` or `bottom`)
- `margin {Number}` optional, a top/bottom margin together (supports `auto` which is counted from `offset.top`, default: `0`)
- `marginxs {Number}` optional, a top/bottom margin together for `xs` screen width
- `marginsm` optional, a top/bottom margin together for `sm` screen width
- `marginmd` optional, a top/bottom margin together for `md` screen width
- `marginlg` optional, a top/bottom margin together for `lg` screen width
- `invisible {Boolean}` if `true` then viewbox sets `invisible` class when is rendering (default: `true`)
- `scrollbarshadow {Boolean}` if `true` then the custom scrollbars will contain vertical shadow (default: `false`)
- `initdelay {Number}` removes the `inivisible` class after specified time (default: `250` ms)
- `centered {Boolean}` enables vertical and horitonzal centering for the content (default: `false`)
- `resizedelay {Number}` delay for resizing (default: `200`)
- __NEW__: `togglescrolled {String}` a DOM selector for the parent elements (it appends `ui-viewbox-scrolled` class when the viewbox is scrolled)

__Methods__:

- `component.scrolltop(val)` scrolls Y
- `component.scrollbottom(val)` scrolls Y from bottom side
- `component.resize()` resizes the container (it reacts on `resize` events automatically)
- `component.resizescrollbar()` resizes custom scrollbar (targeted for special cases)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
