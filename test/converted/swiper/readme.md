---
name: swiper
description: TODO
author: Dodo Marton
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2023-03-06 15:00
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Swiper

- wrapper for [Swiper.js library](https://swiperjs.com/)
- easy usage
- learn from example

__Configuration__:

- `slidesperview {Number}` count of the items in the one slide (default: `1`)
- `spacebetween {Number}` a space between items (default: `0`)
- `navigation {Boolean}` show/hide navigation arrows (default: `false`)
- `pagination {Boolean}` show/hide pagination bullets (default: `false`)
- `autoplay {Boolean}` allow autoplay (default: `false`)
- `delay {Number}` a delay between slides change, working with autoplay only (default: `2500`)
- `loop {Boolean}` infinity loop through the slides (default: `false`)
- __NEW__ `reset {Number}` idle time after which the swiper restarts and returns to the first image (enter in minutes)
- __NEW__ `freemode {Boolean}` moving slides without fixed alignment to individual slides (default: `false`)
