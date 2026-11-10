---
name: WizardExpert
description: A simple solution for making of advanced wizards.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2020-01-29 11:39
updated: 2026-11-03 10:36
jcomponent: v19
---

# WizardExpert

A simple solution for making of advanced wizards. Wizard downloads steps (as HTML parts) according to the schema. Steps are wrapped into custom scopes, so they are under validation.

__Configuration__:
- `output {String}` a path for output, the object will contain entire output (steps will be properties)
- `exec {String}` a path to `method(output_object)`, it's executed if wizard doesn't contain any next step
- `next {String}` a path, here will be assigned next step with `enabled {Boolean}` property
- `back {String}` a path, here will be assigned previous step with `enabled {Boolean}` property
- `validate {Boolean}` enables validation (default: `true`)

__Schema__:

```js
{
	'step1': { url: 'step1.html', next: 'step2', validate: false },
	'step2': { url: 'step2.html', next: 'step3' },
	'step3': { url: 'step3.html' }
}
```

- component extends each step by adding new properties `enabled {Boolean}`, `id {String}`, `prev {String}`
