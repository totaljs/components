## j-View

This component can be helpful for reusable views in intranet apps. The component wraps the view into the isolated scope, and the value according to the component path will be used as a model for the view.

__Configuration__:

- `url {String}` URL address to the view (`.html` file)
- `cache {String}` download cache (default: `session`)

### Usage

__app.html__:

```html
<div data---="view__some.path__url:view.html"></div>

- you can use an unlimited count of the same views (identifier is URL address)
- each view will have an independent scope/plugin

Example:
<div data---="view__some.path__url:view.html"></div>
<div data---="view__some.path__url:view.html"></div>
<div data---="view__some.path__url:view.html"></div>
<div data---="view__some.path__url:view.html"></div>
<div data---="view__some.path__url:view.html"></div>
```

__view.html__:

```html
<div>
	<h1 data-bind="?.name__text"></h1>
	<button class="exec" data-exec="?/uppercase">To upper-case</button>
</div>

<script>
	// Plugin is optional
	// Name of the plugin is internally generated randomly
	PLUGIN(function(exports) {

		// Optional
		// Is executed only one time
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