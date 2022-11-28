COMPONENT('expander', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.readonly();

	self.toggle = function(v) {

		if (v == null)
			v = !self.hclass(cls + '-expanded');

		self.tclass(cls + '-expanded', v);
		var ti = self.find(cls2 + '-button').find('.ti');
		ti.tclass('ti-angle-double-down', !v);
		ti.tclass('ti-angle-double-up', v);
	};

	self.make = function() {
		self.aclass(cls + (config.expand ? (' ' + cls) : ''));
		self.element.wrapInner('<div class="' + cls + '-container"></div>');
		self.append('<div class="' + cls + '-fade"></div><div class="' + cls + '-button"><span class="ti ti-angle-double-down"></span></div>');
		self.event('click', cls2 + '-button', function() {
			self.toggle();
		});
	};
});