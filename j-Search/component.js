COMPONENT('search', 'class:hidden;delay:50;attribute:data-search;splitwords:1;delaydatasource:100', function(self, config, cls) {

	self.readonly();

	self.make = function() {
		config.datasource && self.datasource(config.datasource, function() {
			setTimeout(function() {
				self.refresh();
			}, config.delaydatasource);
		});
	};

	self.search = function() {

		var value = self.get();
		var elements = self.find(config.selector);
		var length = elements.length;

		if (!value) {
			elements.rclass(config.class);
			self.rclass2(cls + '-');
			config.exec && self.SEEX(config.exec, { hidden: 0, count: length, total: length, search: '', is: false });
			return;
		}

		var search = value.toSearch();
		var count = 0;
		var hidden = 0;
		var custom = config.custom ? GET(self.makepath(config.custom)) : null;

		if (config.splitwords)
			search = search.split(' ');

		self.aclass(cls + '-used');

		for (var i = 0; i < length; i++) {

			var el = elements.eq(i);
			var is = false;

			if (custom) {

				is = !!custom(el, search);
				el.tclass(config.class, is);

				if (is)
					hidden++;
				else
					count++;

				continue;
			}

			var val = (el.attr(config.attribute) || '').toSearch();

			if (search instanceof Array) {
				for (var j = 0; j < search.length; j++) {
					if (val.indexOf(search[j]) === -1) {
						is = true;
						break;
					}
				}
			} else
				is = val.indexOf(search) === -1;

			el.tclass(config.class, is);

			if (is)
				hidden++;
			else
				count++;
		}

		self.tclass(cls + '-empty', !count);
		config.exec && self.SEEX(config.exec, { total: length, hidden: hidden, count: count, search: search, is: true });
	};

	self.setter = function(value) {
		if (!config.selector || !config.attribute || value == null)
			return;
		setTimeout2('search' + self.ID, self.search, config.delay);
	};
});