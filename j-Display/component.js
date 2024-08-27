COMPONENT('display', 'delay:100;xs:768;sm:992;md:1200', function(self, config, cls) {

	var initialized = false;
	var sizes = {};
	var prev;

	self.readonly();

	self.make = function() {
		self.aclass(cls);
		self.resizeforce();
		self.on('resize + resize2', self.resize);
	};

	self.resizeforce = function() {

		var width = self.element.width();
		var size = 'lg';

		if (width <= config.xs)
			size = 'xs';
		else if (width <= config.sm)
			size = 'sm';
		else if (width <= config.md)
			size = 'md';

		if (!prev || prev.substring(3) !== size) {
			prev && self.rclass(prev);
			prev = (M.version < 19 ? 'jc-' : 'd-') + size;
			self.aclass(prev);
			self.path && self.set(size);
			if (!initialized) {
				initialized = true;
				self.rclass('invisible hidden');
			}
		}
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, config.delay);
	};

});