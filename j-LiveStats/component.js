COMPONENT('livestats', 'width:500;height:100;axislines:20;max:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var colors = {};
	var peak = {};
	var paths;
	var cachedsize;
	var cachedwidth;
	var cachedheight;
	var cachedlines;

	self.readonly();

	function diagonal(x1, y1, x2, y2) {
		return 'M' + x1 + ',' + y1 + 'C' + (x1 && x2 ? ((x1 + x2 ) / 2) : 0) + ',' + y1 + ' ' + (x1 && x2 ? ((x1 + x2) / 2) : 0) + ',' + y2 + ' ' + x2 + ',' + y2;
	}

	self.color = function(value) {
		var hash = HASH(value, true);
		var color = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			color += ('00' + value.toString(16)).substr(-2);
		}
		return color;
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'colors':
				var tmp = value.split(',').trim();
				for (var i = 0; i < tmp.length; i++) {
					var kv = tmp[i].split('=').trim();
					colors[kv[0]] = kv[1];
				}
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		self.append('<svg><g class="{0}-axis"></g><g class="{0}-paths"></g></svg>'.format(cls));
		paths = self.find(cls2 + '-paths');
		self.resizeforce();
		self.on('resize + resize2', self.resize);
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		var width = typeof(config.width) === 'string' ? self.parent(config.width).width() : config.width || self.element.width();
		var height = typeof(config.height) === 'string' ? self.parent(config.height).height() : config.height || self.element.height();
		var tmp = width + 'x' + height;

		if (tmp === cachedsize)
			return;

		if (config.marginW)
			width -= config.marginW;

		if (config.marginH)
			height -= config.marginH;

		cachedwidth = width;
		cachedheight = height;
		cachedsize = tmp;
		self.find('svg').attr('viewBox', '0 0 ' + width + ' ' + height);

		cachedlines = config.axislines === 'auto' ? Math.ceil(width / 20) : config.axislines;

		var axisw = (width / cachedlines) >> 0;
		var axis = self.find(cls2 + '-axis');

		if (axis[0].children.length)
			axis.empty();

		for (var i = 1; i < cachedlines; i++)
			axis.asvg('<line x1="{0}" y1="0" x2="{0}" y2="{1}"></line>'.format(axisw * i, height));

	};

	self.render = function(path, points, max, index) {

		var h = cachedheight - 12;
		var builder = [];
		var bar = Math.ceil(cachedwidth / (cachedlines / 2));
		var pp = [];

		pp.push({ x: -20, y: h });

		for (var i = 0; i < 10; i++) {
			var val = points[i] || 0;
			var p = val && max ? Math.round((val / max) * 100) : 0;
			var y = (p ? (h - ((h / 100) * p)) : h) + (index * 2);
			pp.push({ x: (i * bar) + 2, y: y + 12 });
		}

		pp.push({ x: cachedwidth + cachedlines, y: pp.last().y });

		for (var i = 0; i < (pp.length - 1); i++) {
			var d = diagonal(pp[i].x, pp[i].y, pp[i + 1].x, pp[i + 1].y);
			builder.push(d);
		}

		path.attr('d', builder.join(' '));
	};

	self.setter = function(value) {

		if (!value)
			return;

		var keys = Object.keys(value);
		var max = config.max;
		var bars = (cachedlines / 2) >> 0;

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var val = value[keys[i]];

			if (!cache[key]) {
				peak[key] = [];

				for (var j = 0; j < bars; j++)
					peak[key].push(0);

				paths.asvg('<path stroke="{0}" data-id="{1}" />'.format(colors[key] || self.color(key), key));
				cache[key] = paths.find('[data-id="{0}"]'.format(key));
			}

			peak[key].shift();
			peak[key].push(val || 0);
		}

		// Finds max
		if (!max) {
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				for (var j = 0; j < peak[key].length; j++) {
					var val = peak[key][j];
					if (max < val)
						max = val;
				}
			}
		}

		// Renders data
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			self.render(cache[key], peak[key], max, i);
		}

	};
});