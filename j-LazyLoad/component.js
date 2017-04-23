COMPONENT('lazyload', function() {
	var self = this;
	var selector, container, offset;

	self.readonly();

	self.make = function() {
		selector = self.attr('data-selector');
		offset = +(self.attr('data-offset') || 50);
		container = $(self.attr('data-container') || window);
		container.on('scroll', self.refresh);
		setTimeout(function() {
			self.refresh();
		}, 1000);
	};

	self.refresh = function() {
		!self.release() && setTimeout2(self.id, self.prepare, 200);
	};

	self.released = self.refresh;
	self.setter = self.refresh;

	self.prepare = function() {
		var scroll = container.scrollTop();
		var beg = scroll - offset;
		var end = beg + container.height() + offset;
		self.find(selector).each(function() {
			if (this.getAttribute('data-lazyload'))
				return;
			var el = $(this);
			var top = (container !== window ? scroll : 0) + el.offset().top;
			if (top >= beg && top <= end) {
				el.attr('data-lazyload', true);
				EXEC(self.attr('data-exec'), el);
			}
		});
	};
});