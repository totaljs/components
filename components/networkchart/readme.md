---
name: NetworkChart
description: Network graph of nodes and links as a force layout, a circle or rings around a centre, with groups, sizes, weights, zoom, dragging, a tooltip and keyboard access, for up to 500 nodes
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 21:16
updated: 2026-11-23 13:07
jcomponent: v20
---

# NetworkChart

Shows how things are connected: the internal links of a site (and its orphan pages), the AI agents and the pages they read, referrers and topics, people and teams. Nodes are circles sized by their value and coloured by their group; links are lines as thick as their weight. Hovering a node highlights its neighbours and fades the rest.

Three layouts share the same data:

- `force` (default): the web. Nodes push each other away and links pull like springs until the network settles; the whole network fits the box while it moves.
- `circle`: the nodes on a circle, grouped by group, with the links curved through the inside. Good to see which groups talk to each other.
- `radial`: one node in the centre (`center`) and the others in rings, one step further each ring. Good to see everything around one page or one agent.

The model is an `Object`:

```js
{
	nodes: [{ id: 'pricing', name: '/pricing', group: 'Main', value: 2980, color: '#EB6834' }],   // optional
	links: [{ source: 'home', target: 'pricing', value: 12 }]                                       // value is optional (1)
}
```

__Limit: 500 nodes.__ The layout is computed in the browser and drawn as SVG, which stays smooth up to about 500 nodes. Do not send more: with more nodes the component keeps the 500 most important ones (by `value`, or by the weight of their links), leaves the rest out and writes a warning in the console. For bigger networks, group the nodes on the server (by section, by domain) before sending them.

Notes:

- Without `nodes`, the ids of the links are the names. Links from a node to itself are skipped. The size of a node is its `value`, or the weight of its links.
- Groups take the colours of a colour-blind safe palette in a fixed order (the first is the primary colour of the app), with a legend from 2 groups.
- The labels of the 25 biggest nodes are shown (`labels:auto`), the others appear on hover; `all` shows every label and `none` none. The labels have a halo, so they are readable over the links.
- `directed:true` draws an arrow at the target of every link.
- Pointer: drag a node and it stays where it is dropped; drag the background to pan; the wheel zooms on the pointer. The buttons zoom in, zoom out and fit the whole network again.
- Keyboard: the arrows go through the nodes from the most important, a screen reader announces each node with its group, value and neighbours, `Enter`/`Space` run `click`, `+` and `-` zoom and `0` fits. A hidden table has every link.
- With reduced motion the force layout is computed at once, without animation.
- On every change of the model the nodes that stay keep their place, so a network that is updated in real time does not jump.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of the chart in pixels (default: `420`)
- `layout {String}` `force`, `circle` or `radial` (default: `force`)
- `center {String}` the id of the node in the centre of `radial`; empty is the most important node (default: `''`)
- `directed {Boolean}` arrows at the targets (default: `false`)
- `labels {String}` `auto`, `all` or `none` (default: `auto`)
- `legend {Boolean}` shows the legend of the groups (default: `true`)
- `zoom {Boolean}` zoom with the wheel and the buttons (default: `true`)
- `format {String}` `number` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.8K` (default: `true`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(node, component)`, executed when the user clicks a node (without dragging it) or presses `Enter`/`Space` on it; `node` is `{ id, name, group, value, neighbours, item }` where `neighbours` are the ids of the connected nodes

__Runtime__: jComponent v20, no dependencies.
