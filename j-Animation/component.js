COMPONENT('animation', 'style:2;delay:200;init:1000;cleaner:1000;visible:0;offset:50', function(self, config, cls) {

	self.readonly();

	if (!config.if)
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
			setTimeout2(self.ID, self.animate, config.init);

		config.datasource && self.datasource(config.datasource, function() {
			setTimeout2(self.ID, self.animate, config.init);
		});
	};

	self.restore = function() {
		self.find('.animated').aclass('animation').rclass('animated');
	};

	self.animate = function() {

		var el = self.find('.animation');
		var arr = [];

		for (var i = 0; i < el.length; i++) {

			var t = el[i];

			if (!t.$anim) {
				var $t = $(t);

				if (!t.$animopt) {
					var opt = ($t.attrd('animation') || '').parseConfig();
					t.$animopt = opt;
				}

				t.$anim = cls + '-' + (t.$animopt.style || config.style);
				$t.aclass(t.$anim + '-init animating');
				arr.push($t);
			}
		}

		if (!arr.length)
			return;

		setTimeout(function(arr) {

			if (self.removed)
				return;

			var maxdelay = 500;

			if (config.together) {

				for (var i = 0; i < arr.length; i++) {
					var el = arr[i];
					var c = el[0].$anim;
					var opt = el[0].$animopt;
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + c + '-init');
						else
							el.rclass('animation').aclass(c + '-run');
					}
				}

				setTimeout(function() {
					if (!self.removed) {
						for (var i = 0; i < arr.length; i++) {
							var c = arr[i][0].$anim;
							arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
							delete arr[i][0].$anim;
						}
						config.exec && self.EXEC(config.exec, self.element);
					}
				}, 1500);

				return;
			}

			arr.wait(function(el, next, index) {

				var opt = el[0].$animopt;
				var delay = (opt.order || index) * (opt.delay || config.delay);
				var clsname = cls + '-' + (opt.style || config.style);

				if (maxdelay < delay)
					maxdelay = delay;

				if (el.hclass('hidden') || el.hclass('invisible')) {
					el.rclass('animation ' + clsname + '-init').aclass('animated');
					next();
					return;
				}

				el[0].$animtime = setTimeout(function(el) {
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + clsname + '-init');
						else
							el.rclass('animation').aclass(clsname + '-run');
					}
				}, delay, el);

				next();

			}, function() {

				setTimeout(function() {
					for (var i = 0; i < arr.length; i++) {
						var c = arr[i][0].$anim;
						arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
						delete arr[i][0].$anim;
					}
					config.exec && self.EXEC(config.exec, self.element);
				}, maxdelay + 1000);
			});

		}, config.init / 10 >> 0, arr);
	};

	self.setter = function(value) {
		if (config.if) {
			if (value === config.if)
				setTimeout2(self.ID, self.animate, config.init);
			else
				self.restore();
		}
	};

});