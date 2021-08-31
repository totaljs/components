COMPONENT('selected', 'class:selected;selector:a;attr:if;attror:or;delay:50', function(self, config) {

	self.readonly();

	self.refresh2 = function() {
		self.refreshid = null;
		self.refresh();
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'datasource':
				self.datasource(value, function() {
					self.refreshid && clearTimeout(self.refreshid);
					self.refreshid = setTimeout(self.refresh2, config.delay);
				});
				break;
		}
	};

	self.setter = function(value) {
		var cls = config.class;
		self.find(config.selector).each(function() {
			var el = $(this);
			var or = el.attrd(config.attror) || '';
			if (el.attrd(config.attr) === value || (or && or.indexOf(value) !== -1))
				el.aclass(cls);
			else
				el.hclass(cls) && el.rclass(cls);
		});
	};
});