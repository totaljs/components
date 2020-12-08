## j-SplashScreen

A splash screen for single page applications. The body has to be wrapped into the `<script type="text/html">HTML</script>` tag. The component will be destroyed automatically.

__Configuration__:

- `timeout` a timeout in milliseconds for destroying of splash screen (default: `2500`)
- `autoremove:true` automatically removes component.

__Methods__:

- `component.show([body])` will show splashscreen with a new or old body (`autoremove` must be `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)