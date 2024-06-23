- The component moves the content of this component under `<body>` tag (because of positioning)

- jComponent `v19|v20`

__Configuration__:

- `if {String}` condition for showing of the form, it's compared with the value within of `data-jc-path`
- `reload {String}` link to a global `function(form_component)` and it's executed if the form is displaying
- `autofocus {Boolean/String}` can focus an input. `String` === `jQuery selector` for the input
- `default {String}` a short alias for `DEFAULT(default, true)`
- `zindex {Number}` can affect z-index (default: `12`)
- `closebutton {Boolean}` can hide `x` button (default: `false`)
- `closeoutside {Boolean}` closes the form when the user clicks outside of the form (default: `false`)
- or `closeoutside {String}` can contain a jQuery selector which will be included to a close event
- `closeesc {Boolean}` closes the form when the user presses `ESC`
- `scrollbar {Boolean}` enables custom scrollbar (default: `true`)
- `visibleY {Boolean}` shows vertical scrollbar (default: `false`)
- `close {String}` link to a global `function()` and it's executed if the form is closing

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Form will be displayed (only once).

```html
<ui-component name="centered" path="path" config="config">
	<script type="text/html">
		A CONTENT
	</script>
</ui-component>
```

- all buttons with `name="close"` attribute closes the component automatically
- all elements with `data-name="close"` attribute closes the component automatically

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)