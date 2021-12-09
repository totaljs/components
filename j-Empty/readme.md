## j-Empty

- `path` must contain a data-source which will be watched

__Configuration__:

- `icon {String}` a default icon (default: `fa fa-database`)
- `parent {String}` a parent container which sets a minimal height (default: `parent`)
- `height {Number}` height size (if you don't want to use `parent`, default: `undefined`)
- `margin {Number}` a margin (default: `0`)
- `topoffset {Boolean}` applies `element.offset().top` as a margin (default: `false`)
- `topposition {Boolean}` applies `element.position().top` as a margin (default: `false`)
- __NEW__ `wait {Boolean}` waits for the data (default: `false`)

__Use-case 1__:

```html
<div data---="empty__datasource" class="hidden">
	Items not found
</div>
<div class="hidden" data-bind="datasource__show:value && value.length"></div>
```

__Use-case 2__:

```html
<div data---="empty__datasource" class="hidden">
	<script type="text/html">
		Items not found
	</script>
	<div>
		YOUR CONTENT. This DIV will be hidden automatically if the "datasource" is empty.
	</div>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)