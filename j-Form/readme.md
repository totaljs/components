## j-Form

- jComponent `v19|v20`

__Configuration__:

- `title {String}` form title
- `width {Number}` form max-width
- `if {String}` condition for showing of the form, it's compared with the value within of `path`
- `icon {String}` Font-Awesome icon without `ti-` or __new__: `ti ti-home`
- `reload {String}` link to a global `function(form_component)` and it's executed if the form is displaying
- `submit {String}` link to a global `function(hide)` and it's executed if the submit button is pressed
- `cancel {String}` link to a global `function(hide)` and it's executed if the cancel button is pressed
- `enter {Boolean}` captures `enter` key automatically and performs submit (default: `false`)
- `center {Boolean}` centers the form to middle of screen
- `autofocus {Boolean/String}` can focus an input. `String` === `jQuery selector` for the input
- `default {String}` a short alias for `DEFAULT(default, true)`
- `closebutton {Boolean}` can hide `x` button (default: `false`)
- `zindex {Number}` can affect z-index (default: `12`)
- `scrollbar {Boolean}` enables custom scrollbar (default: `true`)
- `closeoutside {Boolean}` closes the form when the user clicks outside of the form (default: `false`)
- `closeesc {Boolean}` closes the form when the user presses `ESC` key
- `independent {Boolean}` closing doesn't depent on the condition according to the path
- `close {String}` link to a global `function()` and it's executed if the form is closing
- __NEW__ `hide {String}` link to a global `function()` and it's executed if the form hides

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Form will be displayed (only once).

```html
<ui-component name="form" path="path" config="config">
	<script type="text/html">
		A CONTENT
	</script>
</ui-component>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)