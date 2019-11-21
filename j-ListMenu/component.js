COMPONENT('listmenu', 'class:selected;selector:a;attr:id;property:id;click:true', function(self, config) {

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
				self.datasource(self.makepath(value), self.rebind);
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
			var id = $(this).attrd(config.attr);
			var item = self.get(self.makepath(config.datasource)).findItem(config.property, id);
			self.set(item[config.property]);
		});

		self.refresh();
	};

	self.setter = function(value) {
		var arr = GET(self.makepath(config.datasource));
		if (arr && arr.length) {
			if (value === oldvalue)
				return;
			oldvalue = value;
			old && old.rclass(config.class);
			if (value)
				old = self.find(config.selector + '[data-' + config.attr + '="' + value + '"').aclass(config.class);
		}
	};
});