COMPONENT('display', 'delay:100', function(self, config, cls) {

	var initialized = false;
	var prev;

	self.readonly();

	self.make = function() {
		self.aclass(cls);
		self.resizeforce();
		self.on('resize + resize2', self.resize);
	};

	self.resizeforce = function() {
		var size = WIDTH(self.element);
		if (!prev || prev.substring(3) !== size) {
			prev && self.rclass(prev);
			prev = 'jc-' + size;
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