## j-ContentEditable

- easy usage
- supports great features
- works with Bootstrap Grid System
- easy for customization
- supports basic shortcuts `CMD+B` __bold__, `CMD+U` __underline__, `CMD+I` __italic__ and `CMD+L` __creates a link__

__Attributes__:
- `data-jc-path=""` for two way bindings (write binding is a bit slow around `500 ms` because of performance)
- `data-required="true"` optional, default `false`
- `data-clipboard="text/plain"` optional, default `text/plain` (for support of `html` use `text/html`)

__Methods__:
- `component.getNode()` returns a select `node` in text `{Object}`
- `component.getSelection()` returns a current selection `{String}`
- `component.insert(value, [encode])` inserts a custom HTML or PLAIN text to the current cursor position, `encode` (optional) is by default `false`
- `component.exec('Bold', false, null)` has same functionality as `document.execCommand()`

__Handlers__:

`component.event(type, value)` handles all events from the editor.

```html
type = bold          - when a text is bolded (value is boolean)
type = italic        - when a text is italic (value is boolean)
type = underline     - when a text is underlined (value is boolean)
type = link          - when a link is created (value is a temporary URL)
type = current       - when a current element is changed in the text (value is NODE)
type = paste         - when the clipboard is used (value is a clipboard value)
type = select        - when a text is selected (value is selected text)
type = focus         - editor is focused (value is undefined)
type = blur          - editor is not focused (value is undefined)
type = click         - click on the specific element in the text (value is NODE)
```

__Default declaration__:

```javascript
self.event = function(type, value) {
    if (type === 'paste')
        self.insert(value, true);
};
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT