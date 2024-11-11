## j-Changer

This component captures inline changes and can affect the `validate` component.

- jComponent `v19|v20`

__An example to understand__:

```html

<ui-plugin>

	...
	...

	<ui-component name="changer" path="?.pictures"></ui-component>

	<nav>
		<ui-component name="validate" path="?">
			<button name="submit" disabled><i class="ti ti-check-circle mr5"></i>SUBMIT</button>
			<button name="cancel">Cancel</button>
		</ui-component>
	</nav>
</ui-plugin>

<script>
	PLUGIN(function(exports) {
		exports.upload = function() {
			exports.push('pictures @change', { ... });
		};
	});

</script>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)