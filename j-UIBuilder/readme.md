## j-UIBuilder

This component renders the application designed via UI Builder. You can load the app via the `path` specified in the component or via the `config.url` option. The path can contain a URL address to the `JSON` app schema or the app object (parsed JSON).

- jComponent `v19|v20`

__Configuration__:

- `app {String}` a link to the method/variable where will be stored `app` instance
- `url {String}` a link to the app schema (must be in the `json` format)
- `css {Boolean}` applies app style to the current element (default: `true`)
- `id {String}` overwrites app ID

__Methods__:

- `component.load(data)` the method loads `app` into the current element

__Properties__:

- `component.app` contains an `app` instance

## How to handle data?

```html
<ui-component name="uibuilder" ... config="app:myapphandler"></ui-component>

<script>

	function myapphandler(app) {

		// app.component {jComponent}
		// app.schema {Object} uibuilder compiled design
		// app.schema.inputs {Array Objects}
		// app.schema.outputs {Array Objects}

		// How to capture data?
		app.on('output', function(meta) {
			// meta.id {String} output identifier
			// meta.data {Object} raw data from the builder
			// meta.app {Object} app instance
			// meta.instance {Object} which instance sent data?
			// meta.instanceid {String} an instance identifier
			// meta.component {Object} which component sent data?
			// meta.componentid {String} a component identifier
			// meta.err {String} optional, error handler (nullable)
			// meta.output {String} an output name
			// meta.note {String} optional, a note
			// meta.ref {String} an internal reference

			AJAX('POST /yourapi/', meta.data, function(response) {
				// What next?
			});

		});

		// How to inject data?
		// Example
		app.on('ready', function() {
			// First, you must know input identifier
			app.input('cidlm5caacg_load', { email: '@' }, console.log);
		});

	}

</script>
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)