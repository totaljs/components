## j-MarkdownPreview

This component depends on `j-Markdown` component. It uses `highlight.js` library for syntax highlight.

- supports syntax highlighting
- supports YouTube, Vimeo and custom iframes
- supports barchart and linechart rendering via ApexCharts

__Configuration__:

- `showsecret` {String} a label for displaying of secret (default: `Show secret data`)
- `hidesecret` {String} a label to hide of secret (default: `Hide secret data`)

__Custom methods__:

- `component.readingtime()` returns approximate reading time in minutes
- `component.redraw(jquery_el)` applies syntax highlighting, iframes and charts for the `el` element

### Author

- Peter Širka <petersirka@gmail.com>

### License

- License: MIT
