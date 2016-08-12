## j-Tagger

Tagger can help with rendering data without replacing tags. All values without `data-format` are HTML encoded.

__Tagger content attributes__:

- `data-name` is a property
- `data-type` converts a rendered value to specific type (currently supports `date` and `number`)
- `data-format` formats value and must contain __arrow function__
- `data-visible` toggles `hidden` class for the current element and must contain __arrow function__ (doens't change content of the element)
- `data-before` appends a content before the rendered value
- `data-after` appends a content after the rendered value

jComponent transforms all __arrow functions__ to classic functions (don't worry about the compatibility).

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT