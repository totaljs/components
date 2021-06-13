COMPONENT('stats7', 'height:120;border:1;highlight:0;firstday:0', function(self, config, cls) {

	var old = '';
	var days = [];
	var days2 = {};
	var bars = [];
	var binded = false;
	var cls2 = '.' + cls;
	var smallsize = false;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		var index = config.firstday;

		for (var i = 0; i < 7; i++) {
			var day = {};
			day.pos = i;
			day.index = index;
			day.name = DAYS[index].substring(0, 2).toUpperCase();
			days.push(day);
			days2[i] = day;

			index++;

			if (index > 6)
				index = 0;
		}


		var builder = [];
		for (var i = 0; i < 7; i++)
			builder.push('<div class="{0}-bar"><div><span></span></div><span>{1}</span></div>'.format(cls, days[i].name));

		self.append('<div class="ui-stats7-body"><div class="{0}-container hidden">{1}</div></div>'.format(cls, builder.join('')));
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

		var current = days.findItem('index', NOW.getDay()).pos;
		old = sum;
		var max = config.max;

		if (!max) {
			max = 0;
			for (var i = 0; i < 7; i++) {
				if (value[i] > max)
					max = value[i];
			}
		}

		for (var i = 0; i < 7; i++) {

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

			var day = days2[i];

			bars[day.index].css('height', (h >> 0) + 'px').tclass('online', value[i] > 0).find('span').html(smallsize ? '' : val);
			config.highlight && bars[day.index].tclass('now', day.index === current);
		}
	};
});