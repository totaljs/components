COMPONENT('statsbarsimple', 'tooltip:1;animate:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var templatetooltip;
	var sum;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.find('script').each(function(index) {
			var ta =  Tangular.compile(this.innerHTML);
			if (index)
				templatetooltip = ta;
			else
				self.template = ta;
		});


		self.aclass(cls);
		self.append('<div class="{0}-table"></div>'.format(cls));

		templatetooltip && config.tooltip && self.event('mouseenter touchstart', cls2 + '-bar', function() {
			var opt = {};
			opt.element = $(this);
			var index = +opt.element.attrd('index');
			var val = self.get()[index];
			opt.html = templatetooltip(val);
			opt.align = 'bottom';
			opt.timeout = 2000;
			SETTER('tooltip', 'show', opt);
		});
	};

	self.setter = function(value) {

		sum = 0;
		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			sum += item.value;
		}

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			var p = ((item.value / sum) * 100).floor(1);
			item.percentage = p;
			builder.push(('<div style="width:' + (config.animate ? '100%' : '{0}') + ';background-color:{3}" class="{0}-bar" data-index="{4}" data-percentage="{2}"><span>{1}</span></div>').format(cls, self.template(item).trim(), p, item.color, i));
		}

		self.find(cls2 + '-table').html(builder.join(''));

		var bars = self.find(cls2 + '-bar');

		if (config.animate) {
			bars.each(function(index) {
				var el = $(this);
				setTimeout(function(el) {
					el.animate({ width: +el.attrd('percentage') + '%' }, 200).aclass(cls + '-show');
				}, index * 100, el);
			});
		} else
			bars.aclass(cls + '-show');
	};
});