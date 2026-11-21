---
name: emojipicker
description: Singleton emoji picker like the ones of chat apps, with every Unicode emoji in categories, recent ones, skin tones and search in several languages
author: Gera
version: 2
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-21 08:06
updated: 2026-11-21 08:34
jcomponent: v20
---

# EmojiPicker

A panel to choose an emoji, like the one of a chat app. It opens next to an element (or a point of the window) with every emoji of Unicode up to Emoji 15.1 (about 1 900) in the categories of chat apps, in one scroll: the recent ones of the browser, smileys and people, animals and nature, food and drink, activities, travel and places, objects, symbols and flags. The tabs jump to each category and follow the scroll.

- **Search** by the name and the words of each emoji, in English and in the language of `language` (`corazón`, `cohete`, `fiesta`...).
- **Skin tones**: an emoji with skin tones has a small mark; press and hold it (or open its context menu) to choose one of its six forms. The hand of the footer sets the skin tone of every emoji. The tone and the recent ones are kept in the `localStorage` of the browser; without storage the picker works the same.
- The callback gets the emoji as a string (`🚀`, `👍🏽`).
- Keyboard: type to search, `Enter` takes the first emoji, arrows move through the emoji, `Escape` closes (first the skin tones). The focus goes back where it was.
- It closes with a click outside, `Escape` or a resize of the window.

__Data__:

The emoji come from `j-emojipicker.json` and the words of each language from `j-emojipicker-<language>.json` (`es`, `fr`, `it`, `de`, `sk`). They are in the folder of the component and are published with it on the CDN of the components (`DEF.cdn`). They are made from the official data of Unicode: the order, the categories and the skin tones of `emoji-test.txt`, and the names and words of CLDR (Unicode terms of use). The data is read the first time the picker opens.

__Configuration__:

- `search {String}` placeholder and accessible name of the search field (default: `Find an emoji`)
- `empty {String}` text when no emoji matches the search (default: `No emoji found.`)
- `categories {String}` names of the categories separated by commas: the recent ones, then the 8 categories (default: `Recent,Smileys and people,Animals and nature,Food and drink,Activities,Travel and places,Objects,Symbols,Flags`)
- `tone {String}` title of the skin tone button (default: `Skin tone`)
- `history {Number}` how many recent emoji are kept (default: `32`)
- `list {String}` URL of the data (default: `j-emojipicker.json` of `DEF.cdn`)
- `language {String}` code of the language of the search and the names, e.g. `es`, `fr`, `it`, `de`, `sk`; it reads `j-emojipicker-<language>.json` next to the data (default: English only)

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
- The tab of the current category, the pointer and the skin tones use the colour of the library (`--color`).
- The component supports dark mode (`.ui-dark`).
- jComponent v20.
