COMPONENT('listmenu', 'class:selected;selector:a;property:id;click:true', function(self, config) {

	var source, old, oldvalue;

	self.make = function() {
		var scr = self.find('script');
		self.template = Tangular.compile(scr.html());
		scr.remove();
	};

	self.configure = function(name, value) {
		switch (name) {
			case 'datasource':
				source && self.unwatch(source, self.rebind);
				source = value;
				value && self.watch(value, self.rebind, true);
				break;
		}
	};

	self.rebind = function(path, value) {

		if (!value.length) {
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
		self.html(builder.join(''));

		config.click && self.find(config.selector).on('click', function() {
			var index = $(this).index();
			var item = self.get(source)[index];
			self.set(item[config.property]);
		});

		self.refresh();
	};

	self.setter = function(value) {
		var arr = self.get(source);
		if (arr.length) {
			if (value === oldvalue)
				return;
			oldvalue = value;
			var index = config.property ? arr.findIndex(config.property, value) : arr.indexOf(value);
			old && old.rclass(config.class);
			index !== -1 && (old = self.find(config.selector).eq(index).aclass(config.class));
		}
	};
});