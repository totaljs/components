COMPONENT('listdetail', 'resize:1;width:35%;parent:auto;margin:0;maxwidth:50%;minwidth:20%', function(self, config, cls) {

	var a, b, temp, init, resizer, is = false;
	var cls2 = '.' + cls;
	var events = {};

	self.readonly();

	self.make = function() {

		var arr = self.find('> section');
		a = $(arr[0]);
		b = $(arr[1]);
		a.aclass(cls + '-list');
		b.aclass(cls + '-detail');
		self.element.prepend('<div class="{0}-resizer"></div>'.format(cls));
		self.aclass(cls);
		temp = $('<div />');
		temp.aclass(cls + '-temporary');
		self.resize();
		self.on('resize + resize2', self.resize);
		resizer = self.find(cls2 + '-resizer');

		events.move = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var tmp = events.touches ? e.touches[0] : e;
			var x = events.x - tmp.pageX;
			resizer.css('left', events.left - x);
		};

		events.up = function() {
			var parent = self.parent(config.parent);
			var w = parent.width();
			var left = w - resizer.position().left;

			if (left < config.minwidth)
				left = config.minwidth;

			if (left > config.maxwidth)
				left = config.maxwidth;

			config.width = left;
			a.css('margin-right', left);
			b.css('width', left);
			events.unbind();
			self.resizeforce();
		};

		events.bind = function() {
			if (!events.is) {
				events.is = true;
				self.aclass(cls + '-resizing');
				$(W).on('mousemove touchmove', events.move).on('mouseup touchend', events.up);
			}
		};

		events.unbind = function() {
			if (events.is) {
				events.is = false;
				self.rclass(cls + '-resizing');
				$(W).off('mousemove touchmove', events.move).off('mouseup touchend', events.up);
			}
		};

		self.event('mousedown touchstart', cls2 + '-resizer', function(e) {

			if (!config.resize)
				return;

			events.touches = e.type === 'touchstart' ? 1 : 0;
			var tmp = events.touches ? e.touches[0] : e;
			events.x = tmp.pageX;
			events.left = resizer.position().left;
			events.bind();
			e.preventDefault();
			e.stopPropagation();
		});

	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 200);
	};

	self.resizeforce = function() {

		var parent = self.parent(config.parent);
		var h = parent.height() - config.margin;
		var w = parent.width();

		if (typeof(config.width) === 'string')
			config.width = w.inc(config.width) >> 0;

		if (typeof(config.minwidth) === 'string')
			config.minwidth = w.inc(config.minwidth) >> 0;

		if (typeof(config.maxwidth) === 'string')
			config.maxwidth = w.inc(config.maxwidth) >> 0;

		var css = {};
		css.width = config.width;
		css.height = h;
		b.css(css);
		css.height = h;
		css.left = is ? (w - config.width) : '-1px';
		css.width = '';
		resizer.css(css);
		css.left = '';
		css['margin-right'] = is ? config.width : '';
		a.css(css);
		is && b.SETTER('*/resize');
		a.SETTER('*/resize');

		if (!init) {
			init = true;
			self.rclass('hidden invisible');
		}

	};

	self.toggle = function(show) {

		if (show === is)
			return;

		is = show;

		if (is)
			self.dom.insertBefore(b[0], a[0]);
		else
			temp[0].appendChild(b[0]);

		self.tclass(cls + '-visible', is);
		self.resizeforce();
	};

	self.setter = function(value) {
		self.toggle(!!value);
	};

});