## j-FileUpload

Is very helpful component for uploading e.g. profile photos. I consider this component as inline file upload. Look into the html source. The component uploads files via `multipart/form-data`.

__Configuration__:

- `url` {String} a target URL for the uploading
- `accept` {String} (optional) can contain a content-type frow browsing files e.g. `image/*`
- `multiple` enables `multiple` files upload (default: `false`)
- `array` {Boolean} enables pushing an uploaded value to array (`data-jc-path` must be the array)
- `label` {String} (optional) changes a current `innerHTML` (default: `innerHTML`)
- `disabled` {Boolean} disables

__Friendly components__:
This component works with `loading` (when the file is uploading) and `message` (when server throws an error) component.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT