---
name: Message
description: Singleton message box that shows warning, success and other messages through SETTER calls, with a configurable button
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-02-22 08:56
updated: 2024-01-30 12:46
jcomponent: v19,v20
---

# Message

- singleton
- easy usage

__Configuration__:

- `button {String}` a button label (default: `OK`)
- `style {Number}` can change a style (default: `1`), style `2` is similiar to `j-Approve` component
- `closeoutside {Boolean}` enables closing of message box by clicking outside of main button

__Usage__:

```js
SETTER('message/warning', 'Some warning');
SETTER('message/success', 'Some success message');
SETTER('message/info', 'Some info message');
```

__Works with ASETTER__:

- errors are handled automatically

```js
// Without callback
AJAX('POST /api/profile/', userprofile, ASETTER('message/response', 'Profile has been saved successfully'));

// Or with a callback
AJAX('POST /api/profile/', userprofile, ASETTER('message/response', 'Profile has been saved successfully', function(response) {
	console.log(response);
}));

// Or with a callback and without message
AJAX('POST /api/profile/', userprofile, ASETTER('message/response', function(response) {
	console.log(response);
}));

// With auto-binding
AJAX('POST /api/profile/', userprofile, ASETTER('message/response', '?.response'));
AJAX('POST /api/profile/', userprofile, ASETTER('message/response', 'Your message', '?.response'));
````
