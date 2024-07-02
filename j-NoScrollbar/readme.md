## j-NoScrollbar

- jComponent `v19|v20`
- this component is something like `j-ViewBox` without native/custom scrollbar

__Configuration__:

- `parent` {String} optional, a container with fixed height, can be `window`. Default value: `parent` element.
- `minheight` {Number} a minimal height in pixels (default: `0` - disabled)
- `delay` {Number} `msec.` resizes the box again if the value is changed according to the path (default: `100`)
- `scrollto` {String} scrolls to top/bottom automatically if the `path` is changed (default: `EMPTY`, can be `top` or `bottom`)
- `margin` {Number} optional, a top/bottom margin together (supports `auto` which is counted from `offset.top`, default: `0`)
- `marginxs` {Number} optional, a top/bottom margin together for `xs` screen width
- `marginsm` optional, a top/bottom margin together for `sm` screen width
- `marginmd` optional, a top/bottom margin together for `md` screen width
- `marginlg` optional, a top/bottom margin together for `lg` screen width
- `invisible` {Boolean} if `true` then viewbox sets `invisible` class when is rendering (default: `true`)
- `initdelay` {Number} removes `inivisible` class after specified time (default: `250` ms)

__Methods__:

- `component.scrolltop(val)` scrolls Y
- `component.scrollbottom(val)` scrolls Y from bottom side
- `component.resize()` resizes container (it reacts on `resize` events automatically)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
