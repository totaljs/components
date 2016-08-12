## j-FileUpload

Is very helpful component for uploading e.g. profile photos. I consider this component as inline file upload. Look into the html source. The component uploads files via `multipart/form-data`.

__Attributes__:
- `data-url` is a target URL for the upload
- `data-accept` is a content type and can be e.g. `image/*`, `text/plain`, etc.
- `data-multiple` enables multiple files (default: `false`)
- `data-array` pushs a uploaded value to array (`data-component-path` must be array)
- `data-error` message when is thrown an error

__Friendly components__:
This component works with `loading` (when the upload start) and `message` (when is an error) component.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT