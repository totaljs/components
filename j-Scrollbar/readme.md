## j-Scrollbar

Custom scrollbars. __IMPORTANT:__ It wraps current content by adding two nested `div` elements with `relative` position. __It works with jComponent v17 only__.

__Configuration__:

- `parent` {String} selector for a parent element, can contain `window` (default: `undefined`)
- `visibleX` {Boolean} always shows horizontal scrollbar (default: `false`)
- `visibleY` {Boolean} always shows vertical scrollbar (default: `false`)
- `offset` {Boolean} adds `offset.top` of this element (default: `false`)
- `reset` {Boolean} resets position if the `path` is changed (default: `true`)
- `margin` {Number} a margin for all types of displays (default: `0`)
- `marginxs` {Number} a margin for `XS` displays (default: `0`)
- `marginsm` {Number} a margin for `SM` displays (default: `0`)
- `marginmd` {Number} a margin for `MD` displays (default: `0`)
- `marginlg` {Number} a margin for `LG` displays (default: `0`)
- `track` {String} can track only defined paths e.g. `FIELD1,FIELD2,FIELD3`, paths will linked with `component.path`

__Methods__:

- `component.reset()` resets the position to `0,0`
- `component.scrollleft(val)` scrolls X
- `component.scrolltop(val)` scrolls Y
- `component.scrollright(val)` scrolls X from right side
- `component.scrollbottom(val)` scrolls Y from bottom side
- `component.scroll(x, y)` scrolls X,Y
- `component.resize()` resizes container (it reacts on `resize` events automatically)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT