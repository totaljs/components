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
		var el = self.find('.animation').aclass(clsname + '-init');

		setTimeout(function() {

			if (self.removed)
				return;

			setTimeout(function(el) {

				if (self.removed)
					return;

				el.rclass2(clsname);
			}, config.cleaner * el.length, el);

			if (config.together) {
				el.rclass('animation').aclass(clsname + '-run');
				return;
			}

			el.each(function(index) {
				var el = $(this);
				var opt = (el.attrd('animation') || '').parseConfig();
				setTimeout(function(el) {

					if (self.removed)
						return;

					if (opt.noanimation)
						el.rclass('animation ' + clsname + '-init');
					else
						el.rclass('animation').aclass(clsname + '-run');

				}, (opt.order || index) * (opt.delay || config.delay), el);
			});

		}, config.init / 10 >> 0);
	};

});