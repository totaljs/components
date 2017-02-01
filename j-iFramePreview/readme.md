## j-iFramePreview

- easy usage for e.g. invoices or some previews
- show the layer before the content
- can work with multiple `iframepreview` components (other components are hidden)
- listens on `esc` key on the keyboard

__Attributes:__
- `data-width="500px"` max width size (the component is responsive)
- `data-jc-path` must contain a valid URL address (when is empty then is the component hidden)

__Methods__:
- `component.open(url)` or `component.show(url)` (alias)
- `component.hide()`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT