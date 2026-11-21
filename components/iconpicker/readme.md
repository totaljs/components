---
name: iconpicker
description: Singleton picker of Total.js Icons next to an element or a point, with search, the other names of each icon and keyboard
author: Gera
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-21 08:06
updated: 2026-11-21 08:06
jcomponent: v20
---

# IconPicker

A small panel to choose one of the Total.js Icons. It opens next to an element (or a point of the window), finds icons by their name and by the other names the stylesheet gives them (`trash` finds `remove`, `settings` finds `cog`), marks the current icon and returns the classes of the chosen one (`ti ti-home`).

- The list of icons is the one of the CDN of the icons (`icons-db.html`), read once. The other names come from the stylesheet of the library: names whose rule shows the same glyph as a name of the list.
- Keyboard: type to filter, `Enter` takes the first icon, arrows move through the grid, `Escape` closes. The focus goes back where it was.
- It closes with a click outside, `Escape` or a resize of the window.

__Configuration__:

- `search {String}` placeholder and accessible name of the search field (default: `Find an icon`)
- `empty {String}` text when no icon matches the search (default: `No icon has this name.`)
- `none {String}` label of the "no icon" choice, see `opt.empty` (default: `None`)
- `list {String}` URL of a custom list of icons, names separated by commas (default: `icons-db.html` of `DEF.cdn`)
- `css {String}` URL of the stylesheet with the other names (default: the `spa.min` stylesheet of the page)

## Usage

```javascript
var opt = {};

// opt.element {Element}   : the panel opens under it (above it when there is no room); a second show for the same element closes it
// or a point of the window:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position
// opt.height {Number}     : height of the place at the point, e.g. a line of text, to open above it when there is no room below
// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.value {String}      : the current icon (`ti ti-home`, `ti-home`, `home` or another name like `trash`)
// opt.empty {Boolean}     : adds a choice without icon, the callback gets an empty string (default: false)

opt.element = YOUR_ELEMENT;

opt.callback = function(icon) {
	console.log(icon); // "ti ti-home"
};

SETTER('iconpicker/show', opt);
```

__Methods__:

- `SETTER('iconpicker/show', opt)` opens the picker
- `SETTER('iconpicker/hide')` closes it
- `SETTER('iconpicker/icons', function(list, aliases) {})` reads the list of icons (`['home', ...]`) and the other names (`{ trash: 'remove' }`), loaded once, for example to show the icons of a text

__Good to know__:

- Singleton: one `<ui-component name="iconpicker"></ui-component>` on the page serves every opener.
- The colour of the selected icon and of the pointer is the colour of the library (`--color`).
- The component supports dark mode (`.ui-dark`).
- jComponent v20.
