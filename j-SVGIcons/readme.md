## j-SVGIcons

This component registers a new Web component in the form `<ui-svgicon name="icon_name"></ui-svgicon>`.

- jComponent `v19|v20`
- Use SVG sprites generator <https://svgsprit.es/>

__Configuration__:

- `url {String}` a URL address to the SVG file (default: `empty`)
- `size {Number}` a default image width (default: `empty`)

__Attributes `<ui-svgicon>`:__

- `name {String}` optional, icon name
- `size {Number}` optional, a size of image (default: `config.size`)
- `selected {String}` optional, selected icon name (it will be displayed if the parent element will contain `.selected` class)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)