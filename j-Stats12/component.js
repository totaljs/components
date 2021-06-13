COMPONENT('stats12', 'height:120;border:1;highlight:0', function(self, config, cls) {

	var old = '';
	var months = [];
	var bars = [];
	var binded = false;
	var cls2 = '.' + cls;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		for (var i = 0; i < 12; i++) {
			var month = {};
			month.pos = i;
			month.index = i;
			month.name = MONTHS[i].substring(0, 3);
			months.push(month);
		}


		var builder = [];
		for (var i = 0; i < 12; i++)
			builder.push('<div class="{0}-bar"><div><span></span></div><span>{1}</span></div>'.format(cls, months[i].name));

		self.append('<div class="{0}-body"><div class="{0}-container hidden">{1}</div></div>'.format(cls, builder.join('')));
		self.find(cls2 + '-bar').each(function() {
			bars.push($(this).find('div').eq(0));
		});
	};

	self.configure = function(key, value) {
		if (key === 'border')
			self.tclass(cls + '-border', !!value);
	};

	self.setter = function(value) {

		var sum = value ? value.join(',') : '';
		if (sum === old)
			return;

		var container = self.find(cls2 + '-container');

		if (!binded) {
			container.rclass('hidden');
			binded = true;
		}

		container.css('height', config.height);

		var current = NOW.getMonth();
		var max = config.max;

		old = sum;

		if (!max) {
			max = 0;
			for (var i = 0; i < 12; i++) {
				if (value[i] > max)
					max = value[i];
			}
		}

		for (var i = 0; i < 12; i++) {

			var num = value[i];

			if (num > max)
				num = max;

			var p = (num / max) * 100;

			if (isNaN(p))
				p = 0;

			var h = ((config.height / 100) * p) - 17;
			if (h < 18)
				h = 18;

			var val = value[i];
			if (val > 1000)
				val = (val / 1000).floor(1) + ' K';

			var month = months[i];

			bars[i].css('height', (h >> 0) + 'px').tclass('online', value[i] > 0).find('span').html(val);
			config.highlight && bars[i].tclass('now', i === current);
		}
	};
});