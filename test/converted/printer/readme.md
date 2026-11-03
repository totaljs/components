---
name: printer
description: The component can print a HTML content.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2023-03-30 22:28
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# Printer

The component can print a HTML content.

- singleton
- easy usage

__Configuration__:

- `delay {Number}` a delay for evaluating of printer (default: `500`)
- `delayprint {Number}` a delay for printing (default: `500`)
- `delayclose {Number}` a delay for closing window (default: `1000`)

__Methods__:

```js
// SETTER('printer/print', [title], html, test);

SETTER('printer/print', '<h1>Total.js Platform</h1>');

// Shows test window
SETTER('printer/print', '<h1>Total.js Platform</h1>', true);
````
