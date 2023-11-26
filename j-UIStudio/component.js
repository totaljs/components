COMPONENT('uistudio', 'css:1;loading:1;inputdelay:20;title:false', function(self, config, cls) {

	self.readonly();

	var current = {};
	var parents = [];
	var endpoint;

	current.origin = config.origin || location.origin;
	current.query = NAV.query;
	current.ssid = config.ssid || NAV.query.ssid;

	var navigate = function() {

		config.loading && SETTER('loading/show');

		var url = endpoint;

		if (url.charAt(0) === '/')
			url = (config.origin || location.origin) + url;

		if (current.ssid)
			url = QUERIFY(url, { ssid: current.ssid });

		AJAX('POST {0} ERROR'.format(url), current, function(response) {

			// response.id
			// response.parent
			// response.data
			// response.query
			// response.url

			var issame = current.id === response.id;

			if (response.url) {

				if (response.url.charAt(0) === '/' && (/^http(s):\/\//i).test(url)) {
					if (config.origin) {
						response.url = config.origin + response.url;
					} else {
						var origin = url.substring(0, url.indexOf('/', 9));
						if (origin.charAt(0) !== '/' && location.origin.indexOf(origin) === -1)
							response.url = origin + response.url;
					}
				}

				if (issame) {
					if (response.input)
						setTimeout(response => self.app.input(response.input, response.data), config.inputdelay, response);
					SETTER('loading/hide', 500);
					return;
				} else {
					var breadcrumb = CLONE(current);
					breadcrumb.navigate = function() {
						current = this;
						navigate();
					};
					parents.push(breadcrumb);
				}

				current.id = response.id;
				current.data = response.data;

				if (self.app) {
					self.app.remove();
					self.app = null;
				}

				AJAX('GET {url} ERROR'.args(response), function(data) {

					if (!config.css)
						data.css = '';

					data.id = response.id;
					data.query = data.query || current.query || {};
					data.ssid = data.query.ssid || current.ssid;
					data.openplatform = data.query.openplatform;

					UIBuilder.build(self.element, data, function(app) {

						config.loading && SETTER('loading/hide', 500);

						app.breadcrumb = parents;

						self.app = app;
						self.app.component = self;

						if (config.title)
							document.title = data.name + (config.plus ? (' - ' + config.plus) : '');

						// Loads input data
						if (response.input)
							setTimeout(response => self.app.input(response.input, response.data), config.inputdelay, response);

						self.app.on('output', function(meta) {
							setTimeout(function(meta) {
								if (!meta.processed) {
									current.output = meta.id;
									current.data = meta.data;
									navigate();
								}
							}, 10, meta);
						});

						config.onapp && self.EXEC(config.onapp, app);
					});
				});
			} else {
				if (config.loading)
					SETTER('loading/hide', 500);
			}

		});

	};

	self.make = function() {
		self.aclass(cls);
		endpoint = config.url;
		endpoint && navigate();
	};

	self.destroy = function() {
		if (self.app) {
			self.app.remove();
			self.app = null;
		}
	};

	self.setter = function(value) {
		if (value) {
			current = {};
			current.origin = config.origin || location.origin;
			current.query = NAV.query;
			current.ssid = config.ssid || NAV.query.ssid;
			endpoint = value;
			navigate();
		}
	};

}, ['<UIBuilder> https://cdn.componentator.com/uibuilder.min@1.js']);
