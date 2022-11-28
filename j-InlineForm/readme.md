## j-InlineForm

- Works with Bootstrap
- The component moves the content of this component under `<body>` tag (because of positioning)

__Configuration__:

- `title` {String} form title
- `width` {Number} form max-width
- `icon` {String} Total icon without `ti-` or the whole declaration e.g. `ti ti-home`
- `reload` {String} a link to a global function and it's executed if the form is showing
- `submit` {String} a link to a global function and it's executed if the submit button is pressed
- `cancel` {String} a link to a global function and it's executed if the cancel button is pressed
- `hide` {String} a link to a global function and it's executed if the form is hiding
- `enter` {Boolean} captures `enter` key automatically and performs submit (default: `false`)
- `default` {String} a short alias for `DEFAULT(default, true)`
- `autohide` {Boolean} enables auto-hide (default: `true`)
- `autofocus` {Boolean} performs auto-focus to nearest input (default: `false`)

__Methods__:

- `instance.show(opt)` - shows the form
	- `opt.element` {jQuery element} element
	- `opt.align` {String} can be `left` (default), `right` or `center`
	- `opt.offsetX` {Number} offsetX (default: `0`)
	- `opt.offsetY` {Number} offsetY (default: `0`)
	- `opt.position` {String} can be `top` (default) or `bottom`
	- `opt.callback` {Function} a user defined function `callback(hide)`, `hide` attribute is `function`
- `instance.hide()` - hides the form

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-InlineForm will be displayed (only once).

```html
<div data---="inlineform">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)