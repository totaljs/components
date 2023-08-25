## j-FileUploader

A simple component for uploading files. It supports auto-resizing images.

__Configuration__:

- `url {String}` a default URL address for uploading

__Methods__:

- `fileuploader/upload(opt)` shows a file dialog
	- `opt.url {String}` __important__ URL where will be image uploaded
	- `opt.callback(response, errors) {Function}` a callback __important__
	- `opt.multiple {Boolean}` supports multiple files (default: `false`)
	- `opt.progress(percentage)` {Function}
	- `opt.accept {String}` accept type (default: `*/*`)
	- `opt.prefix {String}` a name prefix `<input name="file{0}"` (default: `file{0}`)
	- `opt.files {FileList}` optional (if you use e.g Drag & Drop)
	- `opt.data {Object}` optional, additional custom data `key_string:value_string`
	- `opt.width {Number}` optional, image width
	- `opt.height {Number}` optional, image height
	- `opt.background {String}` optional, background color defined in HEX or can be `transparent`
	- `opt.keeporiginal {Boolean}` optional, prevents for double resizing (default: `false`)
	- `opt.onlylarger {Boolean}` optional, resizes images only larger than `opt.width` or `opt.height`
	- __NEW__: `opt.base64 {String}` optional, it can contain a valid data URL format (depends on the `opt.filename`)
	- __NEW__: `opt.filename {String}` optional, required with `opt.base64` field

__Friendly components__:
This component works with `loading` when the file is uploading.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)