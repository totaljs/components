## j-PictureUploadExpert

- advanced usage
- drag and drop support
- supports `multiple`
- supports EXIF orientation
- multiple images are send one by one
- supports j-Loading

__Configuration__:

- `url {String}` (__IMPORTANT__) upload URL (required)
- `width {Number}` a picture width (required)
- `height {Number}` a picture height (required)
- `background {String}` (optional) a background color (default: white)
- `schema {String}` prepared object for sending (default: `{file:base64,filename:filename}`, `base64` + `filename` is a value from preview)
- `quality {Number}` JPEG quality (default: `90`)
- `customize {Boolean}` resizes picture to the entire defined size (default: `true`)
- `disabled {Boolean}` disables image upload (default: `false`)
- `clickselector {String}` a class for custom click selector (default: `none`)
- `dropselector {String}` a class for custom drop selector (default: `none`)
- `class {String}` toggles class on `dropselector` if the drag over is emitted  (default: `over`)
- `error {String}` a path to method `method(err)` when an error is thrown

### Author

- Denis Granec <denis@totalavengers.com>
- [License](https://www.totaljs.com/license/)
