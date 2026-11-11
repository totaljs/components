---
name: WebMCP
description: Exposes the Total.js 5 MCP tools to WebMCP-capable browsers
author: Total.js
version: 1.0
darkmode: false
license: MIT
created: 2026-11-11 10:20
updated: 2026-11-11 10:20
jcomponent: v20
---

# WebMCP

Exposes the tools of a Total.js 5 application to AI agents running in the browser (WebMCP). The component reads the MCP catalogue of the server, registers every tool with `document.modelContext` and forwards each call to the server. It has no visible interface, bound model or callbacks. Browsers without WebMCP are ignored. A tool that cannot be registered is skipped with a console warning and the other tools are still registered.

__Configuration__:

- `url {String}` Same-origin MCP route (default: `/$mcp/`, the native Total.js 5 route)
- `tools {String}` `auto` for all tools, comma-separated tool names, or a JSON array of names (default: `auto`)
- `source {String}` Model path with an array of names, or a selector function (default: empty). When set, it takes precedence over `tools`

Options are read at mount. Multiple instances on a page need distinct tool names.

## Usage

```html
<ui-component name="webmcp"></ui-component>
```

Choose which tools are registered:

```html
<ui-component name="webmcp" config="tools:Notes_find,Notes_create"></ui-component>
<ui-component name="webmcp" config='tools:["Notes_find","Notes_create"]'></ui-component>
<ui-component name="webmcp" config="source:webmcpselection"></ui-component>
```

`source` can be an array of names or entries like `{ name: 'Notes_find', description: 'Find notes.' }` (the description is what the browser agent sees). It can also be a function `function(catalogue, component)` returning an array, `'auto'` or a Promise of either:

```javascript
SET('webmcpselection', function(catalogue) {
	return catalogue.filter(function(tool) {
		return tool.name.indexOf('Notes_') === 0;
	}).map(function(tool) {
		return tool.name;
	});
});
```

The selection only decides what the page registers. The schemas and the execution always come from the server.

## Total.js 5 integration

Total.js 5 includes an MCP server. Enable it in the config file and mark the actions to expose with `mcp: true`:

```plain
$mcp : true
```

```javascript
NEWACTION('Notes|find', {
	mcp: true,
	summary: 'Find notes by text',
	input: '*q:String // Text to search',
	action: function($, model) {
		$.callback([]);
	}
});
```

The route `POST /$mcp/` publishes the action as the tool `Notes_find` (`|` becomes `_`), with the input schema generated from `input`, `query` and `params`. Tool arguments are sent as `{ input: {}, query: {}, params: {} }`. The component registers it automatically; nothing else is needed on the page.

__Security__: the native route runs every tool as `{ sa: true, name: 'AI' }`, whatever `Total.mcp.auth` returns, and the default `Total.mcp.auth` accepts every caller. `Total.mcp.auth` only decides who may call the route; the action does not receive the signed-in user. Mark with `mcp: true` only actions that are safe for every caller you let in.

The component sends same-origin cookies and rejects redirects. It does not send an `Authorization` header, so validate the session cookie in `Total.mcp.auth`:

```javascript
Total.mcp.auth = function($) {
	// $.cookie(name) reads the session cookie of the visitor
	// $.success(user) allows the call, $.invalid(401) rejects it
};
```

### Public pages

For anonymous visitors, do not open `/$mcp/`. Add your own route that lists and executes only the allowed tools, and point `url` at it:

```javascript
const allowed = new Set(['Notes_find']);

ROUTE('POST /webmcp/ <64KB <15s', function($) {
	let data = $.body;
	if (!data || data.jsonrpc !== '2.0' || data.id == null)
		return $.invalid('Invalid JSON-RPC request');

	if (data.method === 'tools/list') {
		$.json({ jsonrpc: '2.0', id: data.id, result: { tools: Total.mcp.tools.filter(tool => allowed.has(tool.name)) } });
	} else if (data.method === 'tools/call' && data.params && allowed.has(data.params.name)) {
		Total.mcp.exec($);
	} else {
		$.json({ jsonrpc: '2.0', id: data.id, error: { code: -32601, message: 'Unknown method or tool' } });
	}
});
```

```html
<ui-component name="webmcp" config="url:/webmcp/"></ui-component>
```

## Browser result

The native MCP result is returned to the browser unchanged: `content`, `structuredContent` and tool errors (`isError`). HTTP and JSON-RPC errors reject the call.

Try it on HTTPS or localhost in a browser with WebMCP support.
