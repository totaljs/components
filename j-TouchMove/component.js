COMPONENT('touchmove', function(self) {

	var begX, begY, diff;

	self.readonly();
	self.make = function() {

		diff = +(self.attrd('diff') || '110');
		!diff && (diff = 80);

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
				path = self.attrd('next');
			} else if (diffX < -diff) {
				// prev
				path = self.attrd('prev');
			} else if (diffY > diff) {
				// down
				path = self.attrd('down');
			} else if (diffY < -diff) {
				// up
				path = self.attrd('up');
			}

			if (!path)
				return;

			self.get(path)();
			e.preventDefault();
			e.stopPropagation();
		});
	};
});