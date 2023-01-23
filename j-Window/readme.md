## j-Window

- The component moves the content of this component under the `<body>` tag (because of positioning)

__Configuration__:

- `title` {String} window title
- `if` {String} condition for a showing of the window, it's compared with the value within of `path`
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global `function(window_component)` and it's executed if the form is showing
- `enter` {Boolean} (optional) captures the `enter` key automatically and performs submit (default: `false`)
- `autofocus` {Boolean/String} (optional) can focus an input. `String` === `jQuery selector` for the input
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} (optional) can hide `x` button (default: `false`)
- `zindex` {Number} (optional) can affect z-index (default: `12`)
- `scrollbar` {Boolean} enables a custom scrollbar (default: `true`)
- `scrollbarshadow` {Boolean} optional, enables a shadow in scrollbar (default: `false`)
- __NEW__ `closeesc` {Boolean} closes the form when the user presses the `ESC` key
- __NEW__ `independent` {Boolean} closing doesn't depend on the condition according to the path

__Good to know__:

A new version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Window will be displayed (only once).

```html
<ui-component name="window" path="path" config="config">
	<script type="text/html">
		A CONTENT
	</script>
</ui-component>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)