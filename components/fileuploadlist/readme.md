---
name: FileUploadList
description: This component can upload files and the result adds into the model.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2018-02-02 10:24
updated: 2023-04-25 18:34
jcomponent: v19
---

# FileUploadList

This component can upload files and the result adds into the model. Model must be the `array`.

__Configuration__:

- `url {String}` URL to upload (default: `/api/upload/`)
- `accept {String}` Optional, a content type for filtering files e.g. `image/*`
- `multiple {Boolean}` Optional, enables multiple files uploading (default: `true`)
- `progress {String}` a path to `function(percentage)`
- `text {String}` a key name for rendering of `text` value (default: `name`)

__Model__:

Server must return `Array` in the form below:

```javascript
[
	{
		name: String,
		length: Number,
		url: String
	}
]
```
