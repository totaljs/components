---
name: fileupload
description: Is very helpful component for uploading e.g.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-03-11 19:43
updated: 2026-11-03 10:36
jcomponent: v19
---

# FileUpload

Is very helpful component for uploading e.g. profile photos. I consider this component as inline file upload. Look into the html source. The component uploads files via `multipart/form-data`.

__Configuration__:

- `url {String}` a target URL for the uploading
- `accept {String}` (optional) can contain a content-type frow browsing files e.g. `image/*`
- `multiple` enables `multiple` files upload (default: `false`)
- `array {Boolean}` enables pushing an uploaded value to array (`path` must be the array)
- `label {String}` (optional) changes a current `innerHTML` (default: `innerHTML`)
- `disabled {Boolean}` disables

__Friendly components__:
This component works with `loading` (when the file is uploading) and `message` (when server throws an error) component.
