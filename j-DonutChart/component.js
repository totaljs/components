COMPONENT('donutchart', 'format:{{ value | format(0) }};tooltip:true;presentation:true', function(self, config) {

	var svg, g, selected, tooltip;
	var strokew = 0;
	var animate = true;
	var indexer = 0;
	var indexerskip = false;
	var W = $(window);

	self.readonly();
	self.make = function() {
		self.aclass('ui-donutchart');
		self.append('<div class="ui-donutchart-tooltip"></div><svg></svg>');
		svg = self.find('svg');
		g = svg.asvg('g').attr('class', 'pieces');
		tooltip = self.find('.ui-donutchart-tooltip');

		W.on('resize', self.resize);

		self.element.on('mouseenter touchstart', '.piece', function() {
			if (config.tooltip) {
				self.select(+this.getAttribute('data-index'));
				!indexerskip && config.presentation && setTimeout2(self.id + '.skip', self.next, 30000);
				indexerskip = true;
			}
		});
	};

	self.select = function(index) {
		var item = self.get()[index];
		if (item === selected)
			return;
		self.find('.selected').rclass('selected').css('stroke-width', strokew);
		selected = item;
		var w = self.element.width();
		var el = self.find('.piece' + (index + 1));
		tooltip.css('font-size', w / 15);
		tooltip.html('<b>' + item.name + '</b><br />' + Tangular.render(config.format, item));
		el.css('stroke-width', strokew.inc('-15%')).aclass('selected');
		indexer = index;
	};

	self.destroy = function() {
		W.off('resize', self.resize);
	};

	self.resize = function() {
		setTimeout2('resize.' + self.id, function() {
			animate = false;
			self.refresh();
		}, 100);
	};

	self.next = function() {

		if (self.removed)
			return;

		if (indexerskip) {
			indexerskip = false;
			return;
		}

		indexer++;

		if (!self.get()[indexer])
			indexer = 0;

		self.select(indexer);
		setTimeout2(self.id + '.next', self.next, 2000);
	};

	function arcradius(centerX, centerY, radius, degrees) {
		var radians = (degrees - 90) * Math.PI / 180.0;
		return { x: centerX + (radius * Math.cos(radians)), y: centerY + (radius * Math.sin(radians)) };
	}

	function arc(x, y, radius, startAngle, endAngle){
		var start = arcradius(x, y, radius, endAngle);
		var end = arcradius(x, y, radius, startAngle);
		var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
		var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
		return d;
	}

	self.setter = function(value) {

		if (!value) {
			g.empty();
			return;
		}

		var sum = null;

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];
			sum = (sum ? sum + item.value : item.value);
		}

		var count = 0;
		var beg = 0;
		var end = 0;
		var items = [];

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];
			var p = ((item.value / sum) * 100).floor(2);

			count += p;

			if (i === length - 1 && count < 100)
				p = p + (100 - count);

			end = beg + ((360 / 100) * p);
			items.push({ name: item.name, percentage: p, beg: beg, end: end });
			beg = end;
		}

		var size = self.element.width();
		var half = size / 2;
		var midpoint = size / 2.4;

		strokew = size / 6 >> 0;

		svg.attr('width', size);
		svg.attr('height', size);
		g.empty();

		var pieces = [];

		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];
			if (item.end === 360)
				item.end = 359.99;
			pieces.push(g.asvg('path').attr('data-index', i).attr('data-beg', item.beg).attr('data-end', item.end).attr('stroke-width', strokew).attr('class', 'piece piece' + (i + 1)).attr('d', arc(half, half, midpoint, item.beg, animate ? item.beg : item.end)));
		}

		animate && pieces.waitFor(function(item, next) {
			var beg = +item.attrd('beg');
			var end = +item.attrd('end');
			var diff = end - beg;

			item.animate({ end: diff }, { duration: 180, step: function(fx) {
				item.attr('d', arc(half, half, midpoint, beg, beg + fx));
			}, complete: function() {
				next();
			}});
		});

		selected = null;
		animate = true;

		if (config.tooltip) {
			self.select(0);
			if (config.presentation) {
				indexerskip = false;
				setTimeout(self.next, 4000);
			}
		}
	};
});