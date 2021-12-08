COMPONENT('minheight', 'parent:auto;margin:0;attr:min-height', function(self, config, cls) {

	var timeout;
	var init = false;

	self.readonly();

	self.make = function() {
		self.aclass(cls);
		self.on('resize2', self.resize);
		self.resizeforce();
	};

	self.resize = function() {
		timeout && clearTimeout(timeout);
		timeout = setTimeout(self.resizeforce, 200);
	};

	self.resizeforce = function() {

		if (config['disabled' + WIDTH()]) {
			self.css(config.attr, config.minheight || '');
			return;
		}

		var parent = self.parent(config.parent);
		var h = parent.height() - config.margin;

		if (config.topoffset)
			h -= self.element.offset().top;

		if (config.topposition)
			h -= self.element.position().top;

		if (config.minheight && h < config.minheight)
			h = config.minheight;

		self.css(config.attr, h);

		if (!init) {
			init = true;
			self.rclass('invisible hidden');
		}

	};

});