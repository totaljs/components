COMPONENT('part', 'hide:true', function(self, config) {

	var init = false;
	var clid = null;

	self.readonly();
	self.setter = function(value) {

		if (config.if !== value) {
			config.hidden && !self.hclass('hidden') && EXEC(config.hidden);
			config.hide && self.aclass('hidden');
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		config.hide && self.rclass('hidden');

		if (self.element[0].hasChildNodes()) {

			if (clid) {
				clearTimeout(clid);
				clid = null;
			}

			config.reload && EXEC(config.reload);
			config.default && DEFAULT(config.default, true);

		} else {
			SETTER('loading', 'show');
			setTimeout(function() {
				self.import(config.url, function() {
					if (!init) {
						config.init && EXEC(config.init);
						init = true;
					}
					config.reload && EXEC(config.reload);
					config.default && DEFAULT(config.default, true);
					SETTER('loading', 'hide', 500);
				});
			}, 200);
		}
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'if':
				config.if = value + '';
				break;
		}
	};

	self.clean = function() {
		if (self.hclass('hidden')) {
			config.clean && EXEC(config.clean);
			setTimeout(function() {
				self.empty();
				init = false;
				clid = null;
				setTimeout(FREE, 1000);
			}, 1000);
		}
	};
});