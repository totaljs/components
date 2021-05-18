## j-Layout

- This component can create a layout for your SPA. This component is a bit harder for understanding, but it's very helpful. `j-Layout` uses jComponent `+v17`.

__Configuration__:

- `parent` {String} can contain `parent`, `window` or jQuery selector for closest method (default: `window`)
- `margin` {Number} adds margin for the `height` (default: `0`)
- `remember` {Boolean} can remember last settings of layout for resizing (default: `true`)
- `space` {Number} internal, contains a space between panels (default: `1`)
- `border` {Number} internal, contains a border size (default: `0`)
- `resize` {String} internal, a path to method which it's executed when the layout is resized
- `autoresize` {Boolean} enables auto-resize (default: `true`)

__Methods__:

- `component.refresh()` refreshes layout
- `component.resize()` performs resize
- `component.reset()` performs reset of resizing
- `component.layout(name)` changes a layout (like two way data-binding)
- `component.rebind(code_string)` makes a new layout configuration
- `component.lock(type, [boolean])` locks the panel

__Panel types__:

- `left` left panel, resizable
- `right` right panel, resizable
- `right2` right panel will be next to the left panel and uses `right` key in the config, resizable
- `top` top panel, resizable (it's panel on top of all panels)
- `top2` top panel, resizable and uses `top` key in the config (it is between `left` and `right` panel)
- `bottom` bottom panel, resizable (it's panel on bottom of all panels)
- `bottom2` bottom panel, resizable and uses `bottom` key in the config (it is between `left` and `right` panel)
- `main` main panel, __can't be resizable__ and size is counted automatically

__Layout__:

Making of layout is very easy and with a lot of possibilities. Layout must have own HTML structure. Look to example. The example below describes only meta data of the layout.

- `size` {Number/String} can contain a height/width of panel according to the panel type. Number `120` defines pixels and String `100%` can define percentage
- `minsize` {Number/String} is a minimal size of panel when the panel is resizing (default: `size` value)
- `resize` {Boolean} enables resizing of the panel with except `main` panel (it's counted automatically)
- `show` {Boolean} enables visibility (default: `false`)

```javascript
{
	top: { size: 80, resize: true, minsize: 50 }, // top panel
	right: { size: 100 },
	bottom: { size: 100 }, // bottom panel
	left: { size: 100, resize: true }, // left panel
	main: {}, // main panel

	// Can contain a different template for various display types
	// lg = Large display, md = Medium display, sm = Small display, xs = Extra small display
	md: {
		top: { show: true, size: 80 },
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
			right: { show: true, size: 300 }
		},
		xs: {
			top: { show: true },
			bottom: { show: true },
			main: { show: false },
			left: { show: false },
			right: { show: true, size: '100%' }
		}
	}
}
```

__Good to know__:

- __IMPORTANT__: this component must contain meta-data of the layout wrapped in `<script type="text/plain"></script>`
- each panel is `section` element and must contain `data-type="top"` attribute with type of panel
- define panels only which you will use
- ordering of all `section` elements isn't important
- `top2` uses `top` config key
- `right2` uses `right` config key
- `bottom2` uses `bottom` config key

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
