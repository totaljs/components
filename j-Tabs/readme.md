## j-Tabs

- jComponent `v19|v20`

__Configuration__:

- `icon {String}` a label icon for every panel (default: `empty`)

### How to define panels?

```html

<ui-component name="tabs" path="*tab" class="invisible">

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

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)