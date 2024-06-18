COMPONENT('slider', function(self, config, cls) {

	var cls2 = '.' + cls;
	var events = {};
	var thumb;
	var track;
	var prevwidth;

	self.nocompile && self.nocompile();

	self.updateposition = function(update) {

		var x = (thumb.css('left') || '').parseInt();
		var w = thumb.width();
		var width = track.width() - w;
		var p = ((x / width) * 100).floor(3);

		if (config.steps) {
			var step = 100 / config.steps;
			var plus = Math.round(p / step);
			x = Math.ceil((width / 100) * plus * step);
			self.move(x);
			p = ((x / width) * 100).floor(3);
		}

		update && self.bind('@touched @modified', Math.round(p));
	};

	self.make = function() {

		self.aclass(cls);
		self.rclass('invisible');
		var label = self.html();
		self.html((label ? '<div class="{0}-label">{1}:</div>'.format(cls, label) : '') + '<div class="{0}-body"><span class="{0}-thumb"></span><div class="{0}-track"></div></div>'.format(cls));

		thumb = self.find(cls2 + '-thumb');
		track = self.find(cls2 + '-track');

		events.mup = function() {
			$(W).off('mousemove touchmove', events.mmove).off('mouseup touchend', events.mup);
		};

		self.on('resize + resize2', function() {
			var width = track.width();
			if (prevwidth == null) {
				prevwidth = width;
			} else if (prevwidth !== track.width()) {
				prevwidth = width;
				setTimeout2(self.ID, self.updateposition, 300);
			}
		});

		events.mmove = function(e) {

			if (e.touches)
				e = e.touches[0];

			var x = events.offset + (e.pageX - events.x);
			if (x > events.width)
				x = events.width;
			else if (x < 0)
				x = 0;
			thumb.css('left', x);
			setTimeout2(self.ID, self.updateposition, 100, null, true);
		};

		events.mdown = function(e) {

			if (config.disabled)
				return;

			e.preventDefault();
			var target = e.target;

			if (e.touches)
				e = e.touches[0];

			var offset = self.element.offset();
			events.offset = (thumb.css('left') || '').parseInt();
			events.x = e.pageX;
			events.w = thumb.width();
			events.width = track.width() - events.w;

			if (target === track[0]) {
				var x = ((e.pageX - offset.left) - (events.w / 2)) >> 0;
				if (x > events.width)
					x = events.width;
				else if (x < 0)
					x = 0;
				thumb.css('left', x);
				setTimeout2(self.ID, self.updateposition, 100, null, true);
			} else
				$(W).on('mousemove touchmove', events.mmove).on('mouseup touchend', events.mup);

		};

		self.find(cls2 + '-body').on('mousedown touchstart', events.mdown);
	};

	self.setter = function(value) {

		var w = thumb.width();
		var width = track.width() - w;
		var x = (width / 100) * value;

		if (config.steps) {
			var step = 100 / config.steps;
			var plus = Math.round(value / step);
			x = Math.ceil((width / 100) * plus * step);
			self.move(x);
			value = ((x / width) * 100).floor(3);
		} else
			self.move(x);
	};

	self.move = function(x) {
		thumb.stop().animate({ left: Math.round(x) }, 300);
	};

	self.configure = function(key, value) {
		switch (key) {

			case 'steps':
				self.updateposition();
				break;

			case 'icon':
				var tmp = self.find(cls2 + '-label');
				var icon = tmp.find('i');
				icon = icon.length ? icon : null;
				if (value) {
					value = self.icon(value);
					if (icon)
						icon.rclass().aclass(value);
					else
						tmp.prepend('<i class="{0}"></i>'.format(value));
				} else if (icon)
					icon.remove();
				break;

			case 'required':
				self.tclass(cls + '-required', value);
				break;

			case 'disabled':
				self.tclass('ui-disabled', value);
				break;

			case 'type':
				self.type = value;
				break;
		}
	};
});