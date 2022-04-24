## j-Xterm

The component renders a terminal output/input directly in the web browser. __IMPORTANT__: the example doesn't work as you expect, it needs a real terminal output.

__Configuration__:

- `cols {Number}` count of cols (default: `80`)
- `rows {Number}` count of rows (default: `24`)
- `send {String}` a link to the `function(data)` for the communication with the server

__Methods__:

- `instance.write(data)` writes data into the terminal component

__Dependencies__:

- [Xterm.js](https://xtermjs.org/)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)