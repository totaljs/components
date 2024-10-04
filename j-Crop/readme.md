## j-Crop

- jComponent `v19|v20`

__Supports__:

- zoom
- drag and drop
- local files
- responsive
- automatically rotates image according to the EXIF information

__Configuration__:

- `width {Number}` target width, required
- `height {Number}` target height, required
- `dragdrop {Boolean}` enables drag&drop (default: `true`)
- `background {String}` a background color (default: transparent)
- `format {String}` a format for URL file generator (default: `{0}`)

__Attributes__
- `path="path-with-url-to-image"` - must contain URL to picture

__Methods__:

```js
// e.g.
var component = FIND('croper');

// Resize canvas
component.reconfigure('width:500;height:200');

// Get cropped image
// component.output([type], [return_object])
var png = component.output('image/png');
var jpg = component.output('image/jpeg');

// Below method automatically detects the transparency and sets the output
var data = component.output();

// var data = component.output(true);
// data.filename {String}
// data.data {String} base64

// New method for clearing of canvas
component.clear();
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)