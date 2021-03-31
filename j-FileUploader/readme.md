## j-FileUploader

A simple singleton component for uploading of files.

__Methods__:

- `fileuploader/upload(opt)` shows a file dialog
	- `opt.url` {String} __important__ URL where will be image uploaded
	- `opt.callback(response, errors)` {Function} a callback __important__
	- `opt.multiple` {Boolean} supports multiple files (default: `false`)
	- `opt.progress(percentage)` {Function}
	- `opt.multiple` {Boolean} enables multiple file uploading (default: `false`)
	- `opt.accept` {String} accept type (default: `*/*`)
	- `opt.prefix` {String} a name prefix `<input name="file{0}"` (default: `file{0}`)
	- __NEW__ `opt.files` {FileList} optional (if you use e.g Drag & Drop)
	- __NEW__ `opt.data` {Object} optional, additional custom data `key_string:value_string`

__Friendly components__:
This component works with `loading` when the file is uploading.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)