# j-ClipboardImage

This component automaticaly captures images in Clipboard.

- jComponent `v19|v20`

__Configuration__:

- `quality {Number}` JPEG quality, (default: `90`)
- `maxwidth {Number}` a maximum width (default: `1024`)
- `maxheight {Number}` a maximum height (default: `768`)
- `exec {String}` a link to execute method if the image is obtained
- `disabled {Boolean}` can disable this component
- `type {String}` output type, supports `png` or `jpg` (default)
- __NEW__ `output {String}` output type `base64` (default) or `file`

__How to capture data?__

```javascript
// Attach event
ON('clipboardimage', function(base64) {
	// We have to send data on the server in Base64 format
	AJAX('POST /upload/', { file: base64 }, function(response) {
	});
});
```