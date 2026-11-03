---
name: isopen
description: Shows opening hours from a template and whether the place is open at the current time, refreshed automatically
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-10-26 12:55
updated: 2026-11-03 10:36
jcomponent: v19
---

# IsOpen

__j-IsOpen__ is a simple component for showing opening hours. The component supports auto-refresh `datetime`.

__Tangular model properties__:

```html
{{ date }}    - (date) current date instance
{{ month }}   - (number) current month (1=januar ... 12=december)
{{ year }}    - (number) current year
{{ day }}     - (number) current day number in calendar
{{ daytype }} - (number) current day type (0=sunday ... 6=saturday)
{{ minutes }} - (number) current minutes
{{ hours }}   - (number) current hours
{{ week }}    - (boolean) is weekend?
```
