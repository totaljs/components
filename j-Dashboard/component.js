COMPONENT('dashboard', 'grid:0;delay:700;axisX:12;axisY:144;padding:10;animation:3;serviceinterval:5000;minsizexs:3;minsizesm:2;minsizemd:2;minsizelg:1;iconremove:fa fa-trash-o;iconsettings:fa fa-cog', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var data = [];
	var services = [];
	var events = {};
	var skip = false;
	var drag = {};
	var movable = {};
	var serviceid;
	var pixel;
	var $D = $(document);
	var $W = $(W);
	var current_display;
	var isinit = true;
	var dtfocus;

	self.readonly();

	self.make = function() {

		self.aclass(cls);
		self.on('resize + resize2', events.resize);
		$W.on('resize', events.resize);
		$W.on('focus', events.focus);

		$D.on('mousedown touchstart', cls2 + '-title,' + cls2 + '-resize-button', events.ondown);
		$D.on('dragstart', '[draggable]', drag.handler);
		$D.on('touchstart', '[draggable]', drag.handler);

		if (config.grid)
			self.append('<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="jdashboardgrid" width="0" height="0" patternunits="userSpaceOnUse"><path d="M 0 0 L 0 0 0 0" fill="none" class="{0}-grid" /></pattern></defs><rect width="100%" height="100%" fill="url(#jdashboardgrid)" shape-rendering="crispEdges" /></svg>'.format(cls));
		else
			self.aclass(cls + '-nogrid');

		self.updategrid = function() {
			var padding = (config.padding / 2);
			self.find('svg').attr({ width: 12 * pixel + 1 + padding, height: self.height() }).css({ margin: padding + ' 0 0 ' + padding });
			self.find('pattern').attr({ width: pixel, height: pixel }).find('path').attr('d', 'M {0} 0 L 0 0 0 {0}'.format(pixel));
		};

		self.event('mousedown touchstart', cls2 + '-control', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var el = $(this);
			var name = el.attrd('name');
			var id = el.closest(cls2 + '-item').attrd('id');
			var tmp = cache[id];
			if (name === 'settings') {
				tmp.meta.settings && tmp.meta.settings.call(tmp, tmp.config, tmp.element, el);
			} else if (name === 'remove') {
				if (tmp.meta.remove) {
					tmp.meta.remove.call(tmp, function() {
						self.wdestroy(id, true);
					});
				} else
					self.wdestroy(id, true);
			}

		});

		self.event('dragenter dragover dragexit drop dragleave', function(e) {
			switch (e.type) {
				case 'drop':
					drag.drop(e);
					break;
			}
			e.preventDefault();
		});

		current_display = WIDTH(self.element);
		serviceid = setInterval(events.service, config.serviceinterval);
	};

	drag.touchmove = function(e) {
		var evt = e.touches[0];
		drag.lastX = evt.pageX;
		drag.lastY = evt.pageY;
	};

	drag.touchend = function(e) {

		e.target = document.elementFromPoint(drag.lastX, drag.lastY);
		drag.unbind();

		if (e.target !== self.dom) {
			var parent = e.target.parentNode;
			var is = false;
			while (true) {

				if (parent === self.dom) {
					is = true;
					e.target = parent;
					break;
				}

				parent = parent.parentNode;
				if (!parent || parent.tagName === 'BODY' || parent.tagName === 'HTML')
					break;
			}
			if (!is)
				return;
		}

		if (e.target) {
			var pos = self.op.position();
			e.pageX = drag.lastX;
			e.pageY = drag.lastY;
			e.offsetX = e.pageX - pos.left;
			e.offsetY = e.pageY - pos.top;
			self.change(true);
			drag.drop(e);
		}
	};

	drag.bind = function() {
		$D.on('touchmove', drag.touchmove);
		$D.on('touchend', drag.touchend);
	};

	drag.unbind = function() {
		$D.off('touchmove', drag.touchmove);
		$D.off('touchend', drag.touchend);
	};

	drag.handler = function(e) {

		if (HIDDEN(self.element))
			return;

		drag.el = $(e.target);
		e.touches && drag.bind();
		var dt = e.originalEvent.dataTransfer;
		dt && dt.setData('text', '1');
	};

	drag.drop = function(e) {
		var meta = {};
		meta.pageX = e.pageX;
		meta.pageY = e.pageY;
		meta.offsetX = e.offsetX;
		meta.offsetY = e.offsetY;
		meta.el = drag.el;
		meta.target = $(e.target);
		meta.x = (meta.offsetX / pixel) >> 0;
		meta.y = (meta.offsetY / pixel) >> 0;
		meta.d = current_display;
		config.ondrop && self.EXEC(config.ondrop, meta, self);
		self.change(true);
	};

	events.service = function() {
		for (var i = 0; i < services.length; i++) {
			var tmp = services[i];
			if (tmp.$service)
				tmp.$service++;
			else
				tmp.$service = 1;
			tmp.meta.service && tmp.meta.service.call(tmp, tmp.$service, tmp.element);
		}
	};

	events.resize = function() {
		self.resize2();
	};

	events.focus = function() {

		var now = Date.now();

		if (dtfocus && (now - dtfocus) < 5000)
			return;

		dtfocus = now;

		for (var key in cache) {
			var item = cache[key];
			item.meta.focus && item.meta.focus();
		}
	};

	events.bind = function(is) {

		if (events.is === is)
			return;

		if (is)
			$(W).on('mouseup touchend', events.onup).on('mousemove touchmove', events.onmove);
		else
			$(W).off('mouseup touchend', events.onup).off('mousemove touchmove', events.onmove);

		$('body').css('pointer-events', is ? 'none' : '');
		events.is = is;
	};

	events.ondown = function(e) {

		// Maybe you will need to change title directly and this attribute can help
		if (e.target && e.target.getAttribute('data-prevent'))
			return;

		var el = $(this);
		self.aclass(cls + '-mousedown');
		$(document.body).aclass(cls + '-noscroll');

		movable.type = el.hclass(cls + '-title') ? 1 : 2;
		el = el.closest(cls2 + '-item');
		movable.id = el.attrd('id');

		click.call(this, e);

		var tmp = cache[movable.id];

		if (movable.type === 2) {
			if (!tmp.meta.actions.resize)
				return;
		} else {
			if (!tmp.meta.actions.move)
				return;
		}

		movable.istouch = e.type === 'touchstart';

		e.stopPropagation();
		e.preventDefault();

		if (movable.istouch)
			e = e.touches[0];

		movable.is = true;
		movable.el = el;
		movable.ticks = Date.now();
		movable.pageX = e.pageX;
		movable.pageY = e.pageY;
		movable.x = movable.type === 1 ? tmp.offset.x : tmp.offset.width;
		movable.y = movable.type === 1 ? tmp.offset.y : tmp.offset.height;
		var tmp = cache[movable.id].offset;
		movable.diff = tmp.width - tmp.height;
		movable.old = (tmp.x || 0) + 'x' + (tmp.y || 0) + 'x' + (tmp.width || 0) + 'x' + (tmp.height || 0);
		events.bind(true);
		el.aclass(cls + '-selected');
	};

	events.onup = function() {

		$(document.body).rclass(cls + '-noscroll');
		self.rclass(cls + '-mousedown');
		movable.el.rclass(cls + '-selected');
		movable.is = false;

		events.bind();
		self.resize_container();

		var tmp = cache[movable.id].offset;
		var curr = (tmp.x || 0) + 'x' + (tmp.y || 0) + 'x' + (tmp.width || 0) + 'x' + (tmp.height || 0);
		if (movable.old !== curr) {
			movewidget(cache[movable.id]);
			self.modified('move', movable.id);
		}
	};

	events.onmove = function(e) {

		if (!movable.is)
			return;

		if (movable.istouch)
			e = e.touches[0];

		var obj = cache[movable.id];
		var diffX = e.pageX - movable.pageX;
		var diffY = e.pageY - movable.pageY;
		var axis = diffX !== 0 ? 'x' : diffY !== 0 ? 'y' : '';

		diffX = diffX / pixel >> 0;
		diffY = diffY / pixel >> 0;

		// RESIZE
		if (movable.type === 2) {

			diffX = movable.x + diffX;
			diffY = movable.y + diffY;

			if (diffX <= 0)
				diffX = 1;

			if (diffY <= 0)
				diffY = 1;

			var tmp = diffX + obj.offset.x;
			if (tmp >= config.axisX) {
				tmp = tmp - (tmp - config.axisX) - obj.offset.x;
				diffX = tmp;
			}

			tmp = diffY + obj.offset.y;
			if (tmp >= config.axisY) {
				tmp = tmp - (tmp - config.axisY) - obj.offset.y;
				diffY = tmp;
			}

			if (obj.meta.actions.resizeP) {

				if (axis === 'x') {
					tmp = diffX - movable.diff;

					if (tmp < 1 || diffX < 1)
						return;

					obj.offset.width = diffX;
					obj.offset.height = tmp;
				}

			} else {
				if (obj.meta.actions.resizeX == null || obj.meta.actions.resizeX)
					obj.offset.width = diffX;

				if (obj.meta.actions.resizeY == null || obj.meta.actions.resizeY)
					obj.offset.height = diffY;
			}

			var min = config['minsize' + current_display];

			if (obj.meta.actions.resizeP) {

				if (obj.offset.width < min) {
					obj.offset.width = min;
					obj.offset.height = min - movable.diff;
				}

			} else {
				if (obj.offset.width < min)
					obj.offset.width = min;
				if (obj.offset.height < min)
					obj.offset.height = min;
			}

			self.woffset(movable.id);
			return;
		}

		diffX = movable.x + diffX;
		diffY = movable.y + diffY;

		if (diffX < 0)
			diffX = 0;

		if (diffY < 0)
			diffY = 0;

		var maxX = diffX + obj.offset.width;
		var maxY = diffY + obj.offset.height;

		if (maxX > config.axisX)
			diffX = config.axisX - obj.offset.width;

		if (maxY > config.axisY)
			diffY = config.axisY - obj.offset.height;

		obj.offset.x = diffX;
		obj.offset.y = diffY;
		self.woffset(movable.id);
	};

	self.destroy = function() {
		$D.off('dragstart', '[draggable]', drag.handler);
		$D.off('touchstart', '[draggable]', drag.handler);
		$D.off('mousedown touchstart', cls2 + '-title,' + cls2 + '-resize-button', events.down);
		$W.off('resize', events.resize);
		$W.off('focus', events.focus);
		clearInterval(serviceid);
		events.bind();
		self.change(true);
	};

	self.resize_container = function() {

		var max = 0;

		for (var key in cache) {
			var item = cache[key];
			var y = (+item.container.css('top').replace('px', '')) + (+item.container.css('height').replace('px', ''));
			max = Math.max(y, max);
		}

		var parent = config.parent ? self.parent(config.parent) : null;
		var h = parent ? parent.height() : 0;
		max += 20;

		var css = {};
		css.height = max < h ? h : max;
		self.css(css);
	};

	self.configure = function(key, value) {
		if (key === 'grid')
			self.tclass(cls + '-nogrid', !value);
	};

	self.resize_pixel = function() {

		var prev = current_display;

		current_display = WIDTH(self.element);

		if (prev !== current_display) {
			prev && self.rclass(cls2 + '-' + prev);
			self.aclass(cls2 + '-' + current_display);
		}

		var width = self.element.width() - (config.padding * 2);
		pixel = (width / config.axisX).floor(3);
		self.pixel = pixel;
		self.display = current_display;
	};

	self.resize = function() {
		current_display = WIDTH(self.element);
		self.resize_pixel();
		for (var key in cache)
			self.woffset(key);
		self.resize_container();
		self.updategrid();
	};

	self.resize2 = function() {
		setTimeout2(self.ID + 'resize', self.resize, 500);
	};

	self.wsize = function(d, obj) {

		var offset = obj.meta.offset;
		var tmp = offset[d];
		if (!tmp) {
			if (d === 'xs')
				d = 'sm';
			tmp = offset[d];
			if (!tmp) {
				d = 'md';
				tmp = offset[d];
				if (!tmp) {
					d = 'lg';
					tmp = offset[d];
				}
			}
		}

		if (tmp)
			tmp = CLONE(tmp);
		else
			tmp = { x: 0, y: 0, width: 3, height: 3 };

		var min = config['minsize' + current_display];

		if (obj.meta.actions.resizeP) {
			var diff = tmp.width - tmp.height;
			if (tmp.width < min) {
				tmp.width = min;
				tmp.height = min - diff;
			}
		} else {
			if (tmp.width < min)
				tmp.width = min;
			if (tmp.height < min)
				tmp.height = min;
		}

		return tmp;
	};

	self.modified = function(type, id) {
		skip = true;
		self.change(true);
		self.update(true);
		config.change && self.SEEX(config.change, type, id);
	};

	self.wdestroy = function(id, manual) {
		var obj = cache[id];
		if (obj) {
			delete cache[id];
			var el = obj.container;
			obj.meta.destroy && obj.meta.destroy.call(obj, obj.element, manual);
			el.find('*').off();
			el.off();
			el.remove();
			var index;
			if (manual) {
				var model = self.get();
				index = model.indexOf(obj.meta);
				if (index !== -1) {
					model.splice(index, 1);
					self.modified('remove', id);
				}
			}
			index = services.indexOf(obj);
			if (index !== -1)
				services.splice(index, 1);
			index = data.indexOf(obj);
			if (index !== -1)
				data.splice(index, 1);
		}
	};

	var resizewidget = function(obj) {
		if (obj) {
			obj.meta && obj.meta.resize && obj.meta.resize.call(obj, obj.width, obj.height, obj.element, obj.display);
			!config.noemitresize && obj.element.EXEC('resize');
		}
	};

	var movewidget = function(obj) {
		movable.timeout = null;
		if (obj && obj.meta)
			obj.meta.move && obj.meta.move.call(obj, obj.meta.offset, obj.display);
	};

	var click = function() {
		var el = $(this);
		if (el.css('z-index') !== '2') {
			self.find(cls2 + '-item').css('z-index', '');
			el.css('z-index', 2);
		}
	};

	self.woffset = function(id, init) {

		var d = current_display;
		var obj = cache[id];
		var tmp = self.wsize(d, obj);

		if (tmp.x == null)
			tmp.x = 0;

		if (tmp.y == null)
			tmp.y = 0;

		obj.offset = tmp;

		var x = (tmp.x || 0) * pixel + config.padding;
		var y = (tmp.y || 0) * pixel + config.padding;
		var w = tmp.width * pixel;
		var h = tmp.height * pixel;

		var classes = [];

		classes.push('d_col' + tmp.width);
		classes.push('d_row' + tmp.height);
		classes.push('d_' + tmp.width + 'x' + tmp.height);

		if (tmp.width === 1 && tmp.height > 1)
			classes.push('d_vertical');

		if (tmp.width > 1 && tmp.height === 1)
			classes.push('d_horizontal');

		if (tmp.width === tmp.height)
			classes.push('d_square');

		var fs = ((((Math.min(tmp.width, tmp.height) / 12) * 100) * pixel).floor(3) / 80);
		obj.container.css({ left: x, top: y, width: w, height: h, 'font-size': fs + 'px' });

		var body = obj.container.find('> ' + cls2 + '-body').rclass2('d_').aclass(classes.join(' '));
		var title = body.find('> ' + cls2 + '-title').height() || 0;
		var prevw = obj.width;
		var prevh = obj.height;

		obj.meta.offset[current_display] = tmp;
		obj.meta.height = obj.height = h - title - config.padding * 2;
		obj.meta.width = obj.width = obj.element.width();
		obj.meta.display = obj.display = d;
		obj.element.css({ height: obj.height });

		if (!init && (prevw !== obj.width || prevh !== obj.height))
			setTimeout(resizewidget, 2, obj);
	};

	self.send = function(id, body) {
		var comid = id.charAt(0) === '@' ? id.substring(1) : '';
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			if (id == null || item.meta.id === id || (comid && comid === item.meta.component))
				item.meta.data(body, item.element);
		}
	};

	self.wupd = function(id) {
		var obj = cache[id];
		var meta = obj.meta;
		var el = obj.container;
		el.tclass(cls + '-header', meta.header !== false);
		el.tclass(cls + '-canremove', meta.actions.remove !== false);
		el.tclass(cls + '-canresize', meta.actions.resize !== false);
		el.tclass(cls + '-cansettings', meta.actions.settings !== false);
		self.woffset(id);
	};

	var wanim = function(el) {
		el.rclass('invisible').aclass(cls + '-' + config.animation + '-run');
	};

	var winit = function(el, obj, isinit) {
		if (isinit && config.animation) {
			var def = isMOBILE ? 40 : 100;
			var delay = obj ? (def * (obj.offset.x + 1)) + (def * (obj.offset.y) + 1) : 10;
			setTimeout(wanim, delay, el);
		} else
			el.rclass('invisible');
	};

	self.wadd = function(obj) {

		var classname = [cls + '-item'];

		if (obj.actions.resize !== false)
			classname.push(cls + '-canresize');

		if (obj.actions.remove !== false)
			classname.push(cls + '-canremove');

		if (obj.actions.settings !== false)
			classname.push(cls + '-cansettings');

		if (obj.header !== false)
			classname.push(cls + '-header');

		if (obj.class)
			classname.push(obj.class);

		var isdom = obj.html && typeof(obj.html) !== 'string';
		var el = $(('<div class="{1} invisible{6}" data-id="{2}"><div class="{0}-body" style="margin:{5}px"><div class="{0}-title">{4}</div><figure>{3}</figure><span class="{0}-resize-button"></span></div></div>').format(cls, classname.join(' '), obj.id, isdom ? '' : obj.html, ('<span class="{1} ui-dashboard-control" data-name="remove"></span><span class="{0} ui-dashboard-control" data-name="settings"></span>').format(config.iconsettings, config.iconremove) + '<div><span>' + obj.title + '</span></div>', config.padding, config.animation && isinit ? (' ' + cls + '-' + config.animation + '-init') : ''));
		self.dom.appendChild(el[0]);
		el.on('click', click);
		var tmp = cache[obj.id] = {};
		tmp.container = el;
		tmp.element = el.find('figure');
		isdom && tmp.element[0].appendChild(obj.html);
		tmp.config = tmp.options = obj.config;
		tmp.template = obj.template;
		tmp.cachedconfig = STRINGIFY(obj.config);
		tmp.meta = obj;
		tmp.main = self;
		self.woffset(obj.id, true);

		obj.element = tmp.element;
		obj.refresh = function() {
			var t = this;
			var container = t.element.closest(cls2 + '-item');
			var actions = t.actions;
			container.tclass(cls + '-canresize', actions.resize !== false);
			container.tclass(cls + '-canremove', actions.remove !== false);
			container.tclass(cls + '-cansettings', actions.settings !== false);
			container.tclass(cls + '-header', actions.header !== false);
			container.find(cls2 + '-title').find('div > span').text(tmp.meta.title);
		};

		try {
			tmp.meta.make && tmp.meta.make.call(tmp, tmp.meta, tmp.config, tmp.element);
		} catch (e) {
			console.error && console.error('Dashboard:', tmp.meta, e);
		}

		el[0].$dashboard = tmp;

		if (!isdom && obj.html)
			obj.html.COMPILABLE() && COMPILE();

		tmp.meta.service && services.push(tmp);
		tmp.meta.data && data.push(tmp);
		setTimeout(winit, obj.delay || config.delay, el, tmp, isinit);
	};

	self.call = function(name, a, b, c, d) {
		for (var key in cache) {
			var item = cache[key];
			item.meta[name] && item.meta[name](a, b, c, d);
		}
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = EMPTYARRAY;

		self.resize_pixel();
		services = [];
		data = [];

		for (var key in cache) {
			var item = value.findItem('id', key);
			if (!item || item.reset) {
				self.wdestroy(key);
				delete cache[key];
			}
		}

		for (var i = 0; i < value.length; i++) {
			var obj = value[i];
			var item = cache[obj.id];
			if (item) {
				if (item.meta === obj) {

					self.wupd(obj.id);

					var tmp = STRINGIFY(obj.config);
					if (obj.configure && item.cachedconfig !== tmp) {
						item.cachedconfig = tmp;
						item.config = obj.config;
						obj.configure && obj.configure(item.config);
					}

					obj.service && services.push(item);
					obj.data && data.push(item);
					continue;
				} else
					self.wdestroy(obj.id);
			}
			self.wadd(obj);
		}

		if (value.length)
			isinit = false;

		self.resize_container();
	};

});