## j-ExpansionPanel

The component wraps all nested elements into the `<form>` element with disabled form events.

- jComponent `v19|v20`

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

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)