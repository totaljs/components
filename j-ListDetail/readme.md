## j-ListDetail

The component divides the content for listing part and detail part. Displaying of detail part depends on the `path {Boolean}`.

__Configuration__:

- `parent {String}` parent element for obtaining of width/height (default: `auto`)
- `margin {Number}` a margin for height (default: `0`)
- `width {Number/String}` a detail panel width (default: `35%`)
- `minwidth {Number/String}` a minimal width of the detail panel (default: `20%`)
- `maxwidth {Number/String}` a maximal width of the detail panel (default: `50%`)
- `resize {Boolean}` enables/disables detail panel resizing (default: `true`)

Parts: list + detail must be wrapped to independent `<section>` element, e.g.

```html
<div data---="listdetail__...">
	<section>
		LIST
	</section>
	<section>
		DETAIL
	</section>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)