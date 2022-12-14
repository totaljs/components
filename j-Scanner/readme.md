## j-Scanner

The component for scanning documents.

- singleton

__Methods__:

- `component.show(opt)`
	- `opt.points = [left+right {Number}, top+bottom {Number}]` mask size defined in the percentage
	- `opt.callback = function(base64)` The callback function, which will be executed when the user approves taken document. This callback function thakes an image in **base64** format as a parameter