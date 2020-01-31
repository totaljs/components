## j-Form

- The component moves the content of this component under `<body>` tag (because of positioning)

__Configuration__:

Example: `data-jc-config="title:Form title;width:800;if:user;icon:home"`

- `title` {String} form title
- `width` {Number} form max-width
- `if` {String} condition for showing of the form, it's compared with the value within of `data-jc-path`
- `icon` {String} Font-Awesome icon without `fa-` or __new__: `far fa-home`
- `reload` {String} link to a global function and it's executed if the form is showing
- `submit` {String} link to a global function and it's executed if the submit button is pressed
- `cancel` {String} link to a global function and it's executed if the cancel button is pressed
- `enter` {Boolean} captures `enter` key automatically and performs submit (default: `false`)
- `center` {Boolean} centers the form to middle of screen
- `autofocus` {Boolean/String} can focus an input. `String` === `jQuery selector` for the input
- `default` {String} a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} can hide `x` button (default: `false`)
- `zindex` {Number} can affect z-index (default: `12`)
- `scrollbar` {Boolean} enables custom scrollbar (default: `true`)

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Form will be displayed (only once).

```html
<div data---="form__path__config">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)