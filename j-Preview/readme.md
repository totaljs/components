## j-Preview

This component resizes the picture automatically according to the settings and uploads it to the server in `base64` format.

- response from server needs to contain URL address to the picture
- easy usage
- works with Bootstrap Grid System
- drag and drop support
- supports EXIF orientation

__Configuration__:

- `url` {String} (__IMPORTANT__) upload URL (required)
- `width` {Number} a picture width (required)
- `height` {Number} a picture height (required)
- `icon` {String} (optional) the label icon without `fa`, (default: `null`)
- `background` {String} (optional) a background color (default: `white`)
- `schema` {String} prepared object for sending (default: `{file:base64,filename:filename}`, `base64` + `filename` is a value from preview)
- `quality` {Number} JPEG quality (default: `90`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT
