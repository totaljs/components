## j-SplashScreen

A splash screen for single page applications. The body has to be wrapped into the `<script type="text/html">HTML</script>` tag. The component will be destroyed automatically.

__Configuration__:

- `timeout` a timeout in milliseconds for destroying the splash screen (default: `3000`)
- `autoremove:true {Boolean}` automatically removes component.
- `remember {String}` e.g. `1 day` or `1 week` - it doesn't show a splash screen (default: `empty` = disabled)

__Methods__:

- `component.show([body])` will show splashscreen with a new or old body (`autoremove` must be `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)