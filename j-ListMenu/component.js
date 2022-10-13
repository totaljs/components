COMPONENT('listmenu', 'class:selected;selector:a;property:id;click:true', function(self, config) {

	var old, oldvalue;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		var scr = self.find('script');
		self.template = Tangular.compile(scr.html());
		scr.remove();
	};

	self.configure = function(name, value) {
		switch (name) {
			case 'datasource':
				self.datasource(value, self.rebind);
				break;
		}
	};

	self.rebind = function(path, value) {

		if (!value || !value.length) {
			self.empty();
			return;
		}

		var builder = [];
		var opt = { length: value.length };
		for (var i = 0; i < opt.length; i++) {
			var item = value[i];
			opt.index = i;
			builder.push(self.template(item, opt));
		}

		oldvalue = null;
		self.html(builder.join(''));

		config.click && self.find(config.selector).on('click', function() {
			var arr = self.find(config.selector).toArray();
			var index = arr.indexOf(this);
			if (index !== -1) {
				var item = self.finditem(self.get(self.makepath(config.datasource)), index);
				item && self.set(item[config.property]);
			}
		});

		self.refresh();
	};

	self.finditem = function(arr, index) {
		var j = 0;
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var id = item[config.property];
			if (id && id != '-') {
				if (index === j)
					return item;
				j++;
			}
		}
	};

	self.findindex = function(arr, value) {
		var j = 0;
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var id = item[config.property];
			if (id && id != '-') {
				if (id === value)
					return j;
				j++;
			}
		}
	};

	self.setter = function(value) {
		var arr = GET(self.makepath(config.datasource));
		if (arr && arr.length) {
			if (value === oldvalue)
				return;

			oldvalue = value;
			old && old.rclass(config.class);
			var index = self.findindex(arr, value);
			if (value)
				old = self.find(config.selector).eq(index).aclass(config.class);
		}
	};
});