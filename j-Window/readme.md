## j-Window

- The component moves the content of this component under `<body>` tag (because of positioning)

__Configuration__:

- `title` {String} window title
- `if` {String} condition for showing of the window, it's compared with the value within of `path`
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global `function(window_component)` and it's executed if the form is showing
- `enter` {Boolean} (optional) captures `enter` key automatically and performs submit (default: `false`)
- `autofocus` {Boolean/String} (optional) can focus an input. `String` === `jQuery selector` for the input
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} (optional) can hide `x` button (default: `false`)
- `zindex` {Number} (optional) can affect z-index (default: `12`)
- `scrollbar` {Boolean} enables custom scrollbar (default: `true`)
- `scrollbarshadow` {Boolean} optional, enables a shadow in scrollbar (default: `false`)
- __NEW__ `closeesc` {Boolean} closes the form when the user presses `ESC` key
- __NEW__ `independent` {Boolean} closing doesn't depent on the condition according to the path

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Window will be displayed (only once).

```html
<div data---="window__path__config">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)