COMPONENT('datatable', 'height:parent;margin:0;pluralizeitems:# items,# item,# items,# items;pluralizepages:# pages,# page,# pages,# pages;unhighlight:0;colwidth:150;rowheight:24;clickid:id;minheight:300', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container_rows;
	var container_cols;
	var container_pages;
	var template_col = Tangular.compile('<div data-name="{{ name }}" class="{0}-col{{ if sort }} {0}-sortable{{ fi }}{{ if alignheader }} {{ alignheader }}{{ fi }}" style="width:{{ width }}px">{{ if sort }}<i class="ti"></i>{{ fi }}<span>{{ text | raw }}</span></div>'.format(cls));
	var meta = {};
	var temp = {};

	self.init = function() {

		Thelpers.ui_datatable_checkbox = function(val) {
			return ('<div class="{0}-checkbox' + (val ? ' {0}-checkbox-checked' : '') + '"><i class="ti ti-check"></i></div>').format(cls);
		};

		var resize = function() {
			for (var m of M.components) {
				if (m.name === self.name && !HIDDEN(m.dom) && (m.ready || (m.$ready && !m.$removed)))
					m.resizeforce();
			}
		};

		W.DATATABLEMETA = false;
		W.DATATABLESHIFT = false;
		$(W).on('keydown', function(e) {
			W.DATATABLESHIFT = e.shiftKey;
			W.DATATABLEMETA = e.metaKey;
		}).on('keyup', function() {
			W.DATATABLESHIFT = false;
			W.DATATABLEMETA = false;
		}).on('resize', function() {
			setTimeout2(cls, resize, 500);
		});
	};

	self.make = function() {

		var scr = self.find('script');
		var html = scr.html();
		scr.remove();

		self.aclass(cls);
		self.append('<div class="{0}-cols-scroller"><div class="{0}-cols"></div></div><div class="{0}-rows-scroller"><div class="{0}-rows"></div></div><div class="{0}-pagination"><div class="{0}-info"></div><div class="{0}-pages"><button name="prev" disabled><i class="ti ti-chevron-left"></i></button><input value="1" type="text" maxlength="4" disabled /><button name="next" disabled><i class="ti ti-chevron-right"></i></button></div></div>'.format(cls));

		config.noborder && self.css('border', '0');

		container_cols = self.find(cls2 + '-cols');
		container_rows = self.find(cls2 + '-rows');
		container_pages = self.find(cls2 + '-pagination');

		var p = config.height;
		self.scrollbar = SCROLLBAR(container_rows.parent(), { onscroll: self.onscroll, visibleX: 1, visibleY: p === 'fluid' ? 0 : 1 });

		self.event('click', cls2 + '-sortable', function() {

			var el = $(this);
			var name = el.attrd('name');
			var isa = el.hclass('asc');
			var isd = el.hclass('desc');

			if (isa && !isd)
				name += '_desc';
			else if (!isa && !isd)
				name += '_asc';

			self.sort(name);
		});

		container_rows.on('click', cls2 + '-row', function() {

			if (meta.clickskip) {
				meta.clickskip = false;
				return;
			}

			var el = $(this);
			var index = +el.attrd('index');
			var row = meta.rows[index];

			if (meta.checked.length) {
				meta.checked = [];
				self.redrawchecked();
			}

			if (config.highlight) {
				if (config.unhighlight && meta.selected && meta.selected[0] === this) {
					meta.selected.rclass(cls + '-selected');
					config.click && self.EXEC(config.click, null, self);
					meta.selected = null;
				} else
					self.select(row);
			}
		});

		container_rows.on('contextmenu', function(e) {
			if (config.contextmenu) {
				e.preventDefault();
				self.EXEC(config.contextmenu, e, self);
			}
		});

		container_rows.on('mousedown', cls2 + '-row-col', function(e) {

			var now = Date.now();

			if (meta.click) {
				if (now - meta.click < 500)
					e.preventDefault();
			}

			meta.click = now;

			if (!config.checked)
				return;

			var elcol = $(this);
			var elrow = elcol.parent();

			if (elrow.hclass(cls + '-empty'))
				return;

			var oldindex = temp.index;

			temp.index = +elrow.attrd('index');

			if (W.DATATABLEMETA || W.DATATABLESHIFT)
				e.preventDefault();

			if (W.DATATABLESHIFT && oldindex !== -1) {

				var a = oldindex;
				var b = temp.index;
				if (a > b) {
					var tmp = a;
					a = b;
					b = tmp;
				}

				for (var i = a; i <= b; i++) {
					var row = meta.rows[i];
					if (meta.checked.indexOf(row) === -1)
						meta.checked.push(row);
				}
				self.redrawchecked();
				meta.clickskip = true;
				return;
			}

			if (W.DATATABLEMETA) {
				var row = meta.rows[temp.index];
				if (row && meta.checked.indexOf(row) === -1) {
					meta.checked.push(row);
					self.redrawchecked();
				}
				meta.clickskip = true;
			} else {
				temp.drag = true;
				temp.bindevents();
			}
		});

		temp.onmove = function(e) {

			e.preventDefault();

			var elrow = $(this);
			var index = +elrow.attrd('index');

			if (index === meta.currentindex)
				return;

			if (meta.selected) {
				meta.selected.rclass(cls + '-selected');
				meta.selected = null;
				config.click && self.EXEC(config.click, null, self);
			}

			meta.currentindex = index;
			meta.checked = [];

			var a = temp.index;
			var b = index;

			if (a > b) {
				var tmp = a;
				a = b;
				b = tmp;
			}

			for (var i = a; i <= b; i++) {
				var row = meta.rows[i];
				if (meta.checked.indexOf(row) === -1)
					meta.checked.push(row);
			}

			self.redrawchecked();
		};

		temp.bindevents = function() {
			container_rows.on('mouseleave', temp.unbindevents);
			container_rows.on('mouseup', temp.unbindevents);
			container_rows.on('mousemove', cls2 + '-row', temp.onmove);
		};

		temp.unbindevents = function() {

			meta.selected && meta.selected.rclass(cls + '-selected');
			config.click && self.EXEC(config.click, null, self);
			meta.selected = null;

			container_rows.off('mouseup', temp.unbindevents);
			container_rows.off('mouseleave', temp.unbindevents);
			container_rows.off('mousemove', cls2 + '-row', temp.onmove);
		};

		container_rows.on('dblclick', cls2 + '-row-col', function() {

			var el = $(this);
			var name = el.attrd('name');
			var col = meta.cols.findItem('name', name);
			var elrow = el.parent();

			if (elrow.hclass(cls + '-empty'))
				return;

			var index = +elrow.attrd('index');
			var row = meta.rows[index];

			if (!col.editable) {
				config.dblclick && self.SEEX(config.dblclick, row, self, elrow);
				return;
			}

			var opt = {};
			opt.index = index;
			opt.row = row;
			opt.col = col;
			opt.elcol = el;
			opt.elrow = elrow;
			opt.value = row[name];
			opt.next = function(value) {

				if (!row.CHANGES)
					row.CHANGES = {};

				row.CHANGES[name] = true;
				row[name] = value;

				var selected = opt.elrow.hclass(cls + '-selected');
				var el = self.redrawrow(index);
				if (el) {
					el.find(cls2 + '-row-col[data-name="{0}"]'.format(name)).aclass(cls + '-changed');
					if (meta.changed.indexOf(row) === -1) {
						meta.changed.push(row);
						if (selected)
							meta.selected = el.aclass(cls + '-selected');
						config.changed && EXEC(self.maketpath(config.changed), meta.changed);
					}
				}
			};

			config.editable && self.EXEC(config.editable, opt);
		});

		container_pages.on('click', 'button', function() {
			var page = 0;
			switch (this.name) {
				case 'prev':
					page = meta.page - 1;
					break;
				case 'next':
					page = meta.page + 1;
					break;
			}
			page && self.page(page);
		});

		container_pages.on('change', 'input', function() {
			var page = this.value.parseInt();

			if (page > meta.pages)
				page = meta.pages;

			if (page < 1)
				page = 1;

			if (page !== meta.page)
				self.page(page);
		});

		html && self.redrawcols(new Function('return ' + html.trim())());
		self.resizeforce();
	};

	self.sort = function(name) {
		// name_asc    : asc
		// name_desc   : desc
		// name        : off
		var arr = name.split('_');
		container_cols.find('.asc,.desc').rclass('asc desc');
		arr[1] && container_cols.find('> {0}-col[data-name="{1}"]'.format(cls2, arr[0])).aclass(arr[1]);
		meta.sort = arr.length ? name : undefined;
		self.page(meta.page);
	};

	self.page = function(page) {
		config.exec && self.EXEC(config.exec, meta.sort, page);
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 500);
	};

	self.cacheempty = function() {
		var emptycontainer = container_rows.find(cls2 + '-empty-container')[0];
		if (emptycontainer)
			meta.empty = container_rows[0].removeChild(emptycontainer);
	};

	self.resizeforce = function() {

		var parent = config.height > 0 ? self.parent() : config.height === 'fluid' || config.height === 'auto' ? null : self.parent(config.height);
		var width = parent ? parent.width() : self.parent().width();
		var height = 0;
		var wh;

		if (config.height > 0)
			height = (config.height - config.margin);
		else if (config.height === 'auto') {
			wh = (config.parent ? self.parent(config.parent).height() : WH) - self.element.offset().top;
		} else if (parent)
			wh = parent.height();

		if (wh)
			height = (wh - container_cols.height() - container_pages.height() - config.margin);

		if (meta.rows) {

			var h = meta.rows.length * config.rowheight;

			if (!parent && config.height !== 'auto')
				height = h;

			var diff = parent ? Math.ceil((height - h) / config.rowheight) : Math.ceil((config.minheight - h) / config.rowheight);

			if (diff < 0)
				diff = 0;

			if (meta.hd !== diff) {

				if (diff > 0) {
					if (meta.empty) {
						container_rows[0].appendChild(meta.empty);
						meta.empty = null;
					}
				} else {
					if (!meta.empty)
						self.cacheempty();
				}

				self.tclass(cls + '-noscroll', diff > 0);
				self.scrollbar.scrollTop(0);
				meta.hd = diff;
			}
		}

		if (meta.ww === width && meta.wh === height) {
			self.scrollbar.resize();
			meta.width && container_rows.width(meta.width);
			return;
		}

		if (!parent) {
			if (height < config.minheight)
				height = config.minheight;
		}

		meta.ww = width;
		meta.wh = height;
		self.find(cls2 + '-rows-scroller').css('height', height);
		meta.width && container_rows.width(meta.width);
		container_cols.css('min-width', width);
		self.scrollbar.resize();

	};

	self.onscroll = function(e) {
		container_cols[0].parentNode.scrollLeft = e.area[0].scrollLeft;
	};

	self.renderrow = function(index, row) {

		var div = document.createElement('DIV');
		var tmp = [];
		var ccls = '';

		if (meta.rowclass)
			ccls = meta.rowclass(row).trim();

		div.setAttribute('class', cls + '-row' + (index % 2 ? (' ' + cls + '-row-odd') : '') + (ccls ? (' ' + ccls) : ''));
		div.setAttribute('data-index', index);

		for (var i = 0; i < meta.cols.length; i++) {
			var col = meta.cols[i];
			var value = row[col.name];

			if (col.template)
				value = col.template(row);

			ccls = '';

			if (row.CHANGES && row.CHANGES[col.name])
				ccls += ' ' + cls + '-changed';

			if (col.align)
				ccls += ' ' + col.align;

			tmp.push('<div class="{0}-row-col{4}" data-name="{1}" style="width:{2}px">{3}</div>'.format(cls, col.name, col.width, value, ccls));
		}

		div.innerHTML = tmp.join('');
		return div;
	};

	self.replacerow = function(index, row) {
		var el = container_rows.find(cls2 + '-row[data-index="{0}"]'.format(index));
		if (el.length) {
			self.get().rows[index] = row;
			container_rows[0].replaceChild(self.renderrow(index, row), el[0]);
		}
	};

	self.redrawchecked = function() {
		container_rows.find(cls2 + '-checked').rclass(cls + '-checked');
		var rows = container_rows.find(cls2 + '-row');
		for (var i = 0; i < rows.length; i++) {
			var el = rows[i];
			var index = +el.getAttribute('data-index');
			var row = meta.rows[index];
			if (meta.checked.indexOf(row) !== -1)
				$(el).aclass(cls + '-checked');
		}
		config.checked && self.SEEX(config.checked, meta.checked, self);
	};

	self.redrawrow = function(index) {

		if (typeof(index) === 'object')
			index = meta.rows.indexOf(index);

		if (index === -1)
			return;

		var el = container_rows.find(cls2 + '-row[data-index="{0}"]'.format(index));
		if (el.length) {
			var row = self.renderrow(index, meta.rows[index]);
			container_rows[0].replaceChild(row, el[0]);
			row = $(row);

			if (meta.checked.indexOf(meta.rows[index]) !== -1)
				row.aclass(cls + '-checked');

			return row;
		}
	};

	self.reload = function() {
		self.page(meta.page);
	};

	self.empty = function() {
		self.set({ page: 1, pages: 0, count: 0, items: [], limit: 0 });
	};

	self.clear = function() {
		self.refresh();
	};

	self.rebind = self.redrawcols = function(cols) {

		var key = 'datatable' + HASH(cols);
		var builder = [];
		var empty = [];

		meta.id = key;
		meta.width = 0;
		meta.cols = [];
		meta.empty = '';

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			if (typeof(col) === 'string') {
				meta.rowclass = Tangular.compile(col);
				continue;
			}

			if (col.sort == null)
				col.sort = true;

			if (!col.width)
				col.width = config.colwidth;

			meta.cols.push(col);
			meta.width += col.width;

			if (col.align === 0)
				col.align = 'left';

			if (col.align === 1)
				col.align = 'center';

			if (col.align === 2)
				col.align = 'right';

			if (col.alignheader === 0)
				col.alignheader = 'left';

			if (col.alignheader === 1)
				col.alignheader = 'center';

			if (col.alignheader === 2)
				col.alignheader = 'right';

			if (!col.template && col.type) {
				switch (col.type.toLowerCase()) {
					case 'number':
						col.template = col.format ? '{{ {0} | format({1}) }}'.format(col.name, col.format || '0') : '{{ {0} }}'.format(col.name);
						if (!col.align)
							col.align = 'right';
						if (!col.alignheader)
							col.alignheader = 'center';
						break;
					case 'currency':
						var curr = col.currency || col.format;
						if (curr)
							curr = '\'' + curr + '\'';
						col.template = '{{ {0} | currency({1}) }}'.format(col.name, curr);
						if (!col.align)
							col.align = 'right';
						if (!col.alignheader)
							col.alignheader = 'center';
						break;
					case 'boolean':
						col.template = '{{ {0} | ui_datatable_checkbox }}'.format(col.name);
						if (!col.align)
							col.align = 'center';
						if (!col.alignheader)
							col.alignheader = 'center';
						break;
					case 'date':
						col.template = '{{ {0} | format{1} }}'.format(col.name, col.format ? ('(\'' + col.format + '\')') : '');
						if (!col.align)
							col.align = 'center';
						if (!col.alignheader)
							col.alignheader = 'center';
						break;
				}
			}

			if (col.template)
				col.template = Tangular.compile(col.template);

			builder.push(template_col(col));
			empty.push('<div class="{0}-row-col" style="width:{1}px"></div>'.format(cls, col.width));
		}

		var sw = self.scrollbar.pathy.width();
		container_cols.css('width', meta.width + sw).html(builder.join(''));

		var tmp = Math.ceil((screen.height - 100) / config.rowheight);
		meta.empty = '<div class="{0}-empty">{1}</div>'.format(cls, empty.join(''));
		empty = [];
		for (var i = 0; i < tmp; i++)
			empty.push(meta.empty);

		var div = document.createElement('DIV');
		div.setAttribute('class', cls + '-empty-container');
		div.innerHTML = empty.join('');
		meta.empty = div;
	};

	self.select = function(row) {
		var index = meta.rows.indexOf(row);
		if (index !== -1) {
			var el = container_rows.find(cls2 + '-row[data-index="{0}"]'.format(index));
			meta.selected && meta.selected.rclass(cls + '-selected');
			meta.selected = el.aclass(cls + '-selected');
			meta.value = row[config.clickid];
			config.click && self.SEEX(config.click, row, self, el);
		}
	};

	self.setter = function(value, path, type) {

		if (!value) {
			self.page(1);
			return;
		}

		value.cols && self.redrawcols(value.cols);

		var rows = value.rows || value.items;
		meta.rows = rows;
		meta.page = value.page || 1;
		meta.pages = value.pages || 1;
		meta.count = value.count;
		meta.checked = [];
		meta.changed = [];
		temp.index = -1;

		var dom = container_rows[0];

		self.cacheempty();
		dom.innerHTML = '';

		for (var i = 0; i < rows.length; i++)
			dom.appendChild(self.renderrow(i, rows[i]));

		meta.hd = null;
		self.resizeforce();

		if (type !== 'noscroll')
			self.scrollbar.scrollTop(0);

		var pages = value.pages ? (value.pages.pluralize(config.pluralizepages) + ' / ') : '';
		container_pages.find(cls2 + '-info').html(pages + (value.count || rows.length).pluralize(config.pluralizeitems));
		var buttons = container_pages.find('button');
		buttons[0].disabled = meta.page <= 1;
		buttons[1].disabled = meta.page >= meta.pages;
		container_pages.find('input').val(meta.page)[0].disabled = meta.pages === 1;

		var selectindex = meta.selected ? +meta.selected.attrd('index') : null;
		if (selectindex == null && config.autoselect && rows && rows.length)
			selectindex = 0;

		if (selectindex != null) {
			setTimeout(function(rows, index) {
				self.select(rows[index]);
			}, 1, rows, selectindex);
		}

		config.click && self.SEEX(config.click, null, self);
		config.checked && self.SEEX(config.checked, meta.checked, self);
	};

});