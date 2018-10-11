COMPONENT('viewbox', function(self, config) {

	var eld;

	self.readonly();

	self.init = function() {
		$(window).on('resize', function() {
			setTimeout2('viewbox', function() {
				SETTER('viewbox', 'resize');
			}, 300);
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				eld.tclass('hidden', !value);
				break;
		}
	};

	self.make = function() {
		self.element.prepend('<div class="ui-viewbox-disabled hidden"></div>');
		eld = self.find('> .ui-viewbox-disabled').eq(0);
		self.aclass('ui-viewbox');
		self.resize();
	};

	self.resize = function() {
		var el = config.selector ? config.selector === 'window' ? $(window) : self.element.closest(config.selector) : self.parent();
		var h = (el.height() / 100) * config.height;
		eld.css({ height: h, width: self.element.width() });
		self.css('height', h);
		self.element.SETTER('*', 'resize');
	};

});