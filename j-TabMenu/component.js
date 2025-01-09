COMPONENT('tabmenu', 'class:selected;selector:li;attr:value', function(self, config, cls) {

	var old, oldtab, loaded = false;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		self.event('click', config.selector, function() {
			if (!config.disabled) {
				var el = $(this);
				if (!el.hclass(config.class))
					self.bind('@touched @modified', el.attrd(config.attr));
			}
		});

		var scr = self.find('script');
		if (scr.length) {
			self.template = Tangular.compile(scr.html());
			scr.remove();
		}
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
			case 'datasource':
				self.datasource(value, function(path, value) {

					if (M.is20)
						value = path;

					if (value instanceof Array) {
						old = null;
						self.html(self.template({ value: value }));
						self.refresh();
					}

				}, true);
				break;
		}
	};

	self.setter = function(value) {

		if (!loaded) {
			loaded = true;
			self.rclass('invisible hidden', 10);
		}

		if (old === value)
			return;

		oldtab && oldtab.rclass(config.class);
		oldtab = self.find(config.selector + '[data-' + config.attr + '="' + value + '"]').aclass(config.class);
		old = value;
		config.exec && self.EXEC(config.exec, value);
	};

});