# j-ClipboardImage

This component automaticaly captures images in Clipboard.

__Supported attributes__:

- `data-width="1280"` a maximum width of image (default: `1280`)
- `data-height="1024"` a maximum height of image (default: `1024`)
- `data-quality="90"` JPEG quality (default: `90`)

__How to capture data?__

```javascript
// Attach event
ON('clipboardimage', function(base64) {
    // We have to send data on the server in Base64 format
    AJAX('POST /upload/', { file: base64 }, function(response) {

    });
});
```