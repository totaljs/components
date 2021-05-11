## j-FileBrowser

The component will open a file browser and returns selected files.

- singleton
- easy usage

__Methods__:

- `component.open(opt)` - opens file browser
	- `opt.multiple {Boolean}` enables multiple files (default: `false`)
	- `opt.accept {String}` allows only specified content-type (default: `undefined`)
	- `opt.callback {Function(files, e)}` a callback

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)