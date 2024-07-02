## j-Preview

This component resizes the picture automatically according to the settings and uploads it to the server in `base64` format.

- response from server needs to contain URL address to the picture
- easy usage
- works with Bootstrap Grid System
- drag and drop support
- supports EXIF orientation

__Path__:

The value/response (from the upload) will be used as a URL address for preview.

__Configuration__:

- `url {String}` (__IMPORTANT__) upload URL, can contain a method too (required)
- `width {Number}` a picture width (required)
- `height {Number}` a picture height (required)
- `percentage {Number}` resizes a picture according to the percentage (then `width` and `height` aren't required)
- `icon {String}` (optional) the label icon without `ti`, (default: `null`)
- `background {String}` (optional) a background color, it can be `transparent` (default: `white`)
- `schema {String}` prepared object for sending (default: `{file:base64,filename:filename}`, `base64` + `filename` is a value from preview)
- `quality {Number}` JPEG quality (default: `90`)
- `customize {Boolean}` resizes picture to the defined size (default: `true`)
- `preview {String}` prepares a value preview URL address (default: `null`)
	- example: `value => '/download/' + value + '.jpg'`
- `map {String}` prepares response value to a value (default: `null`)
	- example: `value => value.id`
- `empty {String}` a link to the empty image
- `keeporiginal {Boolean}` keeps the original image if the dimension is the same as the width/height defined in the configuration (default: `false`)
- __NEW__ `output {String}` output type `base64` (default) or `file`
- __NEW__ `convert {String}` an image type `jpg` (default) or `png`

__Methods__:

- `component.reupload()` it reuploads a current image value as a base64.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
