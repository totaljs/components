## j-View

This component can be helpful for reusable views in intranet apps. The component wraps the view into the isolated scope, and the value according to the component path will be used as a model for the view.

- jComponent `v19|v20`

__Configuration__:

- `url {String}` URL address to the view (`.html` file)
- `cache {String}` download cache (default: `session`)

### Usage

__app.html__:

```html
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>

- you can use an unlimited count of the same views (identifier is URL address)
- each view will have an independent scope/plugin

Example:
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>
<ui-component name="view" path="some.path" config="url:view.html"></ui-component>
```

__view.html__:

```html
<div>
	<h1><ui-bind path="?.name" config="text"></ui-bind></h1>
	<button class="exec" data-exec="?/uppercase">To upper-case</button>
</div>

<script>
	// Plugin is optional
	// Name of the plugin is internally generated randomly
	PLUGIN(function(exports) {

		// Optional
		// Is executed only one-time
		exports.init = function(el) {
			// @el {jQuery element}
		};

		exports.uppercase = function() {
			var model = GET('?');
			model.name = model.name.toUpperCase();
			UPD('?.name');
		};

	});
</script>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)