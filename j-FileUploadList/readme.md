## j-FileUploadList

This component can upload files and the result adds into the model. Model must be the `array`.

__Configuration__:

- `url` {String} URL to upload (default: `/api/upload/`)
- `accept` {String} Optional, a content type for filtering files e.g. `image/*`
- `multiple` {Boolean} Optional, enables multiple files uploading (default: `true`)

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

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT