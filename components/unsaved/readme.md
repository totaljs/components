---
name: Unsaved
description: Warns the user before leaving the page when the bound value or a check function reports unsaved changes
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-10-05 17:09
updated: 2023-01-21 22:44
jcomponent: v19,v20
---

# Unsaved

- easy usage
- `path` optional, can contain a link to the `Boolean` value, `true` will display a confirmation message

__Configuration__:

- `check {String}` a link to the __check__ `function() {` that must return `Boolean` -> `true` will display a confirmation message (it's synchronous)
- `message {String}` a message for the user (it may not work with most browsers because they have their own messages)
