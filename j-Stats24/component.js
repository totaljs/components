COMPONENT('stats24', 'height:120;tooltiplarge:0;tooltip:1;tooltiptext:{0};border:1;highlight:0', function(self, config, cls) {

	var old = '';
	var bars = [];
	var binded = false;
	var cls2 = '.' + cls;
	var smallsize = false;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		var builder = [];
		for (var i = 0; i < 24; i++)
			builder.push('<div class="{0}-bar"><div><span></span></div><span>{1}</span></div>'.format(cls, i));

		self.append('<div class="{0}-body"><div class="{0}-container hidden">{1}</div></div>'.format(cls, builder.join('')));
		self.find(cls2 + '-bar').each(function() {
			bars.push($(this).find('div').eq(0));
		});

		self.event('mouseenter touchstart', cls2 + '-bar', function() {
			if ((smallsize && config.tooltip) || (!smallsize && config.tooltiplarge && config.tooltip)) {
				var opt = {};
				var val = self.get();
				opt.element = $(this);
				var index = opt.element.index();
				var toindex = index + 1;
				if (toindex === 24)
					toindex = 0;
				opt.html = '<b>' + config.tooltiptext.format(val[index] || 0).format(0) + '</b><br /><i class="far fa-clock"></i> ' + index.padLeft(2, '0') + ':00 - ' + (toindex).padLeft(2, '0') + ':00';
				opt.align = 'bottom';
				opt.timeout = 2000;
				SETTER('tooltip', 'show', opt);
			}
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

		var current = NOW.getHours();

		self.width(function(width) {

			old = sum;
			var max = config.max;

			smallsize = width < 400;
			self.tclass(cls + '-smallsize', smallsize);

			if (!max) {
				max = 0;
				for (var i = 0; i < 24; i++) {
					if (value[i] > max)
						max = value[i];
				}
			}

			for (var i = 0; i < 24; i++) {

				var num = value[i];

				if (num > max)
					num = max;

				var p = (num / max) * 100;

				if (isNaN(p))
					p = 0;

				var h = ((config.height / 100) * p) - (smallsize ? 2 : 17);
				if (h < 18)
					h = 18;

				if (smallsize && h === 18)
					h = 5;

				var val = value[i];
				if (val > 1000)
					val = (val / 1000).floor(1) + ' K';

				bars[i].css('height', (h >> 0) + 'px').tclass('online', value[i] > 0).find('span').html(smallsize ? '' : val);
				config.highlight && bars[i].tclass('now', i === current);
			}
		});
	};
});