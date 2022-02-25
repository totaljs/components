COMPONENT('tablegrid', 'count:3;fill:0;scrollbar:1;visibleY:1;margin:0;row:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var empty = '';
	var container;
	var area;
	var display;
	var isinit = false;

	self.readonly();

	self.make = function() {

		self.aclass(cls);

		var templates = self.find('scri' + 'pt');
		for (var i = 0; i < templates.length; i++) {
			var html = templates[i].innerHTML;
			if (i)
				empty = html;
			else
				self.template = Tangular.compile(html);
		}

		self.html('<div class="{0}-scrollbar"><div class="{0}-container"></div></div>'.format(cls));
		container = self.find(cls2 + '-container');
		area = self.find(cls2 + '-scrollbar');
		self.scrollbar = config.scrollbar && config.parent ? SCROLLBAR(area, { shadow: config.scrollbarshadow, visibleY: config.visibleY, orientation: 'y' }) : null;
		self.on('resize + resize2', self.resize);
		isinit = true;
		self.resizeforce();
		isinit = false;
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {

		if (!config.parent)
			return;

		var parent = self.parent(config.parent);

		if (self.scrollbar) {
			area.css({ height: parent.height() - config.margin });
			setTimeout(self.scrollbar.resize, 10);
		}

		display = WIDTH(parent);

		if (!isinit)
			self.refresh();
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			return;
		}

		var parent = config.parent ? self.parent(config.parent) : null;

		if (display == null)
			display = config.parent ? WIDTH(parent) : WIDTH();

		var rows = [];
		var cols = [];
		var count = config['count' + display] || config.count;
		var items = value.slice(0);
		var width = (100 / count).floor(2);
		var rowheight = config['row' + display] || config.row;
		var noscroll = false;

		while (items.length % count)
			items.push(null);

		self.scrollbar && self.scrollbar.resize();

		if (config.fill && config.scrollbar) {
			var diff = Math.ceil(area.height() / rowheight);
			var rowcount = items.length / count;
			for (var i = rowcount; i < diff; i++) {
				noscroll = true;
				for (var j = 0; j < count; j++)
					items.push(null);
			}
		}

		var cssheight = rowheight ? ';height:{0}px'.format(rowheight) : '';

		for (var i = 0; i < items.length; i++) {

			var row = i % count;
			var item = items[i];
			var c = [cls + '-item'];

			if (!cols.length)
				c.push(cls + '-first');

			if (item == null)
				c.push(cls + '-empty');

			if (rows.length)
				c.push(cls + '-bt');

			if (cols.length)
				c.push(cls + '-bl');

			if (row === count - 1)
				c.push(cls + '-last');

			cols.push('<div class="{0}" style="width:{1}%{3}">{2}</div>'.format(c.join(' '), width, item ? self.template({ value: item }) : empty, cssheight));

			if (row === count - 1) {
				rows.push('<div><div class="{0}-row">{1}</div><div class="clearfix"></div></div>'.format(cls, cols.join('')));
				cols.length = 0;
			}

		}

		if (cols.length)
			rows.push('<div><div class="{0}-row">{1}</div><div class="clearfix"></div></div>'.format(cls, cols.join('')));

		var html = rows.join('');
		container.html(html);

		if (config.scrollbar)
			area.tclass('ui-scrollbar-noscroll', noscroll);

		html.COMPILABLE() && COMPILE(container);

	};

});