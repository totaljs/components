COMPONENT('carousel', 'animate:3000', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, body, items = [], interval, skip = false, can = true;

	self.readonly();

	self.make = function() {

		var scr = self.find('script');
		if (scr.length) {
			self.template = Tangular.compile(scr.html());
			scr.remove();
		}

		self.aclass(cls);
		self.element.wrapInner('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		container = self.find(cls2 + '-container');

		container[0].onwheel = function() {
			return false;
		};

		body = self.find(cls2 + '-body');
		items = body.find('> figure').toArray();

		self.resizeforce();

		if (items.length)
			self.prepare();

		self.rclass('hidden invisible', 500);

		if (config.animate) {
			interval = setInterval(function() {
				skip = true;
				self.right();
			}, config.animate);
		}

		var pageX = 0;

		var move = function(e) {

			if (!can)
				return;
			var x = (e.touches ? e.touches[0].pageX : e.pageX) - pageX;
			can = false;

			if (x > 0)
				self.left();
			else
				self.right();

		};

		self.event('mousedown touchstart', function(e) {
			pageX = e.touches ? e.touches[0].pageX : e.pageX;
			self.element.on('mousemove touchmove', move);
		});

		self.event('mouseup touchend', function() {
			self.element.off('mousemove touchmove', move);
		});
	};

	self.resize = function() {
		setTimeout2(self.Id, self.resizeforce, 300);
	};

	self.prepare = function() {

		if (!items.length)
			return;

		var b = body[0];
		var f = items.pop();
		f = b.removeChild(f);
		b.insertBefore(f, b.firstChild);
		items.unshift(f);
		container[0].scrollLeft = +f.getAttribute('data-width');
	};

	self.left = function() {

		if (!items.length)
			return;

		if (!skip && interval) {
			clearInterval(interval);
			interval = null;
		}

		skip = false;
		var b = body[0];
		var f = items.pop();
		var offset = +f.getAttribute('data-width');
		can = false;
		container.animate({ scrollLeft: -offset }, 500, function() {
			container[0].scrollLeft = +items.last().getAttribute('data-width');
			f = b.removeChild(f);
			b.insertBefore(f, b.firstChild);
			items.unshift(f);
			can = true;
		});
	};

	self.right = function() {

		if (!items.length)
			return;

		if (!skip && interval) {
			clearInterval(interval);
			interval = null;
		}

		skip = false;
		can = false;

		var b = body[0];
		var f = items.shift();
		var offset = +f.getAttribute('data-width');

		container.animate({ scrollLeft: container[0].scrollLeft + offset }, 300, function() {
			container[0].scrollLeft -= offset;
			f = b.removeChild(f);
			b.appendChild(f);
			items.push(f);
			can = true;
		});
	};

	self.resizeforce = function() {
		var height = 0;
		var width = 0;

		for (var i = 0; i < items.length; i++) {
			var el = $(items[i]);
			var w = el.width();
			var h = el.height();
			el.attrd('width', w);
			width += w;
			if (height < h)
				height = h;
		}

		body.css('width', width * 2);
		self.css('height', h);
		width = self.width();
		container.css({ width: self.width(), height: h + 50 });
	};

	self.setter = function(value) {

		if (!value || !(value instanceof Array))
			return;

		var builder = [];
		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push('<figure>' + self.template(item) + '</figure>');
		}

		body.html(builder.join(''));
		items = body.find('> figure').toArray();
		self.resizeforce();
		self.prepare();
	};

});