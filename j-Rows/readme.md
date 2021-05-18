## j-Rows

The component `Rows` is a very simple alternative to `j-Layout` and `j-Layout2`.

__Configuration__:

- `parent` {String} can contain `parent`, `window` or jQuery selector for the `closest` method (default: `window`)
- `margin` {Number} add margin to `height` (default: `0`)
- `marginlg` {Number} adds margin to `height` for `LG` display (default: `margin`)
- `marginmd` {Number} adds margin to `height` for `MD` display (default: `margin`)
- `marginsm` {Number} adds margin to `height` for `SM` display (default: `margin`)
- `marginxs` {Number} adds margin to `height` for `XS` display (default: `margin`)
- `noborder` {Boolean} disables border (default: `false`)
- `fontsize` {Boolean} enables percentual font-size according to the size of rows

__Good to know__:

Each row must be wrappend in `<section>`, try to understand from example.

__Attributes__:

- `data-size` contains a size of section `LG,MD,SM,XS` --> in pixels or percentage, example: `200,200,200,0` (`0` means hidden)
- section without `data-size` attribute will be counted from the residual value

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)