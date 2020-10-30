## j-Section

- keeps a fixed percentage height
- great usage for intranet applications
- supports `releasing`

__Configuration__:

- `height` {Number} a percentage of height
- `parent` {String} optional, a container with fixed height, can be `window`. Default value: `parent` element.
- `minheight` {Number} a minimal height in pixels (default: `0` - disabled)
- `scroll` {Boolean} enables vertical scrolling (default: `false` - disabled)
- `scrollbar` {Boolean} shows scrollbar (default: `false`)
- `delay` {Number} `msec.` resizes the box again if the value is changed according to the path (default: `100`)
- `visibleY` {Boolean} still shows `Y` scrollbar (default: `false`)
- `visibleX` {Boolean} still shows `X` scrollbar (default: `false`)
- `scrolltop` {Boolean} scrolls to top automatically if the `path` is changed (default: `false`)
- `margin` {Number} optional, a top/bottom margin together (supports `auto` which is counted from `offset.top`, default: `0`)
- `marginxs` {Number} optional, a top/bottom margin together for `xs` screen width
- `marginsm` optional, a top/bottom margin together for `sm` screen width
- `marginmd` optional, a top/bottom margin together for `md` screen width
- `marginlg` optional, a top/bottom margin together for `lg` screen width
- `invisible` {Boolean} if `true` then section sets `invisible` class when is rendering (default: `true`)
- `autofocus` {Boolean/String} can focus an input. `String` === `jQuery selector` for the input
- `back` {String} a title for back button (default: `Back`)
- `delayanim` {Number} animation delay (default: `100`)

__Methods__:

- `component.scrolltop(val)` scrolls Y
- `component.scrollbottom(val)` scrolls Y from bottom side
- `component.resize()` resizes container (it reacts on `resize` events automatically)
- `component.resizescrollbar()` resizes custom scrollbar (targeted for special cases)

__Definition__:

```html
<div data---="section__path">

	<!-- path must have same value as "data-if" attribute -->
	<section data-if="1" data-label="Label for header">

	</section>

	<!-- path must have same value as "data-if" attribute -->
	<!-- "data-parent" enables Back button in the header and after click the component sets value from "data-parent" attribute -->
	<section data-if="2" data-parent="1" data-label="Label for header">

	</section>

	<!-- GOOD TO KNOW: Dynamic compilation -->
	<section data-if="3" data-parent="2" data-label="Label for header">

		<!-- SCRIPT or TEMPLATE -–>
		<script type="text/html">
			Will be compiled and rendered when the section will be displayed
		</script>

	</section>

</div>
```

__Good to know__:

If you want to add an additional content into the header to right side, just append inside of component e.g. `<div>BUTTON</div>`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
