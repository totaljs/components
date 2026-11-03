---
name: expansionpanel
description: TODO
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2024-11-19 20:55
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ExpansionPanel

__Configuration__:

- `multiple {Boolean}` allows multiple opening of panels (default: `false`)
- `icon {String}` a label icon for every panel (default: `ti ti-caret-right`)

### How to define panels?

```html

<ui-component name="expansionpanel" path="*tab" config="multiple:0" class="invisible">

	<section data-id="logs" title="Logs" data-icon="ti ti-history">

		HTML CONTENT

	</section>

	<section data-id="parts" title="Parts" data-icon="ti ti-code-branch">

		HTML CONTENT

	</section>

</ui-component>
````

__Attributes__:

- `data-id` __required__, it must contain an identifier of the panel
- `title` __required__, it must contain a panel name
- `icon` optional, it can contain Total.js Icon (default: `config.icon`)
