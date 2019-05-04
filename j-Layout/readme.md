## j-Layout

This component can create a layout for your SPA. This component is a bit harder for understanding, but it's very helpful. `j-Layout` uses jComponent `+v17`.

__Configuration__:

- `parent` {String} can contain `parent`, `window` or jQuery selector for closest method (default: `window`)
- `margin` {Number} add margin for `height` of this component (default: `0`)
- `remember` {Boolean} can remember last settings of layout for resizing (default: `true`)
- `space` {Number} internal, contains a space between panels (default: `1`)
- `border` {Number} internal, contains a border size (default: `0`)

__Methods__:

- `component.refresh()` refreshes layout
- `component.resize()` performs resize
- `component.reset()` performs reset of resizing
- `component.layout(name)` changes a layout (like two way data-binding)
- `component.rebind(code_string)` makes a new layout configuration

__Panel types__:

- `left` left panel, can be resizable
- `right` right panel, can be resizable
- `top` top panel, can be resizable (it's panel on top of all panels)
- `top2` top panel, can be resizable (it is between `left` and `right` panel)
- `bottom` bottom panel, can be resizable (it's panel on bottom of all panels)
- `bottom2` bottom panel, can be resizable (it is between `left` and `right` panel)
- `main` main panel, __can't be resizable__ and size is counted automatically

__Layout__:

Making of layout is very easy and with a lot of possibilities. Layout must have own HTML structure. Look to example. The example below describes only meta data of the layout.

- `height` {Number/String} only for `top` and `bottom` panel, can contain a height of panel. Number `120` defines pixels and String `100%` can define percentage
- `width` {Number/String} only for `left` and `right` panel, can contain a height of panel. Number `120` defines pixels and String `100%` can define percentage
- `resize` {Boolean} enables resizing of the panel with except `main` panel (it's counted automatically)
- `show` {Boolean} enables visibility (default: `false`)

```javascript
{
	top: { height: 80, resize: true }, // top panel
	right: { width: 100 },
	bottom: { height: 100 }, // bottom panel
	left: { width: 100, resize: true }, // left panel
	main: {}, // main panel

	// Can contain a different template for various display types
	// lg = Large display, md = Medium display, sm = Small display, xs = Extra small display
	md: {
		top: { show: true, height: 80 },
		bottom: { show: false },
		left: { show: false },
		main: { show: true }
	},

	// Custom layouts
	detail: {

		// Custom display types in custom layouts
		md: {
			top: { show: true },
			bottom: { show: true },
			main: { show: true },
			left: { show: false },
			right: { show: true, width: 300 }
		},
		xs: {
			top: { show: true },
			bottom: { show: true },
			main: { show: false },
			left: { show: false },
			right: { show: true, width: '100%' }
		}
	}
}
```

__Good to know__:

- __IMPORTANT__: this component must contain meta-data of the layout wrapped in `<script type="text/plain"></script>`
- each panel is `section` element and must contain `data-type="top"` attribute with type of panel
- define panels only which you will use
- ordering of all `section` elements isn't important

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT