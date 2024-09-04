COMPONENT('shoppingcart', 'discount:0;expiration:6 days', function(self, config) {

	var self = this;
	var Name = self.name;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'discount':
				self.sum();
				break;
		}
	};

	self.make = function() {
		var items = CACHE(Name);
		if (items && items.length) {
			var datasource = self.prepare();
			datasource.items = items;
		}
		self.sum(true);
	};

	self.prepare = function() {
		var datasource = self.get();

		!datasource && (datasource = {});

		if (!datasource.items) {
			datasource.items = [];
			datasource.price = 0;
			datasource.count = 0;
			datasource.total = 0;
			datasource.discount = config.discount;
			self.set(datasource);
		}

		return datasource;
	};

	self.sync = function(callback) {
		var datasource = self.prepare();
		var id = [];
		for (var i = 0; i < datasource.items.length; i++)
			id.push(datasource.items[i].id);
		callback(id, datasource);
	};

	self.read = function(id) {
		return self.prepare().items.findItem('id', id);
	};

	self.has = function(id) {
		var datasource = self.prepare().items;
		return id ? datasource.findItem('id', id) != null : datasource.length > 0;
	};

	self.count = function(id) {
		var datasource = self.prepare().items;
		return id ? datasource.findValue('id', id, 'count', 0) : 0;
	};

	self.add = function(id, price, count, name) {

		var datasource = self.prepare();
		var item = datasource.items.findItem('id', id);
		if (item) {
			item.price = price;
			item.count += count || 1;
		} else {
			item = { id: id, price: price, count: count || 1, name: name, date: new Date() };
			datasource.items.push(item);
		}

		setTimeout2(self.id + '.sum', self.sum, 100);
		EMIT(Name + '.add', item);
	};

	self.buy = function(id, price, count, name) {

		var datasource = self.prepare();
		var item = datasource.items.findItem('id', id);

		if (!count || count <= 0) {
			if (item) {
				var index = datasource.items.indexOf(item);
				datasource.items.splice(index, 1);
				setTimeout2(self.id + '.sum', self.sum, 100);
				EMIT(Name + '.add', item);
			}
			return;
		}

		if (item) {

			if (item.count === count)
				return;

			item.count = count;

		} else {
			item = { id: id, price: price, count: count, name: name, date: new Date() };
			datasource.items.push(item);
		}

		setTimeout2(self.id + '.sum', self.sum, 100);
		EMIT(Name + '.add', item);
	};

	self.upd = function(id, count, price, name) {
		var datasource = self.prepare();
		var item = datasource.items.findItem('id', id);
		if (item) {
			if (count != null)
				item.count = count;
			if (price != null)
				item.price = price;
			if (name != name)
				item.name = name;
			EMIT(Name + '.upd', item);
			setTimeout2(self.id + '.sum', self.sum, 100);
		}
	};

	self.clean = function() {
		var datasource = self.prepare();
		datasource.items = datasource.items.remove(item => item.count <= 0);
		self.sum();
	};

	self.items = function() {
		var datasource = self.get();
		return datasource ? (datasource.items || EMPTYARRAY) : EMPTYARRAY;
	};

	self.rem = function(id) {
		var datasource = self.prepare();
		datasource.items = datasource.items.remove('id', id);
		setTimeout2(self.id + '.sum', self.sum, 100);
		EMIT(Name + '.rem', id);
	};

	self.clear = function() {
		var datasource = self.prepare();
		datasource.items = [];
		self.sum();
		EMIT(Name + '.clear');
	};

	self.sum = function(init) {
		var datasource = self.prepare();

		datasource.count = 0;
		datasource.price = 0;

		for (var item of datasource.items) {
			item.total = item.price * item.count;
			datasource.count += item.count;
			datasource.price += item.total;
		}

		if (config.discount)
			datasource.total = datasource.price - ((datasource.price / 100) * config.discount);
		else
			datasource.total = datasource.price;

		!init && CACHE(Name, datasource.items, config.expiration);
		self.update(true);
		EMIT(Name + '.total', datasource);
	};

});
