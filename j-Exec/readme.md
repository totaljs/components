## j-Exec

The component has a similar functionality like `j-Click` but it can handle multiple clicks / elements. __RECOMMENDATION__: add this component into the `<body>` element.

__Configuration__:
- `selector` is a selector for capturing `click` (default: `.exec`)

__Elements__:

1. Elements can contain `data-exec` attribut with a method name which will be execute when the user click on the element.
2. Elements can contain these attributes `data-path="some.path` and `data-value="'STRING'"` or `data-value="340"` (number) or `data-value="{}"` (object). Clicking on the element sets `data-value` to `data-path`.
3. Elements can contain `data-href` attribute and the component performs `REDIRECT()`.

__Attributes__:

- `data-exec="METHOD_NAME"` executes a method when user clicks
- `data-prevent="true"` prevents continuing `click` event
- `data-href="URL"` performs `REDIRECT()`
- `data-path="path.to.property"` a path for setting of value
- `data-value=""` sets a value according to the `data-path=""` attribute
- __NEW__: `data-def="path.*"` performs default values
- __NEW__: `data-reset="path.*"` performs a state reseting

__Hints__:

- toggles boolean `data-value="!value"`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT