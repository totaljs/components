COMPONENT('lazyload', 'offset:50', function(self, config) {

	var is = null;
	var container = $(W);

	self.readonly();

	self.configure = function(key, value) {
		if (key === 'container') {
			container.off('scroll', self.refresh);
			container = $(value);
			is = container[0] === W;
			container.on('scroll', self.refresh);
		}
	};

	self.make = function() {
		is = true;
		container.on('scroll', self.refresh);
		setTimeout(self.refresh, 1000);
	};

	self.refresh = function() {
		!self.release() && setTimeout2(self.id, self.prepare, 200);
	};

	self.released = self.refresh;
	self.setter = self.refresh;

	self.prepare = function() {
		var scroll = container.scrollTop();
		var beg = scroll;
		var end = beg + container.height();
		var off = config.offset;
		self.find(config.selector).each(function() {
			if (!this.getAttribute('data-lazyload')) {
				var el = $(this);
				var top = (is ? 0 : scroll) + el.offset().top;
				if ((top + off) >= beg && (top - off) <= end) {
					el.attrd('lazyload', true);
					config.exec && self.EXEC(config.exec, el);
				}
			}
		});
	};
});