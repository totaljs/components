COMPONENT('scrollbar', 'reset:true;margin:0;marginxs:0;marginsm:0;marginmd:0;marginlg:0', function(self, config) {

	self.readonly();

	self.configure = function(key, value) {
		if (key === 'track') {
			if (!(value instanceof Array))
				value = value.split(',').trim();

			for (var i = 0; i < value.length; i++)
				value[i] = self.path + '.' + value[i];

			value.push(self.path);
			config.track = value;
		}
	};

	self.init = function() {
		SETTER('scrollbar', 'resize');
	};

	self.make = function() {
		self.scrollbar = SCROLLBAR(self.element, { visibleX: config.visibleX, visibleY: config.visibleY });
	};

	self.resize = function() {
		if (config.parent) {
			var parent = config.parent === 'window' ? $(window) : self.element.closest(config.parent).height();
			self.element.css('height', parent.height() - (config.offset ? self.element.offset().top : 0) - config.margin - config['margin' + WIDTH()]);
		}
		self.scrollbar.resize();
	};

	self.on('resize', self.resize);
	self.done = self.resize;

	self.scrollLeft = function(val) {
		self.scrollbar.scrollLeft(val);
	};

	self.scrollTop = function(val) {
		self.scrollbar.scrollTop(val);
	};

	self.scroll = function(x, y) {
		self.scrollbar.scroll(x, y);
	};

	self.reset = function() {
		self.scroll(0, 0);
	};

	self.setter = function(value, path, type) {
		if (config.track && config.track.indexOf(path) === -1)
			return;
		type && setTimeout(function() {
			self.resize();
			config.reset && self.reset();
		}, 500);
	};

});