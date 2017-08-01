# j-reCAPTCHA

- Works only with [jComponent](http://jcomponent.org)
- [Create reCAPTCHA API KEY](https://www.google.com/recaptcha/admin)
- [How to __verify reCAPTCHA response__ on the server-side?](https://blog.totaljs.com/blogs/tutorials/20161211-how-to-verify-recaptcha-with-help-of-total-js/)

__Attributes__:
- `data-jc-path="PATH.TO.PROPERTY"` (__required__) the component saves the response according to the path

__Configuration__:
- `key` {String} (required) Google API key
- `required` {Boolean} enables `required`
- `theme` {String} can be `light` or `dark` (default: `light`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT