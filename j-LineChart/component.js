COMPONENT('linechart', 'type:normal;pl:25;pr:0;pt:10;pb:25;prselected:0;limit:0;fill:false;point:5;fillopacity:0.1;offsetX:0;offsetY:10;selected:{{ value | format(0) }};templateY:{{ value | format(0) }};templateX:{{ value }};axisY:true;axisX:true;height:0;width:0;yaxis:4', function(self, config, cls) {

	var svg, g, axis, selected, points, fills, selectedold;
	var templateX, templateY, templateS;

	self.readonly();
	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.empty().append('<svg></svg>');
		svg = self.find('svg');
		axis = svg.asvg('g').attr('class', 'axisy');
		fills = svg.asvg('g').attr('class', 'fills');
		g = svg.asvg('g').attr('class', 'lines');
		points = svg.asvg('g').attr('class', 'points');
		selected = svg.asvg('text').attr('class', 'selected').attr('text-anchor', 'end');

		self.on('resize + resize2', self.resize);

		self.event('click mouseenter', 'circle', function(e) {

			var circle = $(this);
			var index = circle.attrd('index');

			if (index === self.$selectedindex && e.type === 'mouseenter')
				return;

			self.$selectedindex = index;

			var arr = index.split(',');
			var item = self.get()[+arr[0]];
			var value = item.values[+arr[1]];

			selectedold && selectedold.animate({ r: config.point }, 100);
			config.exec && self.SEEX(config.exec, { name: item.name, x: value.x, y: value.y, value: value.y });
			selected.text(templateS({ name: item.name, x: value.x, y: value.y, value: value.y }));

			selectedold = circle.animate({ r: config.point + 3 }, 100);

			if (e.type === 'mouseenter') {
				setTimeout2(self.id, function() {
					selectedold && selectedold.animate({ r: config.point }, 100);
					selectedold = null;
					config.exec && self.SEEX(config.exec, null);
					selected.text('');
				}, 2000);
			} else
				clearTimeout2(self.id);
		});

	};

	self.resize = function() {
		setTimeout2('resize.' + self.id, function() {
			self.refresh();
		}, 500);
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'templateX':
				templateX = Tangular.compile(value);
				break;
			case 'templateY':
				templateY = Tangular.compile(value);
				break;
			case 'selected':
				templateS = Tangular.compile(value);
				break;
			case 'width':
			case 'height':
				setTimeout2(self._id, function() {
					self.refresh();
				}, 100);
				break;
			default:
				!init && self.resize();
				break;
		}
	};

	self.diagonal = function(x1, y1, x2, y2) {
		return 'L' + x1 + ',' + y1 + 'C' + ((x1 + x2 ) / 2) + ',' + y1 + ' ' + ((x1 + x2) / 2) + ',' + y2 + ' ' + x2 + ',' + y2;
	};

	self.released = function(is) {
		!is && setTimeout(self.refresh, 1000);
	};

	self.setter = function(value) {

		if (!self.element[0].offsetParent) {
			setTimeout(function() {
				self.refresh();
			}, 1000);
			return;
		}

		if (!value) {
			g.empty();
			return;
		}

		var maxY = null;
		var minY = null;
		var labels = [];
		var len = value.length;
		var size = value[0].values.length;
		var width = typeof(config.width) === 'string' ? self.parent(config.width).width() : config.width || self.element.width();
		var height = typeof(config.height) === 'string' ? self.parent(config.height).height() : config.height || (width / 100) * 60;
		var barwidth = ((width - config.point - (config.pl + config.pr)) / (size * len)).floor(2);

		for (var i = 0; i < len; i++) {
			var item = value[i];
			labels.push(item.name);
			for (var j = 0; j < item.values.length; j++) {
				var val = item.values[j];
				maxY = maxY == null ? val.y : maxY < val.y ? val.y : maxY;
				minY = minY == null ? val.y : minY > val.y ? val.y : minY;
			}
		}

		if (config.limit)
			maxY = config.limit;

		svg.attr('width', width).attr('height', height);
		selected.attr('transform', 'translate({0},30)'.format(width - config.prselected));
		selectedold = null;

		g.empty();
		axis.empty();
		points.empty();
		fills.empty();

		var T = { value: null };
		var lines = {};

		if (minY < 0) {
			minY = minY * -1;
			maxY += minY;
		} else
			minY = 0;

		lines.height = height - config.pt - config.pb;

		var offsetX = config.pl + config.point;
		var posX = 0;
		var offsetL = 0;
		var data = [];
		var fill = [];
		var prev = [];

		for (var j = 0; j < len; j++) {
			data.push([]);
			fill.push([]);
		}

		for (var i = 0, length = size; i < length; i++) {

			for (var j = 0; j < len; j++) {
				var item = value[j];
				var val = item.values[i];
				var sum = val.y + minY;

				var y = (((sum / maxY) * 100) >> 0);
				var x = posX;
				var h = lines.height.inc('{0}%'.format(y));

				x += offsetX;
				T.value = val.y;

				var r = (config.point / 2);
				var mx = (x + ((barwidth * offsetL) - config.point)).floor(2);
				var my = ((lines.height - h - r) + config.pt).floor(2);

				if (prev[j] && config.type === 'step')
					data[j].push('L{0} {1}'.format(mx, prev[j][1] + r));

				if (config.type === 'curves') {
					if (i)
						data[j].push(self.diagonal(prev[j][0], prev[j][1] + r, mx, my + r));
					else
						data[j].push('M{0} {1}'.format(mx, my + r));
				} else
					data[j].push((i ? 'L' : 'M') + '{0} {1}'.format(mx, my + r));

				if (config.fill) {

					if (prev[j] && config.type === 'step') {
						!i && fill[j].push('M' + mx + ' ' + (lines.height + config.pt));
						fill[j].push('L{0} {1}'.format(mx, prev[j][1]));
					} else if (config.type === 'curves') {
						if (i) {
							fill[j].push(self.diagonal(prev[j][0], prev[j][1], mx, my));
						} else {
							fill[j].push('M' + mx + ' ' + (lines.height + config.pt));
							fill[j].push('L{0} {1}'.format(mx, my));
						}
					} else {
						!i && fill[j].push('M' + mx + ' ' + (lines.height + config.pt));
						fill[j].push('L{0} {1}'.format(mx, my));
					}

					if (i === length - 1)
						fill[j].push('L' + mx + ' ' + (lines.height + config.pt));
				}

				prev[j] = [mx, my];
				points.asvg('circle').attr('cx', mx).attr('cy', my + config.point - r).attr('r', config.point).aclass('point' + (j + 1)).attrd('index', j + ',' + i);
			}

			if (!config.xmod || (i % config.xmod) === 0) {
				T.value = val.x;
				var text = templateX(T);
				var ax = posX + offsetX + (barwidth * offsetL) - config.point;
				config.axisX && axis.asvg('line').attr('x1', ax).attr('x2', ax).attr('y1', 0).attr('y2', height - 25).attr('class', 'axis');
				g.asvg('text').aclass('xlabel').text(text).attr('text-anchor', 'middle').attr('transform', 'translate({0},{1})'.format(ax, height - 6));
			}

			posX += (len * barwidth);
		}

		if (typeof(config.avg) === 'number') {
			var at = 100 - ((config.avg / maxY) * 100);
			var ay = ((lines.height / 100) * at) + config.pt;
			T.value = config.avg;
			axis.asvg('text').aclass('ylabel-avg').attr('transform', 'translate({0},{1})'.format(width - config.pr - config.offsetX, ay - config.offsetY)).text(templateY(T));
			axis.asvg('line').attr('x1', 0).attr('x2', width).attr('y1', ay).attr('y2', ay).attr('class', 'axis-avg');
		}

		for (var j = 0; j < len; j++)
			g.asvg('path').attr('d', data[j].join(' ')).aclass('line' + (j + 1));

		// Y axis
		var yaxis = config.yaxis;
		var m = 100 / yaxis;

		for (var i = yaxis; i > 0; i--) {
			var val = i * m;
			var y = ((lines.height / 100) * val) + config.pt;
			config.axisY && axis.asvg('line').attr('x1', 0).attr('x2', width).attr('y1', y).attr('y2', y).attr('class', 'axis');
		}

		for (var i = yaxis; i > 0; i--) {
			var val = i * m;
			var y = ((lines.height / 100) * val) + config.pt;
			T.value = ((maxY / 100) * (100 - val)) - minY;
			axis.asvg('text').aclass('ylabel').attr('transform', 'translate({0},{1})'.format(config.offsetX, y - config.offsetY)).text(templateY(T));
		}

		if (config.fill) {
			for (var j = 0; j < len; j++)
				fills.asvg('path').attr('d', fill[j].join(' ') + ' Z').aclass('line' + (j + 1) + 'fill').attr('opacity', config.fillopacity);
		}

		selected.text('');
	};
});