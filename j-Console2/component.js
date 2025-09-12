COMPONENT('console2', 'icon:ti ti-script;name:Console;clear:1;autoclose:1;autoshow:1;height:150', function(self, config, cls) {

	var cls2 = '.' + cls;
	var elogs, clearbtn;
	var ready = false;

	self.singleton();
	self.readonly();

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append(('<div class="{0}-body"><div class="{0}-tabs"><span class="{0}-close"><i class="ti ti-times"></i></span>' + (config.clear ? '<span class="{0}-clear hidden"><i class="ti ti-trash"></i></span>' : '') + '<div><span><i class="{2}"></i>{1}</span></div></div><div class="{0}-output" style="height:{3}px"></div></div>').format(cls, config.name, config.icon, config.height));

		elogs = self.find(cls2 + '-output');
		clearbtn = self.find(cls2 + '-clear');

		self.event('click', cls2 + '-clear', function() {
			SET(self.makepath(config.datasource), []);
			config.autoclose && self.set(false);
			if (typeof(config.clear) === 'string')
				self.EXEC(config.clear);
		});

		self.event('click', cls2 + '-close', function() {
			self.set(false);
		});

		self.on('resize2 + resize', self.resize);
		self.resize();
	};

	self.resize = function() {
		elogs.css('width', WW + 30);
	};

	self.rebind = function(path, value) {

		let arr = (M.is20 ? path : value) || EMPTYARRAY;
		let builder = [];

		for (let item of arr) {
			let type = item.type || 'info';
			let icon = type === 'error' ? 'bug' : type === 'warning' ? type : type === 'success' ? 'check-circle' : 'info-circle';
			builder.push('<div class="{0}-message {0}-{2}"><i class="ti ti-{3}"></i>{1}</div>'.format(cls, item.body || item.html, type, icon));
		}

		elogs.html(builder.join(''));
		elogs[0].scrollTop = 0;
		clearbtn.tclass('hidden', !builder.length);

		if (config.autoshow && !self.get() && builder.length)
			self.set(true);
	};

	self.configure = function(key, value) {
		if (key === 'datasource')
			self.datasource(value, self.rebind);
	};

	self.setter = function(value) {
		if (value) {
			self.rclass('hidden');
			self.aclass(cls + '-visible', 100);
		} else {
			self.rclass('hidden', 100);
			self.rclass(cls + '-visible');
		}
	};
});