---
name: WorldMap
description: World map coloured by a value per country, such as visitors or sales, with a tooltip, a scale, country names in the language of the page, keyboard access and real time updates
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 19:57
updated: 2026-11-23 13:07
jcomponent: v20
---

# WorldMap

A world map where every country is coloured by its value: visitors, AI agent visits, sales... The colour is one hue from light (little) to dark (a lot), split into a few steps, with a scale under the map. It re-paints on every change of the model, so it works in real time.

The model is an `Object` with ISO 3166-1 alpha-2 codes, or an `Array`:

```js
{ US: 18420, ES: 9650, MX: 6120 }
// or
[{ code: 'US', value: 18420 }, { code: 'ES', value: 9650 }]
```

- Codes are not case sensitive; values that are empty, negative or not numbers are skipped. In the array form, repeated codes are summed.
- Country names come from `Intl.DisplayNames` in the language of the page (`<html lang>`) or the `locale` option, so the map needs no translations.
- `scale:log` (default) spreads the steps for data where a few countries have most of the visits; `scale:linear` splits the range evenly.
- Very small countries (Andorra, Malta, Singapore, Vatican...) get a dot when they have data, otherwise they would not be seen.
- Hovering a country shows its name, value and share of the total. The map is focusable: the arrow keys, `Home` and `End` go through the countries with data from the biggest value, a screen reader announces each one, and `Escape` hides it. A hidden table with all the countries is there for screen readers.
- The label of the map is the content of the tag, so it can contain markup and `@(...)` translations: `<ui-component name="worldmap" path="geo.visitors">@(Visitors by country)</ui-component>`.

__Data__:

The outlines of the countries come from `j-worldmap.json`. It is in the folder of the component and is published with it on the CDN of the components (`DEF.cdn`); it is read once, when the map is created. It is made from Natural Earth 1:50m Admin 0 countries (public domain), in the Equal Earth projection, simplified and without Antarctica (about 84 KB, 32 KB gzipped). Each country is `[code, path, x, y, size]`: the ISO code, the SVG path (coordinates multiplied by `scale`), the centre of its biggest part and its size. Somaliland, Northern Cyprus and Siachen Glacier have no code, so they are drawn without data.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `color {String}` a hex colour of the scale instead of the primary colour of the app, example: `#6250D6` (default: `''`)
- `steps {Number}` the count of colour steps, from `2` to `5` (default: `5`)
- `scale {String}` `log` or `linear` (default: `log`)
- `legend {Boolean}` shows the scale with the minimum and the maximum under the map (default: `true`)
- `format {String}` `number` or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `18.4K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers and the country names, example: `es-ES`; empty is the language of the page (default: `''`)
- `list {String}` URL of the outlines (default: `j-worldmap.json` of `DEF.cdn`)

__Callbacks__:

- `click {String}` link to a global `function(country, component)`, executed when the user clicks a country with data or presses `Enter`/`Space` on it; `country` is `{ code, name, value, share }` where `share` is in percent

__Runtime__: jComponent v20, no dependencies.
