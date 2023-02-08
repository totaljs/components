COMPONENT('uistudio', 'css:1;inputdelay:20', function(self, config, cls) {

	self.readonly();

	var current = {};

	current.origin = location.origin;

	var navigate = function() {

		SETTER('loading/show');

		AJAX('POST ' + config.url + ' ERROR', current, function(response) {

			// response.id
			// response.parent
			// response.data
			// response.query
			// response.url

			if (response.url) {

				current.id = response.id;
				current.data = response.data;

				if (self.app) {
					self.app.remove();
					self.app = null;
				}

				AJAX('GET ' + response.url + ' ERROR', function(data) {

					if (!config.css)
						data.css = '';

					data.query = data.query || current.query;

					UIBuilder.build(self.element, data, function(app) {

						SETTER('loading/hide', 500);

						self.app = app;
						self.app.component = self;

						// Loads input data
						if (response.input)
							setTimeout(response => self.app.input(response.input, response.data), config.inputdelay, response);

						self.app.on('output', function(meta) {
							current.output = meta.id;
							current.data = meta.data;
							navigate();
						});

					});
				});
			} else
				SETTER('loading/hide', 500);

		});

	};

	self.make = function() {
		self.aclass(cls);
		navigate();
	};

}, ['https://cdn.componentator.com/uibuilder.min@1.js']);