## j-ImageViewer

- singleton
- place the component under `<body` element

__Configuration__:

- `container {String}` a container for group of images (default: `.img-container`)
- `selector {String}` a image selector, (default: `.img-viewer`)
- `loading {Boolean}` enables loading between slides (default: `true`)
- `unknown {String}` a title for unnamed images (default: `Unknown image`)

__Good to know__:

- image is loaded from the `data-src=""` or from the `src=""` attributes
- names are obtained from the `title=""` or from the `alt=""` attributes

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)