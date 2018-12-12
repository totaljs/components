## j-SingleUpload

__Configuration__:

- `url` {String} a target URL for the uploading (default: `/api/upload/`)
- `accept` {String} (optional) can contain a content-type frow browsing files e.g. `image/*`
- `label` {String} (optional) changes a current `innerHTML` (default: `innerHTML`)
- `title` {String} Tangular template for rendering a title of attachment (default: `{{ name }}`)
- `disabled` {Boolean} disables the component
- `remap` {String} (optional) a remap function (default: `null`), example: `value.length ? value[0] : null`

__Friendly components__:
This component works with `loading` (when the file is uploading) and `message` (when server throws an error) component.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT