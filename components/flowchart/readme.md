---
name: flowchart
description: Sankey diagram of flows between steps, such as where visitors come from and where they go, or how AI agents move through a site, with bands as wide as the flows, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:42
updated: 2026-11-22 20:44
jcomponent: v20
---

# Flowchart

A Sankey diagram: nodes in columns and bands between them as wide as the flow. It shows journeys (source → landing page → pricing → purchase or exit), how AI agents read a site (agent → llms.txt, MCP or HTML → answer), budgets, energy... The columns come from the links, the nodes are sorted so the bands cross as little as possible, and it re-renders on every change of the model.

The model is an `Object` with the links, and optionally the nodes:

```js
{
	nodes: [{ id: 'gpt', name: 'ChatGPT', color: '#10A37F' }],   // optional: names and colours
	links: [{ source: 'gpt', target: 'mcp', value: 600 }, { source: 'Search', target: 'Home', value: 9200 }]
}
```

- Without `nodes`, the ids of the links are the names. Links without a positive value, and links from a node to itself, are skipped.
- A node goes one column after the deepest node that sends to it; nodes without outputs go to the last column, so the ends line up. A link back that makes a loop does not break the layout.
- The value of a node is the bigger of what comes in and what goes out.
- The nodes take the colours of a colour-blind safe palette in a fixed order (the first is the primary colour of the app); a band has the colour of its source. The labels have a halo, so they stay readable over the bands.
- Hovering a node highlights its flows and lists its main outputs with their shares; hovering a band shows "source → target", the value and its share of the source.
- The chart has one tab stop: the arrows go through the nodes column by column and a screen reader announces each node with what comes in and what goes out; `Enter`/`Space` run `click`. A hidden table has every flow.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of the diagram in pixels (default: `320`)
- `nodewidth {Number}` the width of the nodes in pixels (default: `12`)
- `gap {Number}` the space between the nodes of a column in pixels (default: `12`)
- `format {String}` `number` or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `16.6K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(node, component)`, executed when the user clicks a node or presses `Enter`/`Space` on it; `node` is `{ id, name, value, inputs, outputs, item }`

__Runtime__: jComponent v20, no dependencies.
