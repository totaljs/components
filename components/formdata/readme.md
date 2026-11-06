---
name: formdata
description: With this component you can send data via the POST/PUT/DELETE method to the current window or another.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2023-02-11 13:55
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# FormData

With this component you can send data via the POST/PUT/DELETE method to the current window or another.

- singleton

### Configuration

- `method {String}` a default HTTP method (default: `POST`)
- `target {String}` a default target (default: `_blank`)
- `type {String}` a default form type (default: `application/x-www-form-urlencoded`)

### Methods

- `component.send(opt)`
	- `opt.method {String}` form method, default `config.method`
	- `opt.target {String}` form target, default `config.target`
	- `opt.type {String}` form type, default `config.target`
	- `opt.url {String}` __required__ URL address
	- `opt.data {Object}` __required__ form data in the form `{ key1:value, key2:value }`
