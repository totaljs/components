## j-InfiniteScroll

- jComponent `v19|v20`

__Configuration__:

- `parent {String}` a parent element due to height of container (default: `parent`)
- `margin {Number}` a margin for `height` (default: `0` px)
- `padding {Number}` a bottom scroll padding for performing of reading (default: `50` px)
- `autoscroll {Number}` automatically scrolls container if the content is added (default: `100` px)
- `exec {String}` a link to the method which is executed if the scrollbar is at the end, look into the implementation below:

```javascript
function method_append(next, element, init) {
	// @next {Function(new_content)}
	// @element {jQuery}
	// @init {Boolean} Is the component initialized?

	// element.append(...);
	// or
	next('NEW_HTML_CONTENT_or_RAW_NODE_ELEMENT');
}
````

### Author

- Peter Širka <info@totalavengers.com>
- [License](https://www.totaljs.com/license/)