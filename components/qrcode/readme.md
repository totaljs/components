---
name: qrcode
description: Generates QR code images from a text with the bundled QRCode library, with configurable colors, size and delay.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2023-03-30 17:37
updated: 2026-11-03 11:31
jcomponent: v19,v20
---

# QRCode

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
SETTER('qrcode/create', opt);
````
