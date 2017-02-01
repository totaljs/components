## j-Checkboxlist

- works only with Bootstrap Grid System
- easy usage
- supports custom `datasource`

__Inline datasource__:

- `data-jc-type` supports only `number`
- `data-options="KEY1|VALUE1;KEY2|VALUE2`
- `data-class=""` each rendered `div` with the checkbox will contain this class
- `data-button="Select all"` a custom text for `Select all` button (default is hidden)
- `data-required="true"` (optional) enables validation

__Datasource in some model__:

- `data-source="somemodel"`
- `data-source-value="id"` (default)
- `data-source-text="name"` (default)

The component stores selected values into the array.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT