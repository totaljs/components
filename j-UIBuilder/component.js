COMPONENT('uibuilder', 'css:1', function(self, config, cls) {

	self.make = function() {
		self.aclass(cls);
	};

	self.done = function() {
		config.url && AJAX('GET ' + config.url, self.load);
	};

	self.load = function(data) {

		if (!data || data instanceof Array || typeof(data) !== 'object')
			return;

		if (self.app) {
			self.app.remove();
			self.app = null;
			config.app && self.SEEX(config.app, null);
		}

		data.id = config.id || self.ID;
		UIBuilder.build(self.element, data, function(response) {

			if (!config.css)
				response.css = '';

			response.component = self;
			response.schema = data;
			self.app = response;
			config.app && self.SEEX(config.app, response, data);
			config.output && self.app.on('output', function(meta) {
				self.SEEX(config.output, meta);
			});
		});
	};

	self.setter = function(value) {
		if (value) {
			if (typeof(value) === 'string')
				AJAX('GET ' + value, self.load);
			else
				self.load(value);
		} else if (self.app) {
			self.app.remove();
			self.app = null;
			config.app && self.SEEX(config.app, null);
		}
	};

}, ['https://cdn.componentator.com/uibuilder.min@1.js']);