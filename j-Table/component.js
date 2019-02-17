COMPONENT('table', 'highlight:true;unhighlight:true;multiple:false;pk:id', function(self, config) {

	var cls = 'ui-table';
	var cls2 = '.' + cls;
	var etable, ebody, eempty, ehead;
	var opt = { selected: [] };
	var templates = {};
	var sizes = {};
	var names = {};
	var aligns = {};
	var dcompile = false;

	self.readonly();
	self.nocompile();
	self.bindvisible();

	self.make = function() {

		self.aclass(cls + ' invisible' + (config.detail ? (' ' + cls + '-detailed') : '') + (config.highlight ? (' ' + cls + '-selectable') : '') + (config.border ? (' ' + cls + '-border') : ''));

		self.find('script').each(function() {

			var el = $(this);
			var type = el.attrd('type');

			switch (type) {
				case 'detail':
					var h = el.html();
					dcompile = (/(data-{2,4}|data-jc|data-bind)+=/).test(h);
					templates.detail = Tangular.compile(h);
					return;
				case 'empty':
					templates.empty = el.html();
					return;
			}

			var display = el.attrd('display');
			var template = Tangular.compile(el.html());
			var size = (el.attrd('size') || '').split(',');
			var name = (el.attrd('head') || '').split(',');
			var align = (el.attrd('align') || '').split(',');
			var i;

			for (i = 0; i < align.length; i++) {
				switch (align[i].trim()) {
					case '0':
						align[i] = 'left';
						break;
					case '1':
						align[i] = 'center';
						break;
					case '2':
						align[i] = 'right';
						break;
				}
			}

			display = (display || '').split(',').trim();

			for (i = 0; i < align.length; i++)
				align[i] = align[i].trim();

			for (i = 0; i < size.length; i++)
				size[i] = size[i].trim();

			for (i = 0; i < name.length; i++) {
				name[i] = name[i].trim().replace(/'\w'/, function(val) {
					return '<i class="fa fa-{0}"></i>'.format(val.replace(/'/g, ''));
				});
			}

			if (!size[0] && size.length === 1)
				size = EMPTYARRAY;

			if (!align[0] && align.length === 1)
				align = EMPTYARRAY;

			if (!name[0] && name.length === 1)
				name = EMPTYARRAY;

			if (display.length) {
				for (i = 0; i < display.length; i++) {
					templates[display[i]] = template;
					sizes[display[i]] = size.length ? size : null;
					names[display[i]] = name.length ? name : null;
					aligns[display[i]] = align.length ? align : null;
				}
			} else {
				templates.lg = templates.md = templates.sm = templates.xs = template;
				sizes.lg = sizes.md = sizes.sm = sizes.xs = size.length ? size : null;
				names.lg = names.md = names.sm = names.xs = name.length ? name : null;
				aligns.lg = aligns.md = aligns.sm = aligns.xs = align.length ? align : null;
			}

		});

		self.html('<table class="{0}-table"><thead class="{0}-thead"></thead><tbody class="{0}-tbody"></tbody><tfooter class="{0}-tfooter hidden"></tfooter></table><div class="{0}-empty hidden"></div>'.format(cls));
		etable = self.find('table');
		ebody = etable.find('tbody');
		eempty = self.find(cls2 + '-empty').html(templates.empty || '');
		ehead = etable.find('thead');

		ebody.on('click', '> tr', function(e) {

			if (!config.highlight)
				return;

			var el = $(this);
			var node = e.target;

			if (node.nodeName === 'A' || node.nodeName === 'button' || (node.nodeName === 'SPAN' && (node.getAttribute('class') || '').indexOf('link') !== -1))
				return;

			var index = +el.attrd('index');
			if (index > -1) {
				var is = el.hclass(cls + '-selected');
				if (config.multiple) {
					if (is) {
						if (config.unhighlight) {
							el.rclass(cls + '-selected');
							config.detail && self.row_detail(el);
							opt.selected = opt.selected.remove(index);
							config.exec && SEEX(config.exec, self.selected(), el);
						}
					} else {
						el.aclass(cls + '-selected');
						config.exec && SEEX(config.exec, self.selected(), el);
						config.detail && self.row_detail(el);
						opt.selected.push(index);
					}
				} else {

					if (is && !config.unhighlight)
						return;

					if (opt.selrow) {
						opt.selrow.rclass(cls + '-selected');
						config.detail && self.row_detail(opt.selrow);
						opt.selrow = null;
						opt.selindex = -1;
					}

					// Was selected
					if (is) {
						config.exec && SEEX(config.exec);
						return;
					}

					opt.selindex = index;
					opt.selrow = el;
					el.aclass(cls + '-selected');
					config.exec && SEEX(config.exec, opt.items[index], el);
					config.detail && self.row_detail(el);
				}
			}
		});

		var resize = function() {
			setTimeout2(self.ID, self.resize, 500);
		};

		if (W.OP)
			W.OP.on('resize', resize);
		else
			$(W).on('resize', resize);
	};

	self.resize = function() {
		var display = WIDTH();
		if (display !== opt.display && sizes[display] && sizes[display] !== sizes[opt.display])
			self.refresh();
	};

	self.row_detail = function(el) {

		var row = opt.items[+el.attrd('index')];
		var eld = el.next();

		if (el.hclass(cls + '-selected')) {

			// Row is selected
			if (eld.hclass(cls + '-detail')) {
				// Detail exists
				eld.rclass('hidden');
			} else {
				// Detail doesn't exist
				el.after('<tr class="{0}-detail"><td colspan="{1}"></td></tr>'.format(cls, el.find('td').length));
				eld = el.next();

				if (config.detail === true) {
					if (templates.detail) {
						var tmp = eld.find('td');
						tmp.html(templates.detail(row, { user: window.user }));
						dcompile && COMPILE(tmp);
					}
				} else
					EXEC(config.detail, eld.find('td'), row);
			}

		} else
			eld.hclass(cls + '-detail') && eld.aclass('hidden');
	};

	self.redrawrow = function(index, row) {

		if (typeof(index) === 'number')
			index = ebody.find('tr[data-index="{0}"]'.format(index));

		if (index.length) {
			var template = templates[opt.display];
			var indexer = {};
			indexer.user = W.user;
			indexer.index = +index.attrd('index');
			var is = index.hclass(cls + '-selected');
			var next = index.next();
			index.replaceWith(template(row, indexer).replace('<tr', '<tr data-index="' + indexer.index + '"'));
			next.hclass(cls + '-detail') && next.remove();
			is && ebody.find('tr[data-index="{0}"]'.format(indexer.index)).trigger('click');
		}
	};

	self.appendrow = function(row) {

		var index = opt.items.indexOf(row);
		if (index == -1)
			index = opt.items.push(row) - 1;

		var template = templates[opt.display];
		var indexer = {};
		indexer.user = W.user;
		indexer.index = index;
		ebody.append(template(row, indexer).replace('<tr', '<tr data-index="' + indexer.index + '"'));
	};

	self.removerow = function(row) {
		var index = opt.items.indexOf(row);
		if (index == -1)
			return;
		opt.selected = opt.selected.remove(index);
		opt.items.remove(row);
	};

	self.selected = function() {
		var rows = [];
		for (var i = 0; i < opt.selected.length; i++) {
			var row = opt.items[opt.selected[i]];
			row && rows.push(row);
		}
		return rows;
	};

	self.setter = function(value, path) {

		if (value && value.items)
			value = value.items;

		var empty = !value || !value.length;
		var clsh = 'hidden';

		if (!self.isinit) {
			self.rclass('invisible', 10);
			self.isinit = true;
		}

		if (empty) {
			etable.aclass(clsh);
			eempty.rclass(clsh);
			return;
		}

		var display = WIDTH();
		var builder = [];
		var indexer = {};


		var selected = opt.selected.slice(0);

		for (var i = 0; i < selected.length; i++) {
			var row = opt.items[i];
			selected[i] = row[config.pk];
		}

		indexer.user = window.user;

		var template = templates[display];
		var count = 0;
		var size = sizes[display];
		var name = names[display];
		var align = aligns[display];

		if ((size && size.length) || (name && name.length) || (align && align.length)) {

			var arr = name || size || align;

			for (var i = 0; i < arr.length; i++)
				builder.push('<th style="width:{0};text-align:{2}">{1}</th>'.format(!size || size[i] === '0' ? 'auto' : size[i], name ? name[i] : '', align ? align[i] : 'left'));

			ehead.tclass(cls + '-nohead', !name);
			ehead.html('<tr>{0}</tr>'.format(builder.join('')));
			builder = [];
		} else
			ehead.html('');

		if (template) {
			for (var i = 0; i < value.length; i++) {
				var item = value[i];
				count++;
				indexer.index = i;
				builder.push(template(item, indexer).replace('<tr', '<tr data-index="' + i + '"'));
			}
		}

		opt.display = display;
		opt.items = value;
		opt.selindex = -1;
		opt.selrow = null;
		opt.selected = [];

		count && ebody.html(builder.join(''));

		eempty.tclass(clsh, count > 0);
		etable.tclass(clsh, count == 0);

		config.exec && SEEX(config.exec, config.multiple ? [] : null);

		if (config.remember) {
			for (var i = 0; i < selected.length; i++) {
				if (selected[i]) {
					var index = opt.items.findIndex(config.pk, selected[i]);
					if (index !== -1)
						ebody.find('tr[data-index="{0}"]'.format(index)).trigger('click');
				}
			}
		}

	};

});