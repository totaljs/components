COMPONENT('animation', 'style:2;delay:500;init:1000;cleaner:1000', function(self, config, cls) {

	self.readonly();
	self.blind();

	self.make = function() {
		setTimeout(self.animate, config.init);
	};

	self.animate = function() {

		var clsname = cls + '-' + config.style;
		var el = self.find('.animation').aclass(clsname + '-init');

		setTimeout(function() {

			setTimeout(function(el) {
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
					if (opt.noanimation)
						el.rclass('animation ' + clsname + '-init');
					else
						el.rclass('animation').aclass(clsname + '-run');

				}, (opt.order || index) * (opt.delay || config.delay), el);
			});

		}, config.init / 10 >> 0);
	};

});