## j-Crop

__Supports__:

- zoom
- drag and drop
- local files
- responsive
- __NEW__: automatically rotates image according to the EXIF information

__Configuration__:

- `width` {Number} target width, required
- `height` {Number} target height, required
- `dragdrop` {Boolean} enables drag&drop (default: `true`)
- `background` {String} a background color (default: transparent)
- `format` {String} a format for URL file generator (default: `{0}`)

__Attributes__
- `data-jc-path="url-to-image"` - must contain URL to picture

__Methods__:

```javascript
// e.g.
var component = FIND('croper');

// Resize canvas
component.reconfigure('width:500;height:200');

// Get cropped image
var png = component.output('image/png');
var jpg = component.output('image/jpeg');

// Below method automatically detects the transparency and sets the output
var data = component.output();

// Is the image cropped?
console.log('Is changed?', component.dirty());
console.log('Is changed?', CHANGE(component.path);
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT