---
name: Stash
description: The component can postpone elements without destructing and detaching from the DOM.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-01-14 21:49
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Stash

The component can postpone elements without destructing and detaching from the DOM. This component can help you with dynamic content from the server side. We use the component in the Total.js FlowStream projects for the component's settings.

- elements can contain everything like components, scopes, binders, etc.

__Configuration__:

- `load {String}` a path to the method `function(id, next(html/element))` that is evaluated if the content wasn't loaded before
- __NEW__: `class {String}` a class name for the stash container (default: `hidden`)

__Methods__:

- `component.add(id, html/element)` adds new HTML/element
- `component.clear([id])` clears specific ID (`id` is optional) or clears all cached content
