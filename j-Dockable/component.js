COMPONENT('dockable', 'menuicon:ti ti-navicon;style:2;parent:window;margin:0;reoffsetresize:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var services = [];
	var events = {};
	var drag = {};
	var prevfocused;
	var serviceid;
	var data = [];
	var docked = {};
	var layout;
	var ruler;
	var container;
	var init = false;
	var lastWW = WW;
	var lastWH = WH;

	self.make = function() {
		self.aclass(cls + (config.style === 2 ? (' ' + cls + '-style2') : ''));
		var el = self.element;
		el.wrapInner('<div class="{0}-layout" />'.format(cls));
		el.append('<div class="{0}-panels"><div class="{0}-ruler hidden"></div></div>'.format(cls));
		layout = self.find(cls2 + '-layout');
		ruler = self.find(cls2 + '-ruler');
		container = self.find(cls2 + '-panels');
		self.event('click', cls2 + '-control', function() {
			var el = $(this);
			var name = el.attrd('name');
			var item = cache[el.closest(cls2 + '-item').attrd('id')];
			switch (name) {
				case 'close':
					item.setcommand('close');
					break;
				case 'menu':
					item.meta.menu && item.meta.menu.call(item, el);
					break;
				default:
					item.setcommand(name);
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
		self.on('resize + resize2', self.resize2);
		serviceid = setInterval(events.service, 5000);
		self.resizelayout();
	};

	self.finditem = function(id) {
		return cache[id];
	};

	self.send = function(type, body) {
		for (var i = 0; i < data.length; i++)
			data[i].meta.data(type, body, data[i].element);
	};

	self.destroy = function() {
		clearInterval(serviceid);
	};

	self.resize = function() {

		clearTimeout2(self.ID + 'compile');
		self.resizelayout();

		var keys = Object.keys(cache);
		docked = {};

		for (var i = 0; i < keys.length; i++) {
			var item = cache[keys[i]];

			if (item.meta.hidden)
				continue;

			if (item.meta.offset.docked) {
				item.titleheight = item.container.find(cls2 + '-title').height() || 0;
				docked[item.meta.offset.docked] = item;
			} else if (config.reoffsetresize) {
				var diffWW = lastWW - WW;
				var diffWH = lastWH - WH;
				item.setoffset(item.x - diffWW, item.y - diffWH);
			}
		}

		lastWW = WW;
		lastWH = WH;

		var ww = self.element.width();
		var wh = self.element.height();

		var h;
		var w;
		var x;

		if (docked.bottom) {
			h = docked.bottom.container.offset().top;

			if (config.style === 1) {
				docked.left && docked.left.setsize(null, h - docked.left.titleheight - 1);
				if (docked.right) {
					docked.right.setsize(null, h - docked.right.titleheight - 1);
					docked.right.setoffset(ww - docked.right.width);
				}
			} else {

				w = self.element.width();
				x = docked.left ? docked.left.width : 0;

				if (docked.right) {
					docked.right.setoffset(ww - docked.right.width);
					docked.right.setsize(null, wh - docked.right.titleheight);
					w = w - docked.right.width;
				}

				docked.left && docked.left.setsize(null, wh - docked.left.titleheight);
				docked.bottom.setoffset(x, wh - docked.bottom.height - docked.bottom.titleheight);
				docked.bottom.setsize(w - x, null);
			}

		} else {

			w = self.element.width();
			x = docked.left ? docked.left.width : 0;

			if (docked.right) {
				docked.right.setoffset(ww - docked.right.width);
				docked.right.setsize(null, wh - docked.right.titleheight);
				w = w - docked.right.width;
			}

			docked.left && docked.left.setsize(null, wh - docked.left.titleheight);
		}

		self.resizelayout();
		self.element.SETTER('*', 'resize');
	};

	self.resizelayout = function() {

		var parent = self.parent(config.parent);
		var css = {};
		css.width = parent.width();
		css.height = parent.height() - config.margin;

		self.css(css);

		css['margin-left'] = 0;
		var keys = Object.keys(cache);
		for (var i = 0; i < keys.length; i++) {
			var item = cache[keys[i]];

			if (item.meta.hidden)
				continue;

			var meta = item.meta;
			var offset = meta.offset;
			switch (offset.docked) {
				case 'left':
					css['margin-left'] += offset.width;
					css.width -= offset.width;
					break;
				case 'right':
					css.width -= offset.width;
					break;
				case 'bottom':
					css.height -= offset.height + item.titleheight;
					break;
			}
		}
		layout.css(css);
	};

	self.resize2 = function() {
		setTimeout2(self.ID, self.resize, 300);
	};

	self.recompile = function() {
		setTimeout2(self.ID + 'compile', COMPILE, 50);
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
		drag.resize = el.hclass(cls + '-resize');
		drag.is = false;

		e.preventDefault();

		var myoffset = self.element.position();
		var pos;

		if (drag.resize) {
			var c = el.attr('class');
			drag.el = el.closest(cls2 + '-item');
			drag.dir = c.match(/-(tl|tr|bl|br)/)[0].substring(1);
			pos = drag.el.position();
			var m = self.element.offset();
			drag.body = drag.el.find(cls2 + '-body');
			drag.plus = m;
			drag.x = pos.left;
			drag.y = pos.top;
			drag.width = drag.el.width();
			drag.height = drag.body.height();

			var css = {};

			if (drag.el.hclass(cls + '-docked')) {
				switch (drag.dir) {
					case 'tr':
						css.width = 1;
						css.height = drag.el.height();
						css.left = pos.left + drag.width;
						css.top = pos.top;
						ruler.css(css).rclass('hidden');
						break;
					case 'tl':

						var item = cache[drag.el.attrd('id')];
						var d = item.meta.offset.docked;
						if (d === 'bottom') {
							css.width = drag.width;
							css.height = 1;
						} else {
							css.width = 1;
							css.height = drag.el.height();
						}

						css.top = pos.top;
						css.left = pos.left;
						ruler.css(css).rclass('hidden');
						break;
				}
			}

		} else {
			drag.el = el.closest(cls2 + '-item');
			pos = drag.el.position();
			drag.x = e.pageX - pos.left;
			drag.y = e.pageY - pos.top;
		}

		drag.el.aclass(cls + '-block');
		drag.offX = myoffset.left;
		drag.offY = myoffset.top;
		drag.item = cache[drag.el.attrd('id')];
		drag.isdocked = drag.el.hclass(cls + '-docked');
		drag.dockl = false;
		drag.dockr = false;
		drag.dockb = false;
		drag.ww = self.element.width();
		drag.wh = self.element.height();

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
		var off = drag.item.meta.offset;
		var d = off.docked;
		var minwidth = (d ? off.dockminwidth : off.minwidth) || 30;
		var maxwidth = d ? off.dockmaxwidth : off.maxwidth;
		var minheight = (d ? off.dockminheight : off.minheight) || 30;
		var maxheight = d ? off.dockmaxheight : off.maxheight;

		drag.is = true;

		if (drag.resize) {

			var x = evt.pageX - drag.plus.left;
			var y = evt.pageY - drag.plus.top;
			var actions = drag.item.meta.actions;
			var resizeX = actions ? actions.resizeX != false : true;
			var resizeY = actions ? actions.resizeY != false : true;
			var w;
			var h;
			var stopw, stoph;

			switch (drag.dir) {

				case 'tl':

					w = drag.width - (x - drag.x);
					h = drag.height - (y - drag.y);

					if (resizeY && (!d || d === 'bottom'))
						obj.top = y;

					if (resizeX && (!d || d !== 'bottom'))
						obj.left = x;

					stopw = (minwidth && w < minwidth) || (maxwidth && w > maxwidth);
					stoph = (minheight && h < minheight) || (maxheight && h > maxheight);

					if (d) {

						if (resizeX && (!d || d !== 'bottom') && !stopw) {
							obj.left = drag.ww - w;
							ruler.css(obj).attrd('cache', w);
						}

						if (resizeY && (!d || d === 'bottom') && !stoph) {
							obj.top = drag.wh - h - drag.item.titleheight;
							ruler.css(obj).attrd('cache', h);
						}

					} else {

						if (resizeX && (!d || d !== 'bottom') && !stopw) {
							drag.el.css(obj);
							obj.width = w;
						}

						if (resizeY && (!d || d === 'bottom') && !stoph) {
							obj.top = y;
							obj.height = h;
						}

						delete obj.width;
						delete obj.top;

						if (!stopw || !stoph)
							drag.body.css(obj);
					}
					break;

				case 'tr':

					w = x - drag.x;
					h = drag.height - (y - drag.y);

					stopw = (minwidth && w < minwidth) || (maxwidth && w > maxwidth);
					stoph = (minheight && h < minheight) || (maxheight && h > maxheight);

					if (d) {

						if (resizeX && !stopw)
							obj.left = w;

						if (resizeY && !d && !stoph)
							obj.top = y;

						if (!stopw)
							ruler.css(obj).attrd('cache', w);

					} else {

						if (resizeX && !stopw)
							obj.width = w;

						if (resizeY && !d && !stoph)
							obj.top = y;

						if (!stopw || !stoph)
							drag.el.css(obj);

						if (resizeY && !d && !stoph)
							obj.height = h;

						delete obj.width;
						delete obj.top;

						if (!stopw || !stoph)
							drag.body.css(obj);
					}

					break;

				case 'bl':

					w = drag.width - (x - drag.x);
					h = y - drag.y - 30;

					stopw = (minwidth && w < minwidth) || (maxwidth && w > maxwidth);
					stoph = (minheight && h < minheight) || (maxheight && h > maxheight);

					if (resizeX && !stopw) {
						obj.left = x;
						obj.width = w;
						drag.el.css(obj);
					}

					if (resizeY && !stoph) {
						delete obj.width;
						obj.height = h;
						drag.body.css(obj);
					}

					break;

				case 'br':

					w = x - drag.x;
					h = y - drag.y - 30;

					stopw = (minwidth && w < minwidth) || (maxwidth && w > maxwidth);
					stoph = (minheight && h < minheight) || (maxheight && h > maxheight);

					if (resizeX && !stopw) {
						obj.width = w;
						drag.el.css(obj);
					}

					if (resizeY && !stoph) {
						delete obj.width;
						obj.height = h;
						drag.body.css(obj);
					}

					break;
			}

			if (!d) {
				drag.item.ert && clearTimeout(drag.item.ert);
				drag.item.ert = setTimeout(drag.item.emitresize, 100);
			}

		} else {

			obj.left = evt.pageX - drag.x;
			obj.top = evt.pageY - drag.y;
			drag.el.css(obj);

			if (drag.isdocked) {

				var old = drag.item.meta.offset.docked;
				drag.isdocked = false;
				drag.item.setdock(null);
				drag.item.setsize(old === 'bottom' ? (drag.item.width / 2) >> 0 : drag.item.width, old !== 'bottom' ? (drag.item.height / 2) >> 0 : drag.item.height);

			} else {

				var is = false;
				var margin = 0;
				var css;

				if (drag.item.dockable.left && !docked.left) {

					is = obj.left < 30;
					if (is !== drag.dockl) {

						if (docked.bottom && is && config.style === 1)
							margin = drag.wh - docked.bottom.container.offset().top;

						drag.dockl = is;
						css = {};
						css.width = 1;
						css.height = drag.wh - margin;
						css.left = minwidth || maxwidth || drag.item.width;
						css.top = 0;
						ruler.css(css).tclass('hidden', !is);
					}
				}

				if (drag.item.dockable.right && !docked.right) {

					is = obj.left > drag.ww - drag.item.width + 50;
					if (is !== drag.dockr) {

						if (docked.bottom && is && config.style === 1)
							margin = drag.wh - docked.bottom.container.offset().top;

						drag.dockr = is;
						css = {};
						css.width = 1;
						css.height = drag.wh - margin;
						css.left = drag.ww - (minwidth || maxwidth || drag.item.width);
						css.top = 0;
						ruler.css(css).tclass('hidden', !is);
					}
				}

				if (drag.item.dockable.bottom && !docked.bottom) {

					is = obj.top > (drag.item.y + (drag.item.height / 2) + 50);

					if (is !== drag.dockb) {
						drag.dockb = is;
						css = {};

						css.height = 1;
						css.top = drag.wh - (minheight || maxheight || drag.item.height);

						if (config.style === 1) {
							css.left = 0;
							css.width = drag.ww;
						} else {
							css.left = (docked.left ? docked.left.width : 0);
							css.width = (docked.right ? docked.right.x : drag.ww) - css.left;
						}

						ruler.css(css).tclass('hidden', !is);
					}
				}
			}
		}

		if (!drag.touch)
			e.preventDefault();
	};

	events.up = function() {

		drag.el.rclass(cls + '-dragged').rclass(cls + '-block');
		$(W).off('mousemove touchmove', events.move).off('mouseup touchend', events.up);

		if (!drag.is) {
			ruler.aclass('hidden');
			return;
		}

		var item = drag.item;
		var meta = item.meta;
		var pos;
		var w;
		var h;

		if (meta.offset.docked) {
			pos = ruler.offset();

			if (meta.offset.docked !== 'bottom')
				w = +ruler.attrd('cache') + 1;
			else if (meta.offset.docked === 'bottom')
				h = +ruler.attrd('cache') + 1;

			if (meta.offset.docked === 'right')
				pos.left = drag.ww - w;

		} else {
			pos = drag.el.position();
			w = drag.el.width();
			h = drag.el.height() - drag.item.titleheight;
		}

		ruler.aclass('hidden');
		drag.is = false;
		drag.x = meta.offset.x = item.x = pos.left;
		drag.y = meta.offset.y = item.y = pos.top;

		if (drag.resize) {
			drag.item.setsize(w, h);
			meta.resize && meta.resize.call(item, item.width, item.height, drag.body, item.x, item.y);
		} else {
			drag.dockl && item.setdock('left', true);
			drag.dockr && item.setdock('right', true);
			drag.dockb && item.setdock('bottom', true);
		}

		meta.move && meta.move.call(item, item.x, item.y, drag.body);
		drag.resize && self.resize();
		self.wsave(item);
		self.change(true);
	};

	var wsavecallback = function(item) {
		var key = 'dock_' + item.meta.id;
		var obj = {};
		obj.x = item.x;
		obj.y = item.y;
		obj.width = item.width;
		obj.height = item.height;
		obj.docked = item.meta.offset.docked;
		obj.ww = WW;
		obj.wh = WH;
		obj.hidden = item.meta.hidden;
		PREF.set(key, obj, '1 month');
	};

	self.wsave = function(obj) {
		if (obj.meta.actions && obj.meta.actions.autosave && init)
			setTimeout2(self.ID + '_dock_' + obj.meta.id, wsavecallback, 500, null, obj);
	};

	self.wadd = function(item) {

		var hidden = '';
		var ishidden = false;

		if (item.actions && item.actions.autosave) {
			pos = PREF['dock_' + item.id];
			if (pos) {

				var mx = 0;
				var my = 0;

				if (config.reoffsetresize && pos.ww != null && pos.wh != null) {
					mx = pos.ww - WW;
					my = pos.wh - WH;
				}

				item.offset.x = pos.x - mx;
				item.offset.y = pos.y - my;
				item.offset.width = pos.width;
				item.offset.height = pos.height;
				item.offset.docked = pos.docked;

				if (pos.hidden) {
					ishidden = true;
					item.hidden = true;
				}
			}
		}

		if (!ishidden)
			ishidden = item.hidden;

		hidden = ishidden ? ' hidden' : '';

		var el = $('<div class="{0}-item{2}" data-id="{id}" style="left:{x}px;top:{y}px;width:{width}px"><span class="{0}-resize {0}-resize-tl"></span><span class="{0}-resize {0}-resize-tr"></span><span class="{0}-resize {0}-resize-bl"></span><span class="{0}-resize {0}-resize-br"></span><div class="{0}-title"><i class="ti ti-times {0}-control" data-name="close"></i><span>{{ title }}</span></div><div class="{0}-body" style="height:{height}px"></div></div>'.format(cls, config.menuicon, hidden).arg(item.offset).arg(item));
		var body = el.find(cls2 + '-body');
		var pos;

		body.append(item.html);

		if (typeof(item.html) === 'string' && item.html.COMPILABLE())
			self.recompile();

		if (item.actions) {
			if (item.actions.resize == false)
				el.aclass(cls + '-noresize');
			if (item.actions.move == false)
				el.aclass(cls + '-nomove');

			var noclose = item.actions.close == false;
			if (item.actions.hide)
				noclose = false;

			if (noclose)
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
		obj.dockable = {};

		if (item.actions && item.actions.dockable) {
			var dockable = item.actions.dockable;
			if (typeof(dockable) === 'string')
				dockable = dockable.split(/\s|,|;/).trim();
			for (var i = 0; i < dockable.length; i++)
				obj.dockable[dockable[i]] = 1;
		} else {
			obj.dockable.left = 1;
			obj.dockable.right = 1;
			obj.dockable.bottom = 1;
		}

		if (item.buttons) {
			var builder = [];
			for (var i = 0; i < item.buttons.length; i++) {
				var btn = item.buttons[i];
				var icon = btn.icon.indexOf(' ') === -1 ? ('ti ti-' + btn.icon) : btn.icon;
				builder.push('<i class="ti ti-{1} {0}-control" data-name="{2}"></i>'.format(cls, icon, btn.name));
			}
			builder.length && el.find(cls2 + '-lastbutton').before(builder.join(''));
		}

		item.make && item.make.call(cache[item.id], body);

		obj.emitresize = function() {
			obj.ert = null;
			obj.element.SETTER('*', 'resize');
		};

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

			if (!init) {
				t.ert && clearTimeout(t.ert);
				t.ert = setTimeout(t.emitresize, 100);
			}

			self.wsave(t);
		};

		obj.setdock = function(offset, force, init) {

			var t = this;

			if (!force && t.meta.docked === offset)
				return;

			var w = self.element.width();
			var h = self.element.height();
			var meta = t.meta;
			switch (offset) {
				case 'left':
					meta.offset.y = 0;
					meta.offset.x = 0;
					meta.offset.height = h;
					break;
				case 'right':
					meta.offset.y = 0;
					meta.offset.x = w - meta.offset.width;
					meta.offset.height = h;
					break;
				case 'bottom':
					meta.offset.width = w;
					meta.offset.x = 0;
					meta.offset.y = h - meta.offset.height;
					break;
			}

			t.meta.offset.docked = offset || null;

			var el = t.element.parent();

			if (offset)
				el.aclass(cls + '-docked ' + cls + '-docked-' + offset);
			else
				el.rclass2(cls + '-docked');

			t.setoffset(meta.offset.x, meta.offset.y);
			t.setsize(meta.offset.width, meta.offset.height, init);

			if (init)
				return;

			if (force)
				self.resize();
			else
				self.resize2();
		};

		obj.setcommand = function(type) {

			switch (type) {

				case 'toggle':
					obj.setcommand(obj.meta.hidden ? 'show' : 'hide');
					break;

				case 'show':
					if (obj.meta.hidden) {
						obj.meta.hidden = false;
						obj.element.parent().rclass('hidden');
						self.wsave(obj);
						self.resize2();
					}
					break;

				case 'close':
				case 'hide':

					if (type === 'hide' && obj.meta.hidden)
						return;

					if (obj.meta.close) {
						obj.meta.close(function() {
							self.wrem(obj.meta);
							self.resize2();
						});
					} else {
						self.wrem(obj.meta);
						self.resize2();
					}
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
				default:
					if (obj.meta.buttons) {
						var btn = obj.meta.buttons.findItem('name', type);
						if (btn && btn.exec)
							btn.exec.call(obj, obj);
					}
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

			t.container.css(obj);
			self.wsave(t);
		};

		item.offset.docked && obj.setdock(item.offset.docked, null, true);
		obj.meta.service && services.push(obj);
		obj.meta.data && data.push(obj);

		container.append(el);
		return obj;
	};

	self.wrem = function(item) {
		var obj = cache[item.id];
		if (obj) {

			var main = obj.element.closest(cls2 + '-item');
			if (obj.meta.actions.hide) {
				obj.meta.hidden = true;
				main.aclass('hidden');
				self.wsave(obj);
			} else {
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
		}
	};

	self.setter = function(value) {

		if (!value)
			value = EMPTYARRAY;

		init = false;
		var updated = {};

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			if (!cache[item.id])
				cache[item.id] = self.wadd(item);
			updated[item.id] = 1;
		}

		// Remove older dockable
		var keys = Object.keys(cache);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!updated[key])
				self.wrem(cache[key].meta);
		}

		self.resize();
		init = true;
	};

	self.toggle = function(id) {
		var item = cache[id];
		item && item.setcommand('toggle');
	};

	self.show = function(id) {
		var item = cache[id];
		item && item.setcommand('show');
	};

	self.hide = function(id) {
		var item = cache[id];
		item && item.setcommand('hide');
	};

});