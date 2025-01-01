COMPONENT('expander', 'height:150;iconup:ti-angle-double-up;icondown:ti-angle-double-down', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.readonly();

	self.toggle = function(v) {
		if (v == null)
			v = !self.hclass(cls + '-expanded');
		self.tclass(cls + '-expanded', v);
		var ti = self.find(cls2 + '-button').find('.ti');
		ti.tclass(config.icondown, !v);
		ti.tclass(config.iconup, v);
	};

	self.make = function() {
		self.aclass(cls + (config.expand ? (' ' + cls) : ''));
		self.element.wrapInner('<div class="{0}-container" style="max-height:{1}px"><div class="{0}-nodes"></div></div>'.format(cls, config.height));
		self.append('<div class="' + cls + '-fade"></div><div class="' + cls + '-button"><span class="ti {0}"></span></div>'.format(config.icondown));
		self.event('click', cls2 + '-button', () => self.toggle());
		self.resize();
	};

	self.resize = function() {
		let height = self.find(cls2 + '-nodes').height();
		self.tclass(cls + '-visible', height > config.height);
	};

});