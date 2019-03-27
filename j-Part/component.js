COMPONENT('part', 'hide:1;loading:1', function(self, config) {

	var init = false;
	var clid = null;
	var downloading = false;

	self.releasemode && self.releasemode('true');
	self.readonly();

	self.setter = function(value) {

		if (config.if !== value) {

			if (!self.hclass('hidden')) {
				config.hidden && EXEC(config.hidden);
				config.hide && self.aclass('hidden');
				self.release(true);
			}

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

			self.release(false);
			config.reload && EXEC(config.reload);
			config.default && DEFAULT(config.default, true);

			setTimeout(function() {
				self.element.SETTER('*', 'resize');
			}, 200);

		} else {

			if (downloading)
				return;

			config.loading && SETTER('loading', 'show');
			downloading = true;
			setTimeout(function() {
				self.import(config.url, function() {
					downloading = false;

					if (!init) {
						config.init && EXEC(config.init);
						init = true;
					}

					self.release(false);
					config.reload && EXEC(config.reload);
					config.default && DEFAULT(config.default, true);
					config.loading && SETTER('loading', 'hide', 500);
					self.hclass('invisible') && self.rclass('invisible', 500);

					setTimeout(function() {
						self.element.SETTER('*', 'resize');
					}, 200);
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