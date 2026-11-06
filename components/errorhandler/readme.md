---
name: errorhandler
description: The component tries using j-Message, j-Snackbar, j-NotifyBar or j-Notify for displaying of errors if you don't have defined exec configuration.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-10-27 10:36
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ErrorHandler

This component captures the `ON('ERROR', function(err` event trigger from the `ERROR()` method and tries to display form more comfortably.

- easy usage
- singleton

__Configuration__:

- `keywords {String}` which will be searched in the error messages (default value: `401=login`)
	- must be in the form `search1=target_property,search2=target_property`
- `exec {String}` a link to the `function(response)`, output:
	- `response.items {String Array}`
	- `response.message {String}`
	- `response.keyword_target_property {Boolean}` optional, according to the `keywords` settings
- __NEW__: `offline {String}` an offline message, default: `No internet connection`

The component tries using `j-Message`, `j-Snackbar`, `j-NotifyBar` or `j-Notify` for displaying of errors if you don't have defined `exec` configuration.
