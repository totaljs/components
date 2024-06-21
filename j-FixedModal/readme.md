## j-FixedModal

- Works only with `+v17`
- The component moves the content of this component under `<body>` tag (because of positioning)

- jComponent `v19|v20`

__Configuration__:

- `width {Number}` modal max-width
- `if {String}` condition for showing of the modal, it's compared with the value within of `path`
- `reload {String}` link to a global function and it's executed if the form is showing
- `submit {String}` link to a global function and it's executed if the submit button is pressed
- `cancel {String}` link to a global function and it's executed if the cancel button is pressed
- `enter {Boolean}` captures `enter` key automatically and performs submit (default: `false`)
- `autofocus {Boolean/String}` can focus an input. `String` === `jQuery selector` for the input
- `default {String}` a short alias for `DEFAULT(default, true)`
- `zindex {Number}` can affect z-index (default: `12`)

__Good to know__:

The content of the `j-FixedModal` is divided to 3 parts: `header`, `body` and `footer`. Each part must be defined. The component adds CSS classes to each part, for example first `div` will contain `ui-fixedmodal-header`, second `ui-fixedmodal-body` and third `ui-fixedmodal-footer`.

---

This component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Modal will be displayed (only once).

```html
<ui-component name="fixedmodal" path="path" config="config">
	<script type="text/html">
		A CONTENT
	</script>
</ui-component>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)