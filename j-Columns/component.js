COMPONENT('columns', 'parent:window;margin:0;fontsize:0', function(self, config, cls) {

	var columns;
	var cache;

	self.readonly();

	self.make = function() {
		self.aclass(cls + (config.noborder ? (' ' + cls + '-noborder') : ''));
		self.refresh();
	};

	self.refresh = function() {
		columns = self.find('> section').aclass(cls + '-col');
		self.rclass('hidden');
		self.resize();
		self.on('resize2', self.resize);
	};

	self.add = function(size, html) {
		let section = $('<section data-size="{0}"></div>'.format(size));
		section.append(html);
		self.append(section);
		self.refresh();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 200);
	};

	self.resizeforce = function() {

		var parent = self.parent(config.parent);
		var wh = parent.height();
		var w = self.element.width() || parent.width();

		if (!w)
			return;

		var key = w + 'x' + wh;
		if (cache === key)
			return;

		cache = key;
		var notdefined = [];
		var total = 0;
		var css = {};

		var d = WIDTH();
		var m = config['margin' + d] || 0;

		if (config.margin)
			wh -= config.margin;

		if (m)
			wh -= m;

		var index = 0;
		switch (d) {
			case 'md':
				index = 1;
				break;
			case 'sm':
				index = 2;
				break;
			case 'xs':
				index = 3;
				break;
		}

		for (var i = 0; i < columns.length; i++) {
			var el = $(columns[i]);
			var size = el.attrd('size');

			if (size) {
				size = size.split(',');
				var s = size[index];
				if (s == null) {
					while (index > -1 && !s) {
						index--;
						s = size[index];
					}
				}

				if (s === '0')
					s = 0;

				if (s) {

					var p = s.charAt(s.length - 1) === '%';
					if (p)
						s = s.substring(0, s.length - 1);

					if (p) {
						size = +s;
						size = (w / 100) * size;
					} else
						size = +s;

					total += size;
					css.width = size;
					css.height = wh;

					if (config.fontsize)
						css['font-size'] = Math.ceil((size / w) * 100) + '%';

					el.css(css).rclass('hidden invisible');
				} else
					el.aclass('hidden');
			} else
				notdefined.push(el);
		}

		var sum = ((w - total) / notdefined.length).floor(3);

		for (var i = 0; i < notdefined.length; i++) {
			var el = notdefined[i];
			css.width = sum;
			css.height = wh;

			if (config.fontsize)
				css['font-size'] = Math.ceil((sum / w) * 100) + '%';

			el.css(css);
		}

		self.css('height', wh);
		self.rclass('invisible');
		self.element.SETTER('*/resize');
	};

	self.setter = function() {
		self.resize();
	};

});