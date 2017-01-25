## j-Exec

The component has a similar functionality like `j-Click` but it can handle multiple clicks / elements.

__Attributes__:
- `data-selector` is selector for capturing `click`, default `.exec`

__Elements__:

1. Elements can contain `data-exec` attribut with a method name which will be execute when the user click on the element.

2. Elements can contain these attributes `data-path="some.path` and `data-value="'STRING'"` or `data-value="340"` (number) or `data-value="{}"` (object). Clicking on the element sets `data-value` to `data-path`.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT