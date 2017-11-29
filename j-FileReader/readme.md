## j-FileReader

- easy usage
- only for text files

__Methods__:
- `component.open([accept], callback(file), [multiple])` - opens file browsing
- `component.process(files)` - internal, processing `files` object

```javascript
SETTER('filereader', 'open', 'text/*', function(file) {

});
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT