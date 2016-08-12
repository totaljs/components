## j-Dropdown Checkbox List

- Works only with [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap

__Inline datasource__:

- `data-component-type` supports only `number` but only for `data-options` attribute
- `data-options="KEY1|VALUE1;KEY2|VALUE2`

__Datasource in some model__:

- `data-source="somemodel"`
- `data-source-value="id"` (default)
- `data-source-text="name"` (default)

__Other attributes__:

- `data-required="true"` user must select some value
- `data-placeholder="TEXT"` a placeholder for empty value
- `data-empty="TEXT"` an empty text when is the `data-source` empty

The component stores selected values into the array.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT