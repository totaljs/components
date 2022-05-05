COMPONENT('tabmenu', 'class:selected;selector:li', function(self, config, cls) {

	var old, oldtab;

	self.readonly();
	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.event('click', config.selector, function() {
			if (!config.disabled) {
				var el = $(this);
				if (!el.hclass(config.class)) {
					var val = el.attrd('value');
					if (config.exec)
						self.EXEC(config.exec, val);
					else
						self.set(val);
				}
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
					if (value instanceof Array) {
						var builder = [];
						for (var i = 0; i < value.length; i++)
							builder.push(self.template(value[i]));
						old = null;
						self.html(builder.join(''));
						self.refresh();
					}
				}, true);
				break;
		}
	};

	self.setter = function(value) {
		if (old === value)
			return;
		oldtab && oldtab.rclass(config.class);
		oldtab = self.find(config.selector + '[data-value="' + value + '"]').aclass(config.class);
		old = value;
	};
});