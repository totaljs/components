COMPONENT('selected', 'class:selected;selector:a;attr:if;attror:or;delay:50', function(self, config) {

	self.readonly();

	var highlight = function() {
		var cls = config.class;
		var val = self.get() || '';
		self.find(config.selector).each(function() {
			var el = $(this);
			var or = el.attrd(config.attror) || '';
			if (el.attrd(config.attr) === val || (or && val.indexOf(or) !== -1))
				el.aclass(cls);
			else if (el.hclass(cls))
				el.rclass(cls);
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'datasource':
				self.datasource(value, function() {
					setTimeout2(self.ID, highlight, config.delay);
				});
				break;
		}
	};

	self.setter = function() {
		setTimeout2(self.ID, highlight, config.delay);
	};
});