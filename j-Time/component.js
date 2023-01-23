COMPONENT('time', 'icon:ti ti-clock', function(self, config, cls) {

	var is = true;
	var fn;

	self.make = function() {

		self.aclass(cls);
		self.append((config.icon ? '<i class="{0}"></i>'.format(config.icon) : '') + '<span></span>');

		var span = self.find('span');

		fn = function() {
			if (is) {
				NOW = new Date();
				var format = (config.format || DEF.timeformat || 'HH:mm') + ':ss';
				if (NOW.getSeconds() % 2 === 0)
					format = format.replace(/:/g, ' ');
				span.html(NOW.format(format));
			}
		};

		setInterval(fn, 1000);
		fn();
	};

	self.setter = function(value) {
		is = value === config.if;
		is && fn();
	};
});