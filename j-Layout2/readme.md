## j-Layout2

- This component is a much simple component compared to `j-Layout`.

__Configuration__:

- `parent` {String} can contain `parent`, `window` or jQuery selector for the `closest` method (default: `window`)
- `margin` {Number} adds margin for the `height` (default: `0`)
- `autoresize` {Boolean} enables auto-resize (default: `true`)

__Methods__:

- __IMPORTANT__ `component.show(type)` can show a specific panel for mobile devices, `type` can be `left`, `right` or `main`
- `component.resizescrollbar(panel_type)` resizes a scrollbar for a specific panel
- `component.scrolltop(panel_type)` scrolls to top for a specific panel

__Panel types__:

- `left` left panel
- `right` right panel
- `top` top panel (it's panel on top of all panels)
- `top2` top panel and uses `top` key in the config (it is between `left` and `right` panel)
- `bottom` bottom panel (it's panel on bottom of all panels)
- `bottom2` bottom panel and uses `bottom` key in the config (it is between `left` and `right` panel)
- `main` main content

__Layout__:

Making of layout is very easy.

```html
<div data-type="" data-size="" data-scrollbar=""></div>
```

__Attributes__:

- `data-type` must contain a type of section `top`, `top2` ,`left`, `right`, `bottom`, `bottom2` or `main`
- `data-size` contains a size of section `LG,MD,SM,XS` --> in pixels or percentage, example: `200,200,200,0` (`0` means hidden) or `20%` (all values will inherit `20%`)
- `data-scrollbar="margin:50;visible:1"` enables scrollbar, possible values:
	- `selector` {String} optional, jQuery selector for scrollbar container
	- `margin` {Number} scrollbar margin (default: `0`)
	- `visible` {Boolean} shows the scrollbar

__Good to know__:

- learn from example
- each panel is `section` element and must contain `data-type="top"` attribute with type of panel
- define panels only which you will use
- ordering of all `section` elements isn't important

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
