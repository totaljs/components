## j-Importer

__j-Import__ is a great component for importing HTML templates, scripts or styles according to the path and condition. The component can help with SPA applications because you can easily import templates, scripts or styles dynamically.

__Attributes__:
- `data-if` must contain a condition in the form `value === 'myvalue'` (the condition is evaluated with value from `data-component-path`)
- `data-url` is a URL for importing
- `data-reload` can contains only path method which is executed when `data-if` is valid

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT