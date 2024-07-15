COMPONENT('clickbox', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.init = function() {
		$(document).on('click', function() {
			$(cls2 + '-visible').rclass(cls + '-visible');
		});
	};

	self.make = function() {

		self.aclass(cls);

		var el = self.element;

		el.wrapInner('<nav></nav>');
		el.prepend('<div><i class="ti ti-caret-down"></i><span></span></div>');
		self.event('click', function() {

			var cls = cls + '-visible';

			if (self.hclass(cls)) {
				self.rclass(cls);
				return;
			}

			self.aclass(cls, 50);
		});

		self.refresh();
	};

	self.refresh = function() {

		var query = NAV.query();
		var value = query[config.param] || '';
		var all = self.find('a');

		if (!value)
			all = all.eq(0);

		all.each(function() {
			var t = this;
			if (t.href.indexOf(config.param + '=' + value) !== -1) {
				var el = $(t).aclass('selected');
				self.find('span').html(el.text());
			}
		});
	};
});