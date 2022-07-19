## j-ImageUploader

A simple singleton component for uploading of resized images. The component uploads base64 according to the `schema` defined in `options` of caller.

__Methods__:

- `imageuploader/upload(opt)` shows a file dialog
	- `opt.width {Number}`
	- `opt.height {Number}`
	- `opt.background {String}` a default background color
	- `opt.url {String}` __important__ URL where will be image uploaded
	- `opt.multiple {Boolean}` supports multiple files (default: `false`)
	- `opt.schema {String}` default `{ file: base64, name: filename }`
	- `opt.quality {Number}` default `90`
	- `opt.callback(response, errors)` a callback __important__
	- `opt.keeporiginal {Boolean}` keeps the original image if the dimension is the same as the width/height defined in the configuration (default: `false`)
	- __NEW__ `opt.files` {FileList} optional (if you use e.g Drag & Drop)

__Friendly components__:
This component works with `loading` when the file is uploading.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)