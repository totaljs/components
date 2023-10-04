## j-FileReader

- singleton
- easy usage
- only for text files

__Methods__:
- `component.open(opt)` - opens file browser
	- `opt.multiple {Boolean}` enables multiple files (default: `false`)
	- `opt.accept {String}` allows only specified content-type (default: `undefined`)
	- `opt.base64 {Boolean}` reads a file in Base64 encoding (default: `false`)
	- __NEW__: `opt.files {HTTP Files}` reads files e.g. from Drag & Drop
	- `opt.callback {Function(file)}` a callback

```js
var opt = {};
opt.accept = 'text/*';
// opt.files = e.files;
opt.callback = function(file) {
	console.log(file);
};
SETTER('filereader/open', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)