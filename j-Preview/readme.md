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
- `icon {String}` (optional) the label icon without `fa`, (default: `null`)
- `background {String}` (optional) a background color (default: `white`)
- `schema {String}` prepared object for sending (default: `{file:base64,filename:filename}`, `base64` + `filename` is a value from preview)
- `quality {Number}` JPEG quality (default: `90`)
- `customize {Boolean}` resizes picture to the defined size (default: `true`)
- `preview {String}` prepares a value preview URL address (default: `null`)
	- example: `value => '/download/' + value + '.jpg'`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
