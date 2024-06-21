## j-Modal

Is a simple alternative to `j-Form`.

- Works only with `+v17`
- The component moves the content of this component under `<body>` tag (because of positioning)

- jComponent `v19|v20`

__Configuration__:

- `title {String}` modal title (it replaces a `HTML` in label element in the header)
- `width {Number}` modal max-width
- `if {String}` condition for showing of the modal, it's compared with the value within of `path`
- `icon {String}` Total icon without `ti-`
- `reload {String}` link to a global `function(modal_component)` and it's executed if the form is displaying
- `submit {String}` link to a global `function(hide)` and it's executed if the submit button is pressed
- `cancel {String}` link to a global `function(hide)` and it's executed if the cancel button is pressed
- `enter {Boolean}` captures `enter` key automatically and performs submit (default: `false`)
- `center {Boolean}` centers the form to middle of screen
- `autofocus {Boolean/String}` can focus an input. `String` === `jQuery selector` for the input
- `default {String}` a short alias for `DEFAULT(default, true)`
- `zindex {Number}` can affect z-index (default: `12`)
- `align {Number}` aligns modal `0` centered (default), `1` right bottom, `2` left bottom, `3` left top, `4` right top
- `height {Number}` a min. height if the content has less size than defined `height`
- __NEW__ `bg {Boolean}` can enable/disable a background layer (default: `true`)
- __NEW__ `scrollbar {Boolean}` can enable/disable the scrollbar (default: `false`)

__Good to know__:

The content of the `j-Modal` is divided to 3 parts: `header`, `body` and `footer`. Each part must be defined. The component adds CSS classes to each part, for example first `div` will contain `ui-modal-header`, second `ui-modal-body` and third `ui-modal-footer`.

---

This component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Modal will be displayed (only once).

```html
<ui-component name="modal" path="path" config="config">
	<script type="text/html">
		A CONTENT
	</script>
</ui-component>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)