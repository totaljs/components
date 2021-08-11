## j-Panel

- supports __dark mode__

__Configuration__:

- `title` {String} window title
- `if` {String} condition for showing of the window, it's compared with the value within of `path`
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global function and it's executed if the form is displaying
- `enter` {Boolean} optional, captures `enter` key automatically and performs submit (default: `false`)
- `autofocus` {Boolean/String} optional, can focus an input. `String` === `jQuery selector` for the input
- `default` {String} optional, a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} optional, can hide `x` button (default: `false`)
- `width` {Number} optional, a default width of the panel (default: `300`)
- `bg` {Boolean} optional, can disable `background` (default: `true`)
- `bgclose` {Boolean} optional, if the user click on the background then the panel will be closed (default: `false`)
- `zindex` {Number} optional, can affect z-index (default: `12`)
- `close` {String} optional, path/method is executed as `path_to_method(com)` when the user closes the panel manually via close button
- `scrollbar` {Boolean} optional, enables custom scrollbar (default: `true`)
- `scrollbarY` {Boolean} optional, shows vertical custom scrollbar (default: `true`)
- `scrollbarshadow` {Boolean} optional, enables a shadow in scrollbar (default: `false`)
- `menu` {String} optional, a link to function (panel will show a button with burger icon in title bar)
- `container` {String} optional, jQuery selector (this container means a container for scrollbar)
- `margin` {Number} optional, a margin for `container` and its `scrollbar` (it works with `container` only)
- `closeicon` {String} optional, Font-Awesome icon (default: `fa fa-times`)
- __NEW__ `closeesc` {Boolean} closes the form when the user presses `ESC` key

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Panel will be displayed (only once).

```html
<div data---="panel__path__config">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)