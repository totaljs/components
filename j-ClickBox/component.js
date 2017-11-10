COMPONENT('clickbox', function(self, config) {

	var visible = false;

	self.readonly();
	self.blind();

	self.init = function() {
		$(document).on('click', function() {
			if (visible) {
				$('.ui-clickbox-visible').rclass('ui-clickbox-visible');
				visible = false;
			}
		});
	};

	self.make = function() {

		self.aclass('ui-clickbox');
		var el = self.element;
		el.wrapInner('<nav></nav>');
		el.prepend('<div><i class="fa fa-caret-down"></i><span></span></div>');
		self.event('click', function() {

			var cls = 'ui-clickbox-visible';
			if (self.hclass(cls)) {
				self.rclass(cls);
				visible = false;
				return;
			}

			visible = true;
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