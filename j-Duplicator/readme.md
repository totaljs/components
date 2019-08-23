## j-Duplicator

__BETA VERSION__. This component is a bit special component because it can duplicate same content several times with diffferent data-source. Imaging some text editor with tabs which each tab contains different content. For this case is targeted `j-Duplicator`. Follow example.

__Configuration__:

- `datasource` {Array} must contain array of content for duplicating
- `url` {String} optional, can contain a link to external `template` __without `JavaScript`__

__Good to know__:
This component appends `.scopename()` function to each item of Array for handling of scope and each content is wrapped in to the independent `scope` with direct reference to main source.

### Advanced templating

```html
<div data---="duplicator__mytab__datasource:tabs" class="invisible">

	<script type="text/html" data-id="PRODUCT">
		<div data---="input__?.name">Name</div>
	</script>

	<script type="text/html" data-id="USER">
		<div data---="input__?.age">Age</div>
	</script>

	<!-- DYNAMIC -->
	<script type="text/html" data-id="ORDER" data-url="/templates/orders.html"></script>

</div>

<script>

	// All tabs
	var tabs = [];
	tabs.push({ template: 'PRODUCT', name: 'iPhone X' });
	tabs.push({ template: 'USER', age: 30 });
	tabs.push({ template: 'ORDER', price: 324 });

	// Choose a default open tab
	var mytab = tabs[0];

</script>
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT