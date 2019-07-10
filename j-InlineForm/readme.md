## j-InlineForm

- Works with Bootstrap
- The component moves the content of this component under `<body>` tag (because of positioning)

__Configuration__:

Example: `data-jc-config="title:Form title;width:200;icon:home"`

- `title` {String} form title
- `width` {Number} form max-width
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global function and it's executed if the form is showing
- `submit` {String} link to a global function and it's executed if the submit button is pressed
- `cancel` {String} link to a global function and it's executed if the cancel button is pressed
- `enter` {Boolean} (optional) captures `enter` key automatically and performs submit (default: `false`)
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`

__Methods__:

- `instance.show(el, position, [offsetX], [offsetY])` - shows the form, positions: `left` (default, `center` or `right`
- `instance.hide()` - hides the form
- `instance.toggle(el, position, [offsetX], [offsetY])` - toggles the form

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-InlineForm will be displayed (only once).

```html
<div data-jc="inlineform">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT