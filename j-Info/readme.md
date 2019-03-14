## j-Info

- singleton
- show: `SETTER('info', 'show', options)`
- hide: `SETTER('info', 'hide')`

__Show options__:

- `opt.element` {jQuery} an element where will be `j-Info` displayed
- `opt.align` {String} align `left` (default), `center` or `right`
- `opt.html` {String} a HTML content
- `opt.name` {String} a name of Tangular template, must be defined in `j-Info` body like example below
- `opt.value` {Object} a model for Tangular template
- `opt.minwidth` {Number} a minimal width (default: `100`)
- `opt.maxwidth` {Number} a maximal width (default: `280`)
- `opt.offsetX` {Number} `x` offset (default: `0`)
- `opt.offsetY` {Number} `y` offset (default: `0`)
- `opt.offsetWidth` {Number} `width` offset (default: `0`)
- `opt.callback` {Function} a callback is executed when the element is hidden
- `opt.class` {String} a custom class name

```javascript
var opt = {};
opt.element = YOUR_ELEMENT;
opt.html = 'TEST';
SETTER('info', 'show', opt);
````

__or with Tangular templates:__

```html
<div data---="info">

	<script type="text/html" name="template1">
		{{ value.name }}
	</script>

	<script type="text/html" name="template2">
		<h2>{{ value.firstname }} {{ value.lastname }}</h2>
	</script>

	<script type="text/html" name="template3">
		{{ value.description }}
	</script>

</div>

<script>
function some_caller() {
	var opt = {};
	opt.element = YOUR_ELEMENT;
	opt.name = 'template1';
	opt.value = { name: 'Peter' };
	SETTER('info', 'show', opt);
}
</script>
````

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT