---
name: Backup
description: The component for data saving data to and loading from the local storage of the browser.
author: Kirill Zlobin
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2022-05-09 15:09
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Backup

The component for data saving data to and loading from the local storage of the browser.

- supports __dark mode__

__Configuration__:

- `exec {String}` Optional property which contains a link to a function, which will be executed after clicking on a button of the component. The function can have an argument, which is the name of a clicked button - function(name).
- `expire {String}` Optional property, which specifies the period during which the data will be stored in the local storage. The default value is '1 day'. The value of the property should be written in the following format: "number [seconds, minutes, hours, days, weeks, months, years]"
