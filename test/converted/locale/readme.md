---
name: locale
description: This component sets current browser locale (number format, date format and time format) according to the navigatior.language.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-04-13 21:55
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Locale

This component sets current browser locale (number format, date format and time format) according to the `navigatior.language`.

- singleton
- `path` will contain current's browser locale
- sets `DEF.dateformat` and it creates environment value called `[ts]`

__Configuration__:

- `language {String}` optional, a custom language (default: `navigator.language`)
- `requests {Boolean}` optional, adds a language to the every request (it affects `DEF.languagehtml`, default: `false`)

__Environments__:

- `[ts]` full timestamp
- `[date]` only date
- `[time]` only time

__Output__:

```js
{
	dt: 'yyyy–MM–dd', // date format
	nf: 1,  // number format: 1 = 100 000.123, 2 = 100 000,123, 3 = 100.000,123, 4 = 100,000.123
	fdw: 0, // first day of week
	tf: 24  // time format: 12, 24
}
````

__Methods__:

- `component.use(language)`

__Supported special languages__:

- `eu` with the dd.MM.yyyy with a 24 hour system
- `us` with the MM-dd-yyyy with a 12 hour system
