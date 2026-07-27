COMPONENT('hashchange', function(self, config) {

	let prev = null;
	let isready = false;

	self.singleton();
	self.readonly();

	self.ee = function() {
		EMIT('hash', prev);
	};

	self.handler = function() {

		if (!isready)
			return;

		let hash = location.hash.substring(1);
		if (prev !== hash) {
			prev = hash;
			if (config.delay)
				setTimeout2(self.ID, self.ee, config.delay);
			else
				self.ee();
		}
	};

	self.on('location', function() {
		let hash = location.hash;
		if (hash !== prev)
			self.handler();
	});

	self.make = function() {
		$(W).on('hashchange', self.handler);
		if (config.middleware) {
			MIDDLEWARE(config.middleware.split(',').trim(), function() {
				isready = true;
				self.handler();
			});
		} else {
			isready = true;
			self.on('ready', self.handler);
		}
	};

	self.destroy = () => $(W).off('hashchange', self.handler);

});