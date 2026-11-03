---
name: xterm
description: The component renders a terminal output/input directly in the web browser.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-04-24 22:22
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Xterm

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
