COMPONENT('clickbox', function(self, config) {

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.init = function() {
		$(document).on('click', function() {
			$('.ui-clickbox-visible').rclass('ui-clickbox-visible');
		});
	};

	self.make = function() {

		self.aclass('ui-clickbox');
		var el = self.element;
		el.wrapInner('<nav></nav>');
		el.prepend('<div><i class="ti ti-caret-down"></i><span></span></div>');
		self.event('click', function() {

			var cls = 'ui-clickbox-visible';
			if (self.hclass(cls)) {
				self.rclass(cls);
				return;
			}

			setTimeout(function() {
				self.aclass(cls);
			}, 50);
		});

		self.refresh();
	};

	self.refresh = function() {
		var query = MAIN.parseQuery();
		var value = query[config.param] || '';
		var all = self.find('a');

		if (!value)
			all = all.eq(0);

		all.each(function() {
			if (this.href.indexOf(config.param + '=' + value) !== -1) {
				var el = $(this).aclass('selected');
				self.find('span').html(el.text());
			}
		});
	};
});