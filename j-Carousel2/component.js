COMPONENT('carousel2', 'count:1;selector:figure;margin:10;snapping:true;animate:0;delay:2000', function(self, config, cls) {

	var cls2 = '.' + cls;
	var width = 0;
	var margin = 0;
	var count = 0;
	var index = 0;
	var increment = 1;
	var skip = false;
	var move = false;
	var anim;
	var container;
	var old;
	var drag = {};
	var ready = false;
	var treset;

	self.readonly();
	self.blind();

	self.destroy = function() {
		if (anim) {
			clearTimeout(anim);
			anim = null;
		}
	};

	self.make = function() {

		self.aclass(cls + ' invisible');
		self.element.wrapInner('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		self.on('resize2', self.resize);
		setTimeout(self.resizeforce, 50);
		setTimeout(self.resizeforce, 500);
		setTimeout(self.resizeforce, 2000);
		container = self.find(cls2 + '-container');

		drag.tmove = function() {
			if (anim) {
				clearTimeout(anim);
				anim = null;
			}
			container.off('touchmove', drag.tmove);
		};

		config.snapping && container.on('scroll', function() {
			!skip && setTimeout2(self.id, self.snap, 300);
		}).on('touchmove', drag.tmove);

		drag.mmove = function(e) {
			var offset = (drag.x - e.pageX) / 2;
			if (Math.abs(offset) > 30) {
				var plus = (config.snapping ? ((width / 100) * 80) : width) + config.margin;
				if (offset > 0)
					offset = plus;
				else
					offset = -plus;
				container.stop().animate({ scrollLeft: container[0].scrollLeft + offset }, 300);
				drag.mup();
			}
		};

		drag.mup = function() {
			self.element.off('mouseup', drag.mup).off('mousemove', drag.mmove);
			if (anim) {
				clearTimeout(anim);
				anim = null;
				container.on('touchmove', drag.tmove);
			}
		};

		self.element.on('mousedown', function(e) {
			drag.x = e.pageX;
			self.element.on('mousemove', drag.mmove).on('mouseup', drag.mup);
			e.preventDefault();
		});

		config.animate && (anim = setTimeout(self.animate, config.animate));
		self.event('resize + resize2', self.resize);
	};

	var reset = function() {
		skip = false;
		anim = null;
		treset = null;
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
		anim = null;

		container.animate({ scrollLeft: index * (width + config.margin) }, 200);
		treset && clearTimeout(treset);
		treset = setTimeout(reset, 400);
		anim = setTimeout(self.animate, config.delay);
	};

	var reset2 = function() {
		skip = false;
		treset = null;
	};

	self.snap = function() {
		var x = container[0].scrollLeft;
		var off = Math.round(x / (width + config.margin));
		skip = true;
		move = true;
		container.stop().animate({ scrollLeft: off * (width + margin) }, 200);
		treset && clearTimeout(treset);
		treset = setTimeout(reset2, 400);
	};

	self.resize = function() {
		setTimeout2(self.ID + 'resize', self.resizeforce, 200);
	};

	self.resizeforce = function() {

		if (!self.element)
			return;

		var w = self.element.width();
		if (!w) {
			self.element && setTimeout(self.resize, 100);
			return;
		}

		var sum = 0;
		var height = 0;

		width = w / config.count;
		margin = config.margin / config.count;
		count = 0;

		var arr = self.find(config.selector);

		arr.each(function() {
			var el = $(this);
			height = Math.max(el.innerHeight(), height);
			var css = {};
			sum += width + config.margin;
			css.width = width - (config.margin - margin);
			css['margin-right'] = config.margin;
			el.css(css);
			count++;
		});

		var k = sum + 'x' + height;

		if (old === k)
			return;

		old = k;
		container.css('height', height + 40);
		self.css('height', (height >> 0) + 2);
		self.find(cls2 + '-body').css('width', sum);

		if (!ready) {
			self.rclass('invisible hidden');
			ready = true;
		}

	};
});