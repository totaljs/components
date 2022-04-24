## j-Xterm

The component renders a terminal output/input directly in the web browser. __IMPORTANT__: the example doesn't work as you expect, it needs a real terminal output.

__Configuration__:

- `cols {Number}` count of cols (default: `80`)
- `rows {Number}` count of rows (default: `24`)
- `send {String}` a link to the `function(data)` for the communication with the server

__Methods__:

- `instance.write(data)` writes data into the terminal component

__Used dependencies__:

- [Xterm.js](https://xtermjs.org/)
- [Full example](https://github.com/totaljs/examples/tree/master/remote-terminal)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)