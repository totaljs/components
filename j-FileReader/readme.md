## j-FileReader

- singleton
- easy usage
- only for text files

__Methods__:
- `component.open(opt)` - opens file browser
	- `opt.multiple {Boolean}` enables multiple files (default: `false`)
	- `opt.accept {String}` allows only specified content-type (default: `undefined`)
	- `opt.callback {Function(file)}` a callback
- `component.process(files)` - internal, processing `files` object

```js
var opt = {};
opt.accept = 'text/*';
opt.callback = function(file) {
	console.log(file);
};
SETTER('filereader/open', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)