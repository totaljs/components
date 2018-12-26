COMPONENT('viewbox', 'margin:0;scroll:true', function(self, config) {

	var eld;

	self.readonly();

	self.init = function() {
		$(window).on('resize', function() {
			SETTER('viewbox', 'resize');
		});
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				eld.tclass('hidden', !value);
				break;
			case 'minheight':
				!init && self.resize();
				break;
		}
	};

	self.make = function() {
		config.scroll && MAIN.version > 17 && self.element.wrapInner('<div class="ui-viewbox-body"></div>');
		self.element.prepend('<div class="ui-viewbox-disabled hidden"></div>');
		eld = self.find('> .ui-viewbox-disabled').eq(0);
		self.aclass('ui-viewbox ui-viewbox-hidden');
		if (config.scroll) {
			if (MAIN.version > 17)
				window.SCROLLBAR(self.find('.ui-viewbox-body'), { parent: self.element });
			else
				self.aclass('ui-viewbox-scroll');
		}
		self.resize();
	};

	self.resize = function() {
		var el = config.selector ? config.selector === 'window' ? $(window) : self.element.closest(config.selector) : self.parent();
		var h = el.height();

		if (h === 0) {
			setTimeout(self.resize, 234);
			return;
		}

		h = ((h / 100) * config.height) - config.margin;

		if (config.minheight && h < config.minheight)
			h = config.minheight;

		eld.css({ height: h, width: self.element.width() });
		self.css('height', h);
		self.element.SETTER('*', 'resize');
		var cls = 'ui-viewbox-hidden';
		self.hclass(cls) && self.rclass(cls, 100);
	};
});