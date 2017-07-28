COMPONENT('page', function(self, config) {

	var type = 0;

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.setter = function(value) {

		if (type === 1)
			return;

		var is = config.if == value;

		if (type === 2 || !is) {
			self.toggle('hidden', !is);
			is && config.reload && self.get(config.reload)();
			self.release(!is);
			return;
		}

		SETTER('loading', 'show');
		type = 1;

		self.import(config.template, function() {
			type = 2;

			if (config.init) {
				var fn = GET(config.init || '');
				typeof(fn) === 'function' && fn(self);
			}

			config.reload && self.get(config.reload)();

			setTimeout(function() {
				self.toggle('hidden', !is);
			}, 200);

			SETTER('loading', 'hide', 1000);
		}, false);
	};
});