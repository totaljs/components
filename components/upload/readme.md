---
name: upload
description: The component can perform uploading of files.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-01-27 20:57
updated: 2026-11-03 10:36
jcomponent: v19
---

# Upload

The component can perform __uploading of files__.

- easy and universal usage
- singleton

__Methods__:

```javascript
var opt = {};

// Restricts files according to the content-type
// opt.accept = 'image/*';

// Enables multiple files
// opt.multiple = true;

// IMPORTANT:
// URL address for uploading
opt.url = '/api/upload/';

// A callback
opt.callback = function(response) {

};

opt.error = function(err) {
	// Optional
	// Error handling
};

// Optional, additional request data
opt.data = {};
opt.data.fieldName1 = 'value';
opt.data.fieldName2 = 'value';

// Shows file browser
SETTER('upload/show', opt);
```

Files are uploaded with these names/keys in the form `file1`, `file2`, `file..N`.
