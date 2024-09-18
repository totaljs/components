COMPONENT('hashchange', function(self, config) {

	var prev = '';

	self.singleton();
	self.readonly();

	self.ee = function() {
		EMIT('hash', prev);
	};

	self.handler = function() {
		var hash = location.hash.substring(1);
		if (prev !== hash) {
			prev = hash;
			if (config.delay)
				setTimeout2(self.ID, self.ee, config.delay);
			else
				self.ee();
		}
	};

	self.make = function() {
		$(W).on('hashchange', self.handler);
		self.handler();
	};

	self.destroy = () => $(W).off('hashchange', self.handler);

});