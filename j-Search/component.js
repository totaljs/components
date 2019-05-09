COMPONENT('search', 'class:hidden;delay:50;attribute:data-search', function(self, config) {

	var cls = 'ui-search';

	self.readonly();
	self.setter = function(value) {

		if (!config.selector || !config.attribute || value == null)
			return;

		setTimeout2('search' + self.ID, function() {

			var elements = self.find(config.selector);
			if (!value) {
				elements.rclass(config.class);
				self.rclass2(cls + '-');
				config.exec && EXEC(config.exec, 0, search);
				return;
			}

			var search = value.toSearch();
			var count = 0;

			self.aclass(cls + '-used');

			elements.each(function() {
				var el = $(this);
				var val = (el.attr(config.attribute) || '').toSearch();
				var is = val.indexOf(search) === -1;
				el.tclass(config.class, is);
				if (!is)
					count++;
			});

			self.tclass(cls + '-empty', !count);
			config.exec && EXEC(config.exec, count, search);

		}, config.delay);
	};
});
