## j-AutoSelect

- jComponent `v19|v20`
- singleton

The component automatically adds `.selected` class according to the selector `class="autoselect"` within the entire HTML document. This component is a perfect solution for server-side rendering and subsequent highlighting.

__Configuration__:

- `selector {String}` is a jQuery selector (default: `.autoselect a`)
- `class {String}` is a class name for selected element (default: `selected`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)