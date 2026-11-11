---
name: Console
description: Singleton log console that shows messages from a data source in tabs per app, with a clear action and dark mode
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-02-09 16:52
updated: 2025-02-25 13:49
jcomponent: v19,v20
---

# Console

- easy usage
- singleton
- supports app tabs
- supports __dark mode__

__Configuration__:

- `datasource {String}` a path to data-source (learn from example)
- __NEW__ `clear {String}` clear logs, link to the `function(source)`

__Good to know__:

- `path` can be `{String}` with the `appid` due to focusing logs
