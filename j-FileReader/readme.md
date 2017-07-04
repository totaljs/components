## j-FileReader

- easy usage
- only for text files

__Methods__:
- `component.open([accept], callback(file), [multiple])` - opens file browser
- `component.process(files)` - internal, processing `files` object

```javacript
SETTER('filereader', 'open', 'text/*', function(file) {

});
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT