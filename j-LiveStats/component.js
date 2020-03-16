COMPONENT('livestats', 'width:500;height:100;axislines:20', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var colors = {};
	var peak = {};
	var paths;

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
		self.append('<svg viewbox="0 0 {1} {2}"><g class="{0}-axis"></g><g class="{0}-paths"></g></svg>'.format(cls, config.width, config.height));
		paths = self.find(cls2 + '-paths');

		var axis = self.find(cls2 + '-axis');
		var axisw = (config.width / config.axislines) >> 0;

		for (var i = 1; i < config.axislines; i++)
			axis.asvg('<line x1="{0}" y1="0" x2="{0}" y2="{1}" />'.format(axisw * i, config.height));
	};

	self.render = function(path, points, max, index) {

		var h = config.height - 12;
		var builder = [];
		var bar = config.width / (config.axislines / 2) >> 0;
		var pp = [];

		pp.push({ x: -20, y: h });

		for (var i = 0; i < 11; i++) {
			var val = points[i] || 0;
			var p = val && max ? Math.round((val / max) * 100) : 0;
			var y = (p ? (h - ((h / 100) * p)) : h) + (index * 2);
			pp.push({ x: (i * bar) + 2, y: y + 12 });
		}

		pp.push({ x: config.width + config.axislines, y: h });

		for (var i = 0; i < (pp.length - 1); i++) {
			var d = diagonal(pp[i].x, pp[i].y, pp[i + 1].x, pp[i + 1].y);
			builder.push(d);
		}

		path.attr('d', builder.join(' '));
	};

	self.setter = function(value) {

		var keys = Object.keys(value);
		var max = 0;
		var bars = (config.axislines / 2) >> 0;

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
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			for (var j = 0; j < peak[key].length; j++) {
				var val = peak[key][j];
				if (max < val)
					max = val;
			}
		}

		// Renders data
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			self.render(cache[key], peak[key], max, i);
		}

	};
});