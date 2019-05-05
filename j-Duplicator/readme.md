## j-Duplicator

__BETA VERSION__. This component is a bit special component because it can duplicate same content several times with diffferent data-source. Imaging some text editor with tabs which each tab contains different content. For this case is targeted `j-Duplicator`. Follow example.

__Configuration__:

- `datasource` {Array} must contain array of content for duplicating
- `url` {String} optional, can contain a link to external `template` __without `JavaScript`__

__Good to know__:
This component appends `.scopename()` function to each item of Array for handling of scope and each content is wrapped in to the independent `scope` with direct reference to main source.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT