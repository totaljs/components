COMPONENT('windows', 'menuicon:fa fa-navicon', function(self, config) {

	var cls = 'ui-' + self.name;
	var cls2 = '.' + cls;
	var cache = {};
	var services = [];
	var events = {};
	var drag = {};
	var prevfocused;
	var serviceid;
	var data = [];

	self.make = function() {
		self.aclass(cls);
		self.event('click', cls2 + '-control', function() {
			var el = $(this);
			var name = el.attrd('name');
			var item = cache[el.closest(cls2 + '-item').attrd('id')];
			switch (name) {
				case 'close':
					item.setcommand('close');
					break;
				case 'minimize':
					item.setcommand('toggleminimize');
					break;
				case 'maximize':
					item.setcommand('togglemaximize');
					break;
				case 'menu':
					item.meta.menu && item.meta.menu.call(item, el);
					break;
			}
		});

		self.event('mousedown touchstart', cls2 + '-item', function() {
			if (prevfocused) {
				if (prevfocused[0] == this)
					return;
				prevfocused.rclass(cls + '-focused');
			}
			prevfocused = $(this).aclass(cls + '-focused');
		});

		self.event('mousedown touchstart', cls2 + '-title,' + cls2 + '-resize', events.down);
		$(W).on('resize', self.resize2);
		serviceid = setInterval(events.service, 5000);
	};

	self.send = function(type, body) {
		for (var i = 0; i < data.length; i++)
			data[i].meta.data(type, body, data[i].element);
	};

	self.destroy = function() {
		$(W).off('resize', self.resize2);
		clearInterval(serviceid);
	};

	self.resize2 = function() {
		setTimeout2(self.ID, self.resize, 200);
	};

	self.recompile = function() {
		setTimeout2(self.iD + 'compile', COMPILE, 50);
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

	events.down = function(e) {

		if (e.type === 'touchstart') {
			drag.touch = true;
			e = e.touches[0];
		} else
			drag.touch = false;

		if (e.target.nodeName === 'I')
			return;

		var el = $(this);
		var parent = el.closest(cls2 + '-item');

		if (parent.hclass(cls + '-maximized'))
			return;

		drag.resize = el.hclass(cls + '-resize');
		drag.is = false;

		var myoffset = self.element.position();
		var pos;

		if (drag.resize) {
			var c = el.attr('class');
			drag.el = el.closest(cls2 + '-item');
			drag.dir = c.match(/-(tl|tr|bl|br)/)[0].substring(1);
			pos = drag.el.position();
			drag.body = drag.el.find(cls2 + '-body');
			drag.x = pos.left;
			drag.y = pos.top;
			drag.width = drag.el.width();
			drag.height = drag.body.height();
		} else {
			drag.el = el.closest(cls2 + '-item');
			if (drag.touch) {
				pos = drag.el.position();
				drag.x = e.pageX - pos.left;
				drag.y = e.pageY - pos.top;
			} else {
				drag.x = e.offsetX;
				drag.y = e.offsetY;
			}
		}

		drag.offX = myoffset.left;
		drag.offY = myoffset.top;
		drag.item = cache[drag.el.attrd('id')];

		if (drag.item.meta.actions) {
			if (drag.resize) {
				if (drag.item.meta.actions.resize == false)
					return;
			} else {
				if (drag.item.meta.actions.move == false)
					return;
			}
		}

		drag.el.aclass(cls + '-dragged');
		$(W).on('mousemove touchmove', events.move).on('mouseup touchend', events.up);
	};

	events.move = function(e) {

		var evt = e;
		if (drag.touch)
			evt = e.touches[0];

		var obj = {};
		drag.is = true;

		if (drag.resize) {

			var x = evt.pageX - drag.offX;
			var y = evt.pageY - drag.offY;
			var w;
			var h;
			var off = drag.item.meta.offset;

			switch (drag.dir) {

				case 'tl':
					obj.left = x;
					obj.top = y;
					w = drag.width - (x - drag.x);
					h = drag.height - (y - drag.y);

					if ((off.minwidth && w < off.minwidth) || (off.minheight && h < off.minheight) || (off.maxwidth && w > off.maxwidth) || (off.maxheight && h > off.maxheight))
						break;

					obj.width = w;
					drag.el.css(obj);
					obj.height = h;
					delete obj.width;
					delete obj.top;
					drag.body.css(obj);
					break;

				case 'tr':
					w = x - drag.x;
					h = drag.height - (y - drag.y);

					if ((off.minwidth && w < off.minwidth) || (off.minheight && h < off.minheight) || (off.maxwidth && w > off.maxwidth) || (off.maxheight && h > off.maxheight))
						break;

					obj.width = w;
					obj.top = y;
					drag.el.css(obj);
					obj.height = h;
					delete obj.width;
					delete obj.top;
					drag.body.css(obj);
					break;

				case 'bl':

					w = drag.width - (x - drag.x);
					h = y - drag.y - 30;

					if ((off.minwidth && w < off.minwidth) || (off.minheight && h < off.minheight) || (off.maxwidth && w > off.maxwidth) || (off.maxheight && h > off.maxheight))
						break;

					obj.left = x;
					obj.width = w;
					drag.el.css(obj);
					delete obj.width;
					obj.height = h;
					drag.body.css(obj);
					break;

				case 'br':
					w = x - drag.x;
					h = y - drag.y - 30;

					if ((off.minwidth && w < off.minwidth) || (off.minheight && h < off.minheight) || (off.maxwidth && w > off.maxwidth) || (off.maxheight && h > off.maxheight))
						break;

					obj.width = w;
					drag.el.css(obj);
					delete obj.width;
					obj.height = h;
					drag.body.css(obj);
					break;
			}

		} else {
			obj.left = evt.pageX - drag.x - drag.offX;
			obj.top = evt.pageY - drag.y - drag.offY;
			drag.el.css(obj);
		}

		if (!drag.touch)
			e.preventDefault();
	};

	events.up = function() {

		drag.el.rclass(cls + '-dragged');
		$(W).off('mousemove touchmove', events.move).off('mouseup touchend', events.up);

		if (!drag.is)
			return;

		var item = drag.item;
		var meta = item.meta;
		var pos = drag.el.position();

		drag.is = false;
		drag.x = meta.offset.x = pos.left;
		drag.y = meta.offset.y = pos.top;

		if (drag.resize) {
			item.width = meta.offset.width = drag.el.width();
			item.height = meta.offset.height = drag.body.height();
			meta.resize && meta.resize.call(item, item.width, item.height, drag.body, item.x, item.y);
		}

		meta.move && meta.move.call(item, item.x, item.y, drag.body);
		self.change(true);
	};

	self.wadd = function(item) {
		var el = $('<div class="{0}-item" data-id="{id}" style="left:{x}px;top:{y}px;width:{width}px"><span class="{0}-resize {0}-resize-tl"></span><span class="{0}-resize {0}-resize-tr"></span><span class="{0}-resize {0}-resize-bl"></span><span class="{0}-resize {0}-resize-br"></span><div class="{0}-title"><i class="fa fa-times {0}-control" data-name="close"></i><i class="far fa-window-maximize {0}-control" data-name="maximize"></i><i class="far fa-window-minimize {0}-control" data-name="minimize"></i><i class="{1} {0}-control" data-name="menu"></i><span>{{ title }}</span></div><div class="{0}-body" style="height:{height}px"></div></div>'.format(cls, config.menuicon).arg(item.offset).arg(item));
		var body = el.find(cls2 + '-body');
		body.append(item.html);

		if (typeof(item.html) === 'string' && item.html.COMPILABLE())
			self.recompile();

		if (item.actions) {
			if (item.actions.resize == false)
				el.aclass(cls + '-noresize');
			if (item.actions.move == false)
				el.aclass(cls + '-nomove');
			if (item.actions.close == false)
				el.aclass(cls + '-noclose');
			if (item.actions.maximize == false)
				el.aclass(cls + '-nomaximize');
			if (item.actions.minimize == false)
				el.aclass(cls + '-nominimize');
			if (!item.actions.menu)
				el.aclass(cls + '-nomenu');
		}

		var obj = cache[item.id] = {};
		obj.main = self;
		obj.meta = item;
		obj.element = body;
		obj.container = el;
		obj.x = item.offset.x;
		obj.y = item.offset.y;
		obj.width = item.offset.width;
		obj.height = item.offset.height;
		item.make && item.make.call(cache[item.id], body);

		obj.setsize = function(w, h) {
			var t = this;
			var obj = {};

			if (w) {
				obj.width = t.width = t.meta.offset.width = w;
				t.element.parent().css('width', w);
			}

			if (h) {
				t.element.css('height', h);
				t.height = t.meta.offset.height = h;
			}
		};

		obj.setcommand = function(type) {

			var el = obj.element.parent();
			var c;

			switch (type) {
				case 'close':
					if (obj.meta.close) {
						obj.meta.close(function() {
							self.wrem(obj.meta);
						});
					} else
						self.wrem(obj.meta);
					break;

				case 'maximize':
					c = cls + '-maximized';

					if (!el.hclass(c)) {
						obj.prevwidth = obj.width;
						obj.prevheight = obj.height;
						obj.prevx = obj.x;
						obj.prevy = obj.y;
						el.aclass(c);
						obj.setcommand('resetminimize');
					}

					var ww = self.element.width();
					var wh = self.element.height();
					obj.setoffset(0, 0);
					obj.setsize(ww, wh - obj.element.position().top);
					break;

				case 'resetmaximize':
					c = cls + '-maximized';
					if (el.hclass(c)) {
						obj.setoffset(obj.prevx, obj.prevy);
						obj.setsize(obj.prevwidth, obj.prevheight);
						el.rclass(c);
					}
					break;

				case 'togglemaximize':
					c = cls + '-maximized';
					obj.setcommand(el.hclass(c) ? 'resetmaximize' : 'maximize');
					break;

				case 'minimize':
					c = cls + '-minimized';
					if (!el.hclass(c))
						el.aclass(c);
					break;

				case 'resetminimize':
					c = cls + '-minimized';
					el.hclass(c) && el.rclass(c);
					break;

				case 'toggleminimize':
					c = cls + '-minimized';
					obj.setcommand(el.hclass(c) ? 'resetminimize' : 'minimize');
					break;

				case 'resize':
					obj.setsize(obj.width, obj.height);
					break;

				case 'move':
					obj.setoffset(obj.x, obj.y);
					break;

				case 'focus':
					obj.setcommand('resetminimize');
					prevfocused && prevfocused.rclass(cls + '-focused');
					prevfocused = obj.element.parent().aclass(cls + '-focused');
					break;
			}
		};

		obj.setoffset = function(x, y) {
			var t = this;
			var obj = {};

			if (x != null)
				obj.left = t.x = t.meta.offset.x = x;

			if (y != null)
				obj.top = t.y = t.meta.offset.y = y;

			t.element.parent().css(obj);
		};

		obj.meta.service && services.push(obj);
		obj.meta.data && data.push(obj);

		self.append(el);
		return obj;
	};

	self.wrem = function(item) {
		var obj = cache[item.id];
		if (obj) {
			var main = obj.element.closest(cls2 + '-item');
			obj.meta.destroy && obj.meta.destroy.call(obj);
			main.off('*');
			main.find('*').off('*');
			main.remove();
			delete cache[item.id];

			var index = services.indexOf(obj);
			if (index !== -1)
				services.splice(index, 1);

			index = data.indexOf(obj);
			if (index !== -1)
				data.splice(index, 1);
		}
	};

	self.setter = function(value) {

		if (!value)
			value = EMPTYARRAY;

		var updated = {};

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			if (!cache[item.id])
				cache[item.id] = self.wadd(item);
			updated[item.id] = 1;
		}

		// Remove older windows
		var keys = Object.keys(cache);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!updated[key])
				self.wrem(cache[key].meta);
		}
	};

});