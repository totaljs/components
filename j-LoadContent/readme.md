## j-LoadContent

The component loads a content from the template `<script type="text/html">` and appends it into the element. It's a great solution for reusable content. Learn from example.

- jComponent `v19|v20`

__Configuration__:

- `selector {String}` a jQuery selector (it will use it for entire DOM)
- `wait {Number}` repeats finding of template in entered milliseconds (default: `0`)
- `replace {String}` replaces entered pharses in the form: `find1=replace1,find2=replace2` (default: empty)
- `exec {String}` a link to the `function(element)`, it's executed after the template is loaded

__Good to know__:

- all `SCR` pharses will be replaced to the `script` phrase

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)