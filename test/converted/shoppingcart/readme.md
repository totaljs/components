---
name: shoppingcart
description: Singleton shopping cart stored in localStorage, with add, update, remove, discount and server sync methods
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-08-30 13:58
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ShoppingCart

- singleton
- supports discount
- data are stored in localStorage

__Configuration__:

- `discount {Number}` a discount in percentage (optional, default: `0`)
- `expiration {String}` data expiration (default: `6 days`)

__Output__:

```js
{
	items: [
		{
			name: String,
			price: Number,
			total: Number,
			count: Number,
			date: Date
		}
	],
	price: Number,
	total: Number,
	count: Number
}
````

### Methods

- `instance.add(id, price, count, [name])` adds new product or increase count if the product exists
- `instance.upd(id, [count], [price], [name])` updates product's data
- `instance.buy(id, price, count, [name])` creates/updates product
- `instance.rem(id)` removes product
- `instance.has(id)` checks product
- `instance.read(id)` reads product
- `instance.clear()` clears all products
- `instance.clean()` removes all products with zero count
- `instance.sync(function(array_id_products, meta) {})` create data for synchronization with the server

### Global Events

- `ON('shoppingcart.add', function(item) {})`
- `ON('shoppingcart.upd', function(item) {})`
- `ON('shoppingcart.rem', function(id) {})`
- `ON('shoppingcart.sum', function(data) {})`
- `ON('shoppingcart.clear', function() {})`
