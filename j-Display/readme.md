## j-Display

- jComponent `v19|v20`

The component measures a display size according to the current element. It uses `WIDTH()` method and appends a CSS class in the form `jc-DISPLAY_SIZE`:

- `jc-xs` extra small display (mobile phone)
- `jc-sm` small display (tablet)
- `jc-md` medium display (laptop)
- `jc-lg` large display (desktop computer)

__Configuration__:

- `delay {Number}` a delay for obtaining of size (default: `100` ms)
- __NEW__: `xs {Number}` a maximum width for the extra small display (default: `768`)
- __NEW__: `sm {Number}` a maximum width for the small display (default: `992`)
- __NEW__: `md {Number}` a maximum width for the medium display (default: `1200`)

The component calculates the interval between displays automatically. The default display type is `lg`.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)