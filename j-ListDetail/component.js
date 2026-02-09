COMPONENT('listdetail', 'resize:1;width:35%;parent:auto;margin:0;maxwidth:50%;minwidth:20%;position:vertical', function(self, config, cls) {

	var a, b, temp, init, resizer, is = false;
	var cls2 = '.' + cls;
	var events = {};

	self.readonly();

	var normalizeposition = function() {
		if (config.position)
			config.position = ('' + config.position).trim().toLowerCase();
		else
			config.position = 'vertical';

		if (config.position !== 'horizontal' && config.position !== 'vertical')
			config.position = 'vertical';
	};

	var isstacked = function() {
		return config.position === 'horizontal';
	};

	var useheight = function() {
		return config.height != null || config.minheight != null || config.maxheight != null;
	};

	var parsevalue = function(val, total) {
		if (val == null)
			return 0;
		if (typeof(val) === 'number')
			return val;

		var str = ('' + val).trim();
		if (!str)
			return 0;

		if (str[str.length - 1] === '%')
			return ((total / 100) * parseFloat(str)) >> 0;

		if (str.endsWith('px'))
			return parseFloat(str) >> 0;

		if (str[0] === '+' || str[0] === '-')
			return (total + parseFloat(str)) >> 0;

		return parseFloat(str) >> 0;
	};

	var clamp = function(val, min, max) {
		if (min && val < min)
			val = min;
		if (max && val > max)
			val = max;
		return val;
	};

	var setclasses = function(stacked) {
		self.tclass(cls + '-horizontal', stacked);
		self.tclass(cls + '-vertical', stacked);
	};

	var getkeys = function(stacked) {
		var byheight = stacked && useheight();
		return byheight ? { key: 'height', min: 'minheight', max: 'maxheight' } : { key: 'width', min: 'minwidth', max: 'maxwidth' };
	};

	var getsize = function(stacked, total, raw) {
		var keys = getkeys(stacked);
		var size = raw == null ? parsevalue(config[keys.key], total) : raw;
		var min = parsevalue(config[keys.min], total);
		var max = parsevalue(config[keys.max], total);

		size = clamp(size, min, max);
		if (size > total)
			size = total;

		return { key: keys.key, size: size };
	};

	var applylayout = function(stacked, size, h, w) {
		if (stacked) {
			b.css({ height: size, width: '' });
			resizer.css({ top: is ? (h - size) : '-1px', left: 0, width: '', height: '' });
			a.css({ height: is ? (h - size) : h, 'margin-right': '' });
		} else {
			b.css({ width: size, height: h });
			resizer.css({ left: is ? (w - size) : '-1px', top: '', width: '', height: h });
			a.css({ height: h, left: '', top: '', 'margin-right': is ? size : '' });
		}
	};

	var arrange = function() {
		if (!a || !b)
			return;
		if (is) {
			if (isstacked())
				self.dom.appendChild(b[0]);
			else
				self.dom.insertBefore(b[0], a[0]);
		}
	};

	self.make = function() {

		normalizeposition();

		var arr = self.find('> section');
		a = $(arr[0]);
		b = $(arr[1]);
		a.aclass(cls + '-list');
		b.aclass(cls + '-detail');
		self.element.prepend('<div class="{0}-resizer"></div>'.format(cls));
		self.aclass(cls);
		setclasses(isstacked());
		temp = $('<div />');
		temp.aclass(cls + '-temporary');
		self.resize();
		self.on('resize + resize2', self.resize);
		resizer = self.find(cls2 + '-resizer');

		events.move = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var tmp = events.touches ? e.touches[0] : e;
			if (isstacked()) {
				var y = events.y - tmp.pageY;
				resizer.css('top', events.top - y);
			} else {
				var x = events.x - tmp.pageX;
				resizer.css('left', events.left - x);
			}
		};

		events.up = function() {
			var parent = self.parent(config.parent);
			var stacked = isstacked();
			var h = parent.height() - config.margin;
			var w = parent.width();
			var total = stacked ? h : w;
			var pos = stacked ? resizer.position().top : resizer.position().left;
			var raw = total - pos;
			var tmp = getsize(stacked, total, raw);
			config[tmp.key] = tmp.size;
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
			if (isstacked()) {
				events.y = tmp.pageY;
				events.top = resizer.position().top;
			} else {
				events.x = tmp.pageX;
				events.left = resizer.position().left;
			}
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
		var stacked = isstacked();
		var total = stacked ? h : w;

		setclasses(stacked);

		if (!a || !b || !resizer || !parent)
			return;

		var tmp = getsize(stacked, total);
		applylayout(stacked, tmp.size, h, w);
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
			arrange();
		else
			temp[0].appendChild(b[0]);

		self.tclass(cls + '-visible', is);
		self.resizeforce();
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'position':
				config.position = value;
				normalizeposition();
				arrange();
				self.resizeforce();
				break;
			case 'height':
			case 'minheight':
			case 'maxheight':
			case 'width':
			case 'minwidth':
			case 'maxwidth':
			case 'margin':
			case 'parent':
				config[key] = value;
				self.resizeforce();
				break;
		}
	};

	self.setter = function(value) {
		self.toggle(!!value);
	};
});