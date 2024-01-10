COMPONENT('floweditor', 'left:1;top:1;margin:0;right:0;bottom:0;zindex:30;language:eu;url:https://flow.totaljs.com;closebutton:1', function(self, config, cls) {

	var self = this;
	var iframe;
	var meta = {};

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

			if (!iframe)
				return;

			e = e.originalEvent;

			if (e.source !== iframe.contentWindow)
				return;

			var data = e.data;

			if (typeof(data) === 'string')
				data = PARSE(data);

			switch (data.TYPE) {
				case 'ready':
					iframe.contentWindow.postMessage(STRINGIFY({ TYPE: 'load', data: meta.data }), '*');
					break;
				case 'keypress':
					SETTER('shortcuts/exec', data.value);
					break;
				case 'save':
					meta.callback(typeof(data.data) === 'object' ? JSON.stringify(data.data, null, '\t') : data.data);
					break;
				case 'close':
					self.hide();
					break;
			}
		});
	};

	self.hide = function() {
		if (iframe) {
			self.find('iframe').remove();
			iframe = null;
			self.aclass('hidden');
			config.close && self.EXEC(config.close);
		}
	};

	self.setter = function(value) {

		if (!value) {
			self.hide();
			return;
		}

		iframe && self.find('iframe').remove();
		self.append('<iframe src="{0}&language={1}&darkmode={2}&hideclose={3}" scrolling="no" frameborder="0"></iframe>'.format(config.url + '/?socket=' + encodeURIComponent(value), config.language, $('body').hclass('ui-dark') ? 1 : 0, config.closebutton ? '0' : '1'));
		iframe = self.find('iframe')[0];
		self.resize();
		self.rclass('hidden');
	};

	self.resize = function() {
		if (iframe) {
			var css = {};
			css.width = WW - config.left - config.right;
			css.height = WH - config.top - config.bottom;
			self.css(css);
			css.width -= 2;
			css.height -= 3;
			$(iframe).css(css);
		}
	};

});