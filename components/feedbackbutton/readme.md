---
name: FeedbackButton
description: Singleton floating feedback button on the left or right edge that can link to a URL, be dismissed, and stay hidden for a set expiration time
author: Jozef Marton
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-08-25 14:21
updated: 2023-01-31 10:01
jcomponent: v19,v20
---

# FeedbackButton

- singleton
- universal usage
- supports background-color change
- supports left or right position
- supports expiration time

__Configuration__:

- `color {String}` background color setting (default: `#333`)
- `position {String}` a position, can be `left` or `right` (default: `right`)
- `expire {String}` sets the expiration date (default: `3 days`)
- `icon {String}` a font-awesome icon name (default: `fa fa-comment-alt`)
- `animate {Boolean}` enables animation (default: `true`)
- `label {String}` a label for the button (default: `Feedback`)
- `url {String}` a link to URL address which will be open if the user click on the button
- or `exec {String}` a link to method `function(hide)` which will be executed after click on the button
