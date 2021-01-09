COMPONENT('expander', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.readonly();

	self.toggle = function(v) {

		if (v == null)
			v = !self.hclass(cls + '-expanded');

		self.tclass(cls + '-expanded', v);
		var fa = self.find(cls2 + '-button').find('.fa');
		fa.tclass('fa-angle-double-down', !v);
		fa.tclass('fa-angle-double-up', v);
	};

	self.make = function() {
		self.aclass(cls + (config.expand ? (' ' + cls) : ''));
		self.element.wrapInner('<div class="' + cls + '-container"></div>');
		self.append('<div class="' + cls + '-fade"></div><div class="' + cls + '-button"><span class="fa fa-angle-double-down"></span></div>');
		self.event('click', cls2 + '-button', function() {
			self.toggle();
		});
	};
});