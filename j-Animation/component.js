COMPONENT('animation', 'style:2;delay:500;init:1000;cleaner:1000;visible:0;offset:50', function(self, config, cls) {

	self.readonly();
	self.blind();

	self.destroy = function() {
		self.visibleinterval && clearInterval(self.interval);
	};

	self.make = function() {
		if (config.visible) {
			self.visibleinterval = setInterval(function() {
				if (VISIBLE(self.dom, config.offset)) {
					self.visibleinterval = null;
					clearInterval(self.visibleinterval);
					self.animate();
				}
			}, 500);
		} else
			setTimeout(self.animate, config.init);
	};

	self.animate = function() {

		var clsname = cls + '-' + config.style;
		var el = self.find('.animation');

		if (!config.together) {
			el.each(function() {
				var el = $(this);
				var opt = (el.attrd('animation') || '').parseConfig();
				this.$animopt = opt;
				el.aclass(cls + '-' + (opt.style || config.style) + '-init');
			});
		}

		setTimeout(function() {

			if (self.removed)
				return;

			setTimeout(function(el) {
				if (!self.removed)
					el.rclass2(clsname);
			}, config.cleaner * el.length, el);

			var counter = 0;

			if (config.together) {

				el.rclass('animation').aclass(clsname + '-run');

				config.exec && setTimeout(function() {
					self.EXEC(config.exec, self.element);
				}, 1500);

				return;
			}

			el.each(function(index) {

				var el = $(this);
				var opt = this.$animopt;
				var delay = (opt.order || index) * (opt.delay || config.delay);
				var clsname = cls + '-' + (opt.style || config.style);

				if (counter < delay)
					counter = delay;

				setTimeout(function(el) {
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + clsname + '-init');
						else
							el.rclass('animation').aclass(clsname + '-run');
					}
				}, delay, el);
			});

			config.exec && setTimeout(function() {
				self.EXEC(config.exec, self.element);
			}, (counter || 500) + 1000);

		}, config.init / 10 >> 0);
	};

});