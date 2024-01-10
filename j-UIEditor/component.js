COMPONENT('uieditor', 'url:https://uibuilder.totaljs.com;margin:0;zindex:30;left:0;top:0;right:0;bottom:0;language:eu;closebutton:1', function(self, config, cls) {

	var self = this;
	var iframe;
	var meta;

	self.singleton();
	self.readonly();

	self.make = function() {

		var div = document.createElement('DIV');
		document.body.appendChild(div);
		self.replace(div);

		self.aclass(cls + ' hidden');
		self.css({ position: 'absolute', 'z-index': config.zindex, left: config.left, top: config.top + config.margin, right: 0, bottom: 0 });
		self.on('resize + resize2', self.resize);

		$(W).on('message', function(e) {

			e = e.originalEvent;

			var data = e.data;

			if (typeof(data) === 'string')
				data = PARSE(data);

			if (!data.uibuilder)
				return;

			switch (data.TYPE) {
				case 'close':
					setTimeout(self.hide, 200);
					meta.close && meta.close();
					config.onclose && self.EXEC(config.onclose, data.data);
					break;
				case 'ready':
					var msg = { TYPE: 'init', data: meta.data, upload: meta.upload, groups: meta.groups, apps: meta.apps, paths: meta.paths, views: meta.views, uibuilder: 1 };
					iframe.contentWindow.postMessage(STRINGIFY(msg), '*');
					break;
				case 'save':
					meta.save && meta.save(data.data);
					config.onsave && self.EXEC(config.onsave, data.data);
					break;
				case 'publish':
					meta.publish && meta.publish(data.data);
					config.onpublish && self.EXEC(config.onpublish, data.data);
					break;
				case 'render':
					meta.render && meta.render(data.data);
					config.onrender && self.EXEC(config.onrender, data.data);
					break;
			}
		});
	};

	self.hide = function() {
		if (iframe) {
			self.find('iframe').remove();
			iframe = null;
			meta = null;
			self.aclass('hidden');
		}
	};

	self.iframe = function() {
		iframe && self.find('iframe').remove();
		var url = config.url;
		url += url.indexOf('?') === -1 ? '?' : '&';
		self.append('<iframe src="{0}language={1}&darkmode={2}&hideclose={3}" scrolling="no" frameborder="0"></iframe>'.format(url, config.language, $('body').hclass('ui-dark') ? 1 : 0, config.closebutton ? '0' : '1'));
		iframe = self.find('iframe')[0];
		self.resize();
		self.rclass('hidden');
	};

	self.setter = function(value) {

		if (!value) {
			self.hide();
			return;
		}

		meta = value;
		self.iframe();
		self.rclass('hidden');

	};

	self.resize = function() {

		if (!iframe)
			return;

		var css = {};
		css.left = config.left;
		css.top = config.top;
		css.width = WW - config.right - config.left;
		css.height = WH - config.top - config.bottom;
		self.css(css);
		css.width -= 2;
		css.height -= 3;
		$(iframe).css(css);
	};

});