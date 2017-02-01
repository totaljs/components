## j-Dropdown List

- Works with Bootstrap

__Attributes__:

- `data-jc-type=""` (optional), supports __number__, default __empty__
- `data-required="true"` (optional) the field must have some value, default __false__
- `data-icon="fa-envelope"` (optional) the label icon, default __empty__
- `data-autofucs="true"` (optional) auto focus, default __false__
- `data-options="Text 1|Value 1;Text 2|Value 2"` - for inline items
- `data-empty` - add an empty field as the first item (works only with `data-source` attribute)
- `data-source="path to the array"` - data-source of items
- `data-source-text="name"` (optional) property name for gettint the text, default __text__
- `data-source-value="id"` (optional) property name for getting the value, default __id__

__Methods__:
- `component.required(value)` - can enable/disable `required` with validation

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT