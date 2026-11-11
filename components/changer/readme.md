---
name: Changer
description: This component captures inline changes and can affect the validate component.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-08-14 19:55
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Changer

This component captures inline changes and can affect the `validate` component.

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
