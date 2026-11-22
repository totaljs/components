---
name: treemap
description: Treemap of a hierarchy, such as visits by section and page or revenue by country, with squarified tiles, two levels at once, zoom into groups with a breadcrumb, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:36
updated: 2026-11-22 20:44
jcomponent: v20
---

# Treemap

Shows parts of a whole that have parts too: visits by section and by page, revenue by country and city, disk use by folder. Every tile has an area proportional to its value (squarified layout, so the tiles stay close to squares) and a group shows its children inside, as shades of its colour. Clicking a group zooms into it; the breadcrumb goes back. It re-renders on every change of the model and keeps the zoom when the groups still exist.

The model is a tree, or an `Array` of nodes for one level:

```js
{
	name: 'totaljs.com',
	children: [
		{ name: 'Home', value: 12840 },
		{ name: 'Blog', children: [{ name: '/blog/total-js-5', value: 6420 }, { name: '/blog/agentic-web', value: 2210 }] }
	]
}
```

- The value of a group is the sum of its children; nodes without a positive value are skipped.
- The groups of a level take the colours of a colour-blind safe palette in a fixed order (the first is the primary colour of the app); the text of every tile is white or near-black, whichever has more contrast, also after switching the theme.
- Small tiles hide the value, tiny tiles hide the name too; the tooltip and the hidden table always have them.
- Keyboard: the arrows go through the tiles of the current level from the biggest one, `Enter`/`Space` zooms into a group or runs `click` for a leaf, `Escape`/`Backspace` goes one level up. A screen reader announces every tile, and a hidden table has the whole tree of the current level with the shares.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of the map in pixels (default: `300`)
- `depth {Number}` `2` shows the children inside the groups, `1` only one level (default: `2`)
- `format {String}` `number` or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.8K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(node, component)`, executed when the user clicks a tile without children (or presses `Enter`/`Space` on it); `node` is `{ name, value, path, item }` where `path` is the array of names from the root and `item` the node of the model

__Runtime__: jComponent v20, no dependencies.
