## j-QRCode

This component creates a QR code. It includes the [QRCode library](https://davidshimjs.github.io/qrcodejs/).

__Configuration__:

- `width {Number}` a default image width (default: `128`)
- `height {Number}` a default image height (default: `128`)
- `fg {String}` a foreground color (default: `#000000`)
- `bg {String}` a background color (default: `#FFFFFF`)
- `delay {Number}` a small delay for code generating (default: `200`)

__How to generate QR Code?__

```js
var opt = {};
opt.text = 'https://www.totaljs.com';
// opt.width {Number}
// opt.height {Number}
// opt.fg {String}
// opt.bg {String}
opt.callback = function(base64) {
	console.log(base64);
};
SETTER('qrcode/save', opt);
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)