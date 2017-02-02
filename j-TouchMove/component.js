COMPONENT('touchmove', function() {
	var self = this;
	var begX;
	var begY;
	var diff;

	self.readonly();
	self.make = function() {

		diff = (self.attr('data-diff') || '110').parseInt();
		if (!diff)
			diff = 80;

		self.event('touchstart touchmove', function(e) {

			var x = e.originalEvent.touches[0].pageX;
			var y = e.originalEvent.touches[0].pageY;

			if (e.type === 'touchstart') {
				begX = x;
				begY = y;
				return;
			}

			var diffX = begX - x;
			var diffY = begY - y;
			var path;

			if (diffX > diff) {
				// prev
				path = self.element.attr('data-next');
			} else if (diffX < -diff) {
				// prev
				path = self.element.attr('data-prev');
			} else if (diffY > diff) {
				// down
				path = self.element.attr('data-down');
			} else if (diffY < -diff) {
				// up
				path = self.element.attr('data-up');
			}

			if (!path)
				return;

			self.get(path)();
			e.preventDefault();
			e.stopPropagation();
		});
	};
});