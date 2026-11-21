---
name: emojipicker
description: Singleton emoji picker next to an element or a point, with categories, the recent ones and search by words
author: Gera
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-21 08:06
updated: 2026-11-21 08:06
jcomponent: v20
---

# EmojiPicker

A small panel to choose an emoji. It opens next to an element (or a point of the window) with the categories in tabs, the recent ones of the browser first, and a search by English words (`heart`, `rocket`, `ok`...).

- Unicode emoji, no images. The callback gets the emoji as a string (`😀`).
- The recent ones are kept in the `localStorage` of the browser; without storage the picker works the same, without that tab.
- Keyboard: type to search, `Enter` takes the first one, arrows move through the grid, `Escape` closes. The focus goes back where it was.
- It closes with a click outside, `Escape` or a resize of the window.

__Configuration__:

- `search {String}` placeholder and accessible name of the search field (default: `Find an emoji`)
- `empty {String}` text when no emoji matches the search (default: `No emoji has this word.`)
- `categories {String}` names of the tabs separated by commas: the recent ones, then the 9 categories (default: `Recent,Smileys,People,Nature,Food,Activities,Travel,Objects,Symbols,Flags`)
- `history {Number}` how many recent emoji are kept (default: `27`)

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

opt.element = YOUR_ELEMENT;

opt.callback = function(emoji) {
	console.log(emoji); // "🚀"
};

SETTER('emojipicker/show', opt);
```

__Methods__:

- `SETTER('emojipicker/show', opt)` opens the picker
- `SETTER('emojipicker/hide')` closes it

__Good to know__:

- Singleton: one `<ui-component name="emojipicker"></ui-component>` on the page serves every opener.
- The line under the selected tab and the pointer use the colour of the library (`--color`).
- The component supports dark mode (`.ui-dark`).
- jComponent v20.
