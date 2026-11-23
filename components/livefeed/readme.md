---
name: livefeed
description: Live list of events, such as visits or AI agents arriving, with the newest first, relative times in the language of the page, a pause button and optional announcements for screen readers
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:39
updated: 2026-11-22 20:39
jcomponent: v20
---

# Livefeed

The list of what is happening now: visits arriving, AI agents reading pages, orders, errors. The newest item is on top and slides in; the times are relative ("now", "7 sec. ago", "3 min. ago") and are updated every 10 seconds. The pause button stops the list so it can be read, counts the new items while paused, and shows them on resume (moving content that can be paused, as WCAG asks).

The model is an `Array` of items, the newest first:

```js
[{ id: 15, time: new Date(), text: '/pricing', sub: 'Spain · Google', icon: 'ti ti-eye', tag: 'New' }]
```

- `id` keeps the identity of an item between updates (without it the time and the text are used), so only the really new items slide in.
- `time` is a `Date`, a timestamp or an ISO string; `icon` is a Total.js icon and `image` a URL of a small image (a favicon, a flag) instead of it; `sub` is a second line and `tag` a small label.
- Only the first `limit` items are shown; with `height` the list scrolls.
- The list has the role `log`. With `announce:true` a screen reader reads the new items; it is off by default, because a busy feed would talk all the time.
- With `click` every item is a button, and the focus stays on the same item when the list changes.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `limit {Number}` the maximum count of items (default: `20`)
- `height {Number}` the maximum height of the list in pixels, `0` is no limit (default: `0`)
- `pause {String}` the text of the pause button, example: `Pause`; empty hides the button (default: `''`)
- `resume {String}` the text of the button while paused, example: `Resume` (default: `''`)
- `announce {Boolean}` screen readers read the new items (default: `false`)
- `locale {String}` a language for the relative times, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(item, component)`, executed when the user clicks an item; `item` is the item of the model

__Runtime__: jComponent v20, no dependencies.
