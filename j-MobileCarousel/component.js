COMPONENT('mobilecarousel', 'count:1;selector:.col-sm-4;margin:15;snapping:true;animate:5000', function(self, config, cls) {

	var cls2 = '.' + cls;
	var width = 0;
	var count = 0;
	var index = 0;
	var increment = 1;
	var skip = false;
	var move = false;
	var anim;
	var container;
	var old;

	self.readonly();
	self.blind();

	self.make = function() {
		self.element.wrapInner('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		self.on('resize2', self.resize);
		setTimeout(self.resize, 50);
		setTimeout(self.resize, 500);
		setTimeout(self.resize, 2000);

		// v20 STYLE(), v19 CSS()
		(W.STYLE?W.STYLE:W.CSS)('.{3} .{3}-{0} {1}{margin:0 0 0 {2}px;padding:0;float:left;vertical-align:top;display:inline-block}.{3} .{3}-{0} {1}:first-child{margin-left:0}'.format(self.id, config.selector, config.margin, cls));

		container = self.find(cls2 + '-container').aclass(cls + '-' + self.id);
		config.snapping && container.on('scroll', function() {
			!skip && setTimeout2(self.id, self.snap, 200);
		}).on('touchmove', function() {
			clearTimeout(anim);
		});
		config.animate && (anim = setTimeout(self.animate, config.animate));
	};

	self.animate = function() {

		if (!count || move)
			return;

		index += increment;

		if (index === count - 1)
			increment = -1;
		else if (index === 0)
			increment = 1;

		skip = true;
		anim = true;
		container.animate({ scrollLeft: index * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
			anim = false;
		}, 400);

		anim = setTimeout(self.animate, 2000);
	};

	self.snap = function() {
		var x = container[0].scrollLeft;
		var off = Math.round(x / width);
		skip = true;
		move = true;
		container.stop().animate({ scrollLeft: off * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
		}, 500);
	};

	self.resize = function() {

		if (WIDTH() !== 'xs') {

			if (old === '1')
				return;

			old = '1';
			count = 0;
			width = 0;
			self.rclass(cls);
			self.css('height', '');
			self.find(cls2 + '-body').css('width', '');
			self.find(config.selector).css('width', '');
			return;
		}

		self.aclass(cls);

		self.width(function(w) {

			var sum = 0;
			var height = 0;

			width = w / config.count;
			count = 0;

			self.find(config.selector).each(function(index) {
				var el = $(this);
				sum += width + (index ? 15 : 0);
				height = Math.max(el.innerHeight(), height);
				el.css('width', width);
				count++;
			});

			var k = sum + 'x' + height;
			if (old === k)
				return;

			old = k;
			self.css('height', (height >> 0) + 15);
			self.find(cls2 + '-body').css('width', sum);
		});
	};
});