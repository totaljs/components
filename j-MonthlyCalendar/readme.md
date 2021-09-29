## j-MonthlyCalendar (BETA)

- supports only monthly view

__Configuration__:

- `parent` {String} a jQuery selector for obtaining of fixed height (default `auto`)
- `firstday` {Number} first day in the calendar `0 = Sunday`, default `0`
- `noborder` {Boolean} disables border (default: `false`)
- `selectable` {Boolean} enables selecting of days (default: `true`)
- `morebutton` {String} a Tangular template for __More button__ (default: `+{{ count }} more`)
- `select` {String} a path to `Function(item_event, el, e)`, be careful: `item_event` can be `null`
- `create` {String} a path to `Function({ beg: Date, end: Date }, beg_element, end_element)`
- `dblclick` {String} a path to `Function(item_event, el, e)`
- `dblclickdate` {String} a path to `Function(date, el, e)`
- `contextmenu` {String} a path to `Function(item_event, el, e)`
- `rebind` {String} a path to `Function({ dates: Array, date: Date })` is executed when the calendar is rebinded
- `topoffset` {Boolean} subtracts `offset.top` from `height` (default: `false`)
- `topposition` {Boolean} subtracts `position.top` from `height` (default: `false`)
- `margin` {Number} top/bottom margin together (default: `0`)
- `marginxs` {Number} top/bottom margin together for `xs` screen width
- `marginsm` {Number} top/bottom margin together for `sm` screen width
- `marginmd` {Number} top/bottom margin together for `md` screen width
- `marginlg` {Number} top/bottom margin together for `lg` screen width
- `hover` {String} a path to `Function({ beg: Date, end: Date }, beg_element, end_element)` (same like `create`, but it's called on `component.hover()` and `component.unhover()` methods)

__Methods__:

- `component.addevents(events)` adds events
	- `events` means Array of object below:
	- `[{ id: String, beg: Date, end: Date, html: String, icon: String, color: String, background: Boolean }]`
- `component.addevent(event)` adds an event
	- can't be combined with `addevents` method
	- can be executed multiple times
	- event object: `{ id: String, html: String, icon: String, color: String, background: Boolean }`
- __NEW__: `component.addbadge(date, [color])` adds a badge
- __NEW__: `component.hover(beg, end)`
- __NEW__: `component.unhover()`
- `component.clear()` removes all events and badges

__Localization__:

Month and day names are taken from `MONTHS` and `DAYS` properties defined in jComponent library.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)